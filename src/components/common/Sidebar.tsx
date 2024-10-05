import { useMainLayoutContext } from "@/contexts/MainLayout.context";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { showSidebar } = useMainLayoutContext();

  return (
    <div className="w-80" data-state={showSidebar ? "open" : "closed"}>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => cn({ "text-red-500": isActive })}
        >
          Real
        </NavLink>
        <NavLink
          to="/reminders"
          className={({ isActive }) => cn({ "text-red-500": isActive })}
        >
          Real
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
