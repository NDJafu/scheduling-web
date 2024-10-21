import { Notes } from "@/apis/notes.api";
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

const EditNoteCard = (note: Notes) => {
  const { open, setOpen, triggerRef, transform } = useEditNoteCard();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        ref={triggerRef}
        className="text-left transition-[transform_opacity_width] duration-300 data-[state=open]:animate-fade-away"
        data-state={open ? "open" : "closed"}
        style={{ transform }}
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
