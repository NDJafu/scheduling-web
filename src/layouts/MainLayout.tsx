import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { MainLayoutProvider } from "@/contexts/MainLayout.context";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  // const [token, setToken] = useState<string | null>();
  // const { isSignedIn, isLoaded, getToken } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const requestInterceptor = api.interceptors.request.use(
  //     async (config) => {
  //       const token = await getToken();
  //       if (token) {
  //         config.headers.Authorization = `Bearer ${token}`;
  //       }
  //       return config;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     },
  //   );

  //   getToken().then((token) => {
  //     setToken(token);
  //   });

  //   if (isLoaded && !isSignedIn) {
  //     navigate("/sign-in");
  //   }

  //   return () => {
  //     api.interceptors.request.eject(requestInterceptor);
  //   };

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <MainLayoutProvider>
      <Header />
      <main className="relative flex h-full">
        <Sidebar />
        {/* {token ? <Outlet /> : <div>Loading...</div>} */}
        <Outlet />
      </main>
    </MainLayoutProvider>
  );
};

export default MainLayout;
