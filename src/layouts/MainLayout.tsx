import { api } from "@/apis";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { MainLayoutProvider } from "@/contexts/MainLayout.context";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();
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
        {token ? <Outlet /> : <div>Loading...</div>}
      </main>
    </MainLayoutProvider>
  );
};

export default MainLayout;
