import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote, Note, NOTES_KEY } from "@/apis/notes.api";
import { useState } from "react";
import ManageLabelForm from "./forms/ManageLabelForm";

const NoteCardOptions = (note: Partial<Note>) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [NOTES_KEY] }),
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        onClick={() => {
          setOpen(!open);
        }}
      >
        <MoreVertical
          size={32}
          className="rounded-full p-1.5 hover:cursor-pointer hover:bg-gray-200/50 dark:hover:bg-neutral-800"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        className="w-40"
        align="start"
      >
        <DropdownMenuItem onClick={() => mutate(note.id!)}>
          Delete note
        </DropdownMenuItem>
        <ManageLabelForm {...note} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NoteCardOptions;
