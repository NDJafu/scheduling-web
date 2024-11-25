import { api } from "@/apis";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { MainLayoutProvider } from "@/contexts/MainLayout.context";
import SearchResults from "@/pages/SearchNotes.page";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const { isSignedIn, getToken } = useAuth();
  const { data: token } = useQuery({
    queryFn: async () => await getToken(),
    queryKey: ["token"],
    enabled: isSignedIn,
  });

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

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [isSignedIn, token]);

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
    </MainLayoutProvider>
  );
};

export default MainLayout;
