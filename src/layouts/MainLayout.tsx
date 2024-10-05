import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { MainLayoutProvider } from "@/contexts/MainLayout.context";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  return (
    <MainLayoutProvider>
      <Header />
      <main className="relative flex h-full">
        <Sidebar />
        <Outlet />
      </main>
    </MainLayoutProvider>
  );
};

export default MainLayout;
