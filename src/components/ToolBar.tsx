import {
  RotateCwIcon,
  LayoutGrid,
  Settings,
  Moon,
  Sun,
  Settings2,
  Megaphone,
  CircleHelp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "./theme-provider";

const ToolBar = () => {
  const { theme, setTheme } = useTheme();

  const isLightMode = theme === "light";

  return (
    <div className="flex w-fit items-center gap-2 text-neutral-700">
      <button className="rounded-full p-3 transition-colors hover:bg-gray-700/25 hover:text-black/90 focus:bg-gray-700/10 dark:hover:bg-white/25 dark:hover:text-white dark:focus:bg-white/10">
        <RotateCwIcon size={24} />
      </button>
      <button className="rounded-full p-3 transition-colors hover:bg-gray-700/25 hover:text-black/90 focus:bg-gray-700/10 dark:hover:bg-white/25 dark:hover:text-white dark:focus:bg-white/10">
        <LayoutGrid size={24} />
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="outline-none ring-0">
          <button className="rounded-full p-3 transition-colors hover:bg-gray-700/25 hover:text-black/90 focus:bg-gray-700/10 dark:hover:bg-white/25 dark:hover:text-white dark:focus:bg-white/10">
            <Settings size={24} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Settings2 size={14} className="mr-2" />
            Cài đặt
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme(isLightMode ? "dark" : "light")}
          >
            {isLightMode ? (
              <Moon size={14} className="mr-2" />
            ) : (
              <Sun size={14} className="mr-2" />
            )}
            {isLightMode ? "Bật chế độ tối" : "Tắt chế độ tối"}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Megaphone size={14} className="mr-2" />
            Phản hồi
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CircleHelp size={14} className="mr-2" />
            Trợ giúp
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ToolBar;
