import { useMainLayoutContext } from "@/contexts/MainLayout.context";
import SidebarNavLink from "./SidebarNavLink";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { showSidebar } = useMainLayoutContext();

  const sidebarDisplayState = showSidebar ? "open" : "closed";

  return (
    <aside
      className={cn(
        "group/sidebar h-full -translate-x-full space-y-4 transition-[width] duration-300 ease-in-out",
        "data-[state=closed]:w-[72px] data-[state=open]:w-72 data-[state=closed]:p-2 data-[state=open]:py-2",
        "data-[state=closed]:hover:w-72 data-[state=closed]:hover:delay-500",
        "lg:translate-x-0",
      )}
      data-state={sidebarDisplayState}
    >
      <nav>
        <SidebarNavLink to="/" icon="Lightbulb">
          Notes
        </SidebarNavLink>
        <SidebarNavLink to="/reminders" icon="Bell">
          Reminders
        </SidebarNavLink>
        <SidebarNavLink to="/archives" icon="BookMarked">
          Archives
        </SidebarNavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
