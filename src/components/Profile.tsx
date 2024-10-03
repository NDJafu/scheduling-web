import { X, Edit3 } from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Profile = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="mx-1 ml-8 rounded-full p-1 hover:bg-white/25 focus:bg-white/10">
          <Avatar>
            <AvatarImage src="https://picsum.photos/320" />
            <AvatarFallback>KYS</AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="relative w-[400px] rounded-2xl p-3">
        <PopoverClose asChild>
          <button className="absolute right-1 top-1 rounded-full p-2 transition-colors hover:bg-white/25 hover:text-white">
            <X size={24} />
          </button>
        </PopoverClose>
        <div className="flex flex-col items-center gap-4">
          <p className="font-medium">example@example.com</p>
          <div className="group/edit-avatar relative size-fit">
            <Avatar className="size-20">
              <AvatarImage src="https://picsum.photos/320" />
              <AvatarFallback>KYS</AvatarFallback>
            </Avatar>
            <button className="invisible absolute inset-0 flex size-20 items-center justify-center rounded-full bg-black/25 group-hover/edit-avatar:visible">
              <Edit3 size={24} />
            </button>
          </div>
          <h4 className="text-2xl font-semibold">Chào Example,</h4>
          <Button className="font-semibold">Đăng xuất</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
