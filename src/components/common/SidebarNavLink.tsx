import { useMainLayoutContext } from "@/contexts/MainLayout.context";
import { cn } from "@/lib/utils";
import { icons } from "lucide-react";
import { NavLink, To } from "react-router-dom";

interface SidebarNavLinkProps {
  to: To;
  children: React.ReactNode;
  icon: keyof typeof icons;
}

const SidebarNavLink = ({ to, children, icon }: SidebarNavLinkProps) => {
  const { showSidebar } = useMainLayoutContext();
  const LucideIcon = icons[icon];

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center rounded-full p-1 text-lg transition duration-300 ease-in-out",
          {
            "bg-gray-200/50 dark:bg-neutral-800/50": isActive,
            "rounded-l-none px-3": showSidebar,
          },
        )
      }
    >
      <span
        className={cn("p-3 group-hover/sidebar:mr-4", {
          "mr-4": showSidebar,
        })}
      >
        <LucideIcon name={icon} size={24} />
      </span>
      <p
        className={cn(
          "max-w-[200px] truncate font-medium group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100",
          {
            "translate-x-0 opacity-100": showSidebar,
            "-translate-x-96 opacity-0": !showSidebar,
          },
        )}
      >
        {children}
      </p>
    </NavLink>
  );
};

export default SidebarNavLink;
