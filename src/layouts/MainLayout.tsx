import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <header className=""></header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
