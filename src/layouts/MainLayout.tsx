import { api } from "@/apis";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { enviromentKeys } from "@/constants/enviroment";
import { MainLayoutProvider } from "@/contexts/MainLayout.context";
import { useToast } from "@/hooks/use-toast";
import SearchResults from "@/pages/SearchNotes.page";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";

const MainLayout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const { isSignedIn, getToken, userId } = useAuth();
  const { toast } = useToast();
  const { data: token } = useQuery({
    queryFn: async () => await getToken(),
    queryKey: ["token"],
    enabled: isSignedIn,
  });

  // Đăng
  useEffect(() => {
    let requestInterceptor = null;

    requestInterceptor = api.interceptors.request.use(
      async (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    if (!isSignedIn) {
      navigate("/sign-in");
    }

    if (!enviromentKeys.SOCKET_URL) return;

    const socket = io(enviromentKeys.SOCKET_URL, { query: { userId } });

    socket.on("connect", () => {
      console.log("Connected!");
    });

    socket.on("notification", (data) => {
      toast({ title: "You have a reminder:", description: data.message });
    });

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      socket.disconnect();
      console.log("Disconnecting");
    };
  }, [isSignedIn, navigate, token, userId]);

  return (
    <MainLayoutProvider>
      <Header />
      <main className="relative flex overflow-scroll">
        <Sidebar />
        {token ? (
          query ? (
            <section className="w-full space-y-4 overflow-auto px-6 py-3">
              <SearchResults />
            </section>
          ) : (
            <Outlet />
          )
        ) : (
          <div>Loading...</div>
        )}
      </main>
      <Toaster />
    </MainLayoutProvider>
  );
};

export default MainLayout;
