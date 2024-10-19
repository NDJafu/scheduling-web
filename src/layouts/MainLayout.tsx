import { api } from "@/apis";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { MainLayoutProvider } from "@/contexts/MainLayout.context";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const [token, setToken] = useState<string | null>();
  const { isSignedIn, getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let requestInterceptor = null;

    requestInterceptor = api.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    getToken().then((token) => {
      setToken(token);
    });

    if (!isSignedIn) {
      navigate("/sign-in");
    }

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayoutProvider>
      <Header />
      <main className="relative flex h-full">
        <Sidebar />
        {token ? <Outlet /> : <div>Loading...</div>}
      </main>
    </MainLayoutProvider>
  );
};

export default MainLayout;
