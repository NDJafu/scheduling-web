import { Bookmark, MoreVertical, Pin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Notes, NOTES_KEY, updateNote } from "@/apis/notes.api";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NoteCard = ({ id, title, content, isPinned, isArchived }: Notes) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [NOTES_KEY] }),
  });

  const togglePinned = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    mutate({ id, isPinned: !isPinned });
  };

  const toggleArchived = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    mutate({ id, isArchived: !isArchived });
  };

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
          onClick={toggleArchived}
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
          onClick={togglePinned}
        />
      </CardContent>
    </Card>
  );
};

export default NoteCard;
