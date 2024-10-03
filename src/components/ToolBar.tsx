import { RotateCwIcon, LayoutGrid, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const ToolBar = () => {
  return (
    <div className="flex w-fit items-center gap-2 text-neutral-700">
      <button className="rounded-full p-3 transition-colors hover:bg-white/25 hover:text-white focus:bg-white/10">
        <RotateCwIcon size={24} />
      </button>
      <button className="rounded-full p-3 transition-colors hover:bg-white/25 hover:text-white focus:bg-white/10">
        <LayoutGrid size={24} />
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="outline-none ring-0">
          <button className="rounded-full p-3 transition-colors hover:bg-white/25 hover:text-white focus:bg-white/10">
            <Settings size={24} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Cài đặt</DropdownMenuItem>
          <DropdownMenuItem>Tắt chế độ tối</DropdownMenuItem>
          <DropdownMenuItem>Phản hồi</DropdownMenuItem>
          <DropdownMenuItem>Trợ giúp</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ToolBar;
