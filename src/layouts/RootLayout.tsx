import { Outlet } from "react-router-dom";

const RootLayout = () => {
  // const navigate = useNavigate();

  return (
    // <ClerkProvider
    //   publishableKey={enviromentKeys.PUBLISHABLE_KEY}
    //   routerPush={(to: To) => navigate(to)}
    //   routerReplace={(to: To) => navigate(to, { replace: true })}
    // >
    <Outlet />
    // </ClerkProvider>
  );
};

export default RootLayout;
