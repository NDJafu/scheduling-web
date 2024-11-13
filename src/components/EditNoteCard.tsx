import { Note } from "@/apis/notes.api";
import NoteCard from "./NoteCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useEditNoteCard } from "@/hooks/useEditNoteCard";
import EditNoteForm from "./forms/EditNoteForm";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type EditNoteCardProps = { note: Note } & ComponentPropsWithoutRef<"button">;

const EditNoteCard = ({ note, className }: EditNoteCardProps) => {
  const { open, setOpen, triggerRef, transform } = useEditNoteCard();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        ref={triggerRef}
        className={cn(
          "text-left transition-[transform_opacity_width] duration-300 data-[state=open]:animate-fade-away",
          "xl:basis-[calc(100%_/_6_-_16px_*_(5_/_6))]",
          "lg:basis-[calc(100%_/_4_-_16px_*_(3_/_4))]",
          "md:basis-[calc(100%_/_3_-_16px_*_(2_/_3))]",
          "basis-[calc(100%_/_2_-_16px_*_(1_/_2))]",
          className,
        )}
        data-state={open ? "open" : "closed"}
        data-label={note.id}
        style={{
          transform,
          // flexBasis: "calc(100% / 6 - 16px * (5 / 6))",
        }}
      >
        <NoteCard {...note} />
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <EditNoteForm {...note} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default EditNoteCard;
