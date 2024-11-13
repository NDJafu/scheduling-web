import { cn } from "@/lib/utils";
import { icons } from "lucide-react";
import { NavLink, To } from "react-router-dom";

interface SidebarNavLinkProps {
  to: To;
  children: React.ReactNode;
  icon: keyof typeof icons;
}

const SidebarNavLink = ({ to, children, icon }: SidebarNavLinkProps) => {
  const LucideIcon = icons[icon];

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center self-stretch rounded-full p-1 text-lg transition duration-300 ease-in-out",
          "group-data-[state=open]/sidebar:rounded-l-none group-data-[state=open]/sidebar:px-3",
          {
            "bg-gray-200/50 dark:bg-neutral-800/50": isActive,
          },
        )
      }
    >
      <span
        className={cn(
          "p-3 group-hover/sidebar:mr-4",
          "group-data-[state=open]/sidebar:mr-4",
        )}
      >
        <LucideIcon name={icon} size={24} />
      </span>
      <p
        className={cn(
          "max-w-[200px] truncate font-medium",
          "group-data-[state=open]/sidebar:translate-x-0 group-data-[state=open]/sidebar:opacity-100",
          "group-data-[state=closed]/sidebar:translate-x-96 group-data-[state=closed]/sidebar:opacity-0",
          "group-hover/sidebar:!translate-x-0 group-hover/sidebar:!opacity-100",
        )}
      >
        {children}
      </p>
    </NavLink>
  );
};

export default SidebarNavLink;
