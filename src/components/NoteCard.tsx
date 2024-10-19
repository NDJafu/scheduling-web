import { Bookmark, MoreVertical, Pin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Notes } from "@/apis/notes.api";
import { cn } from "@/lib/utils";

const NoteCard = ({ title, content, isPinned, isArchived }: Partial<Notes>) => {
  return (
    <Card className="group/note relative h-fit">
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        <CardDescription className="whitespace-pre-line">
          {content}
        </CardDescription>
      </CardHeader>
      <CardContent className="-mx-1.5 -mb-1.5 flex items-center text-muted-foreground opacity-0 transition-opacity group-hover/note:opacity-100">
        <Bookmark
          size={32}
          className={cn(
            "rounded-full p-1.5 hover:cursor-pointer hover:bg-gray-200/50 dark:hover:bg-neutral-800",
            isArchived && "fill-muted-foreground",
          )}
          onClick={(e) => e.stopPropagation()}
        />
        <MoreVertical
          size={32}
          className="rounded-full p-1.5 hover:cursor-pointer hover:bg-gray-200/50 dark:hover:bg-neutral-800"
          onClick={(e) => e.stopPropagation()}
        />
        <Pin
          size={40}
          className={cn(
            "absolute right-2 top-2 rounded-full p-2 hover:cursor-pointer hover:bg-gray-200/50 dark:hover:bg-neutral-800",
            isPinned && "fill-muted-foreground",
          )}
          onClick={(e) => e.stopPropagation()}
        />
      </CardContent>
    </Card>
  );
};

export default NoteCard;
