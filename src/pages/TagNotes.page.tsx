import { getNotesByTagName, NOTES_KEY } from "@/apis/notes.api";
import EditNoteCard from "@/components/EditNoteCard";
import NewNote from "@/components/NewNote";
import { useMainLayoutContext } from "@/contexts/MainLayout.context";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const TagNotesPage = () => {
  const { name } = useParams();
  const { layoutMode } = useMainLayoutContext();

  const { data: notes } = useQuery({
    queryFn: () => getNotesByTagName(name!),
    queryKey: [NOTES_KEY, "tag", name],
  });

  return (
    <section className="w-full space-y-4 overflow-auto px-6 py-3">
      <NewNote />
      <div
        className={cn({
          "flex flex-wrap items-start gap-4": layoutMode === "grid",
          "mx-auto flex w-2/3 flex-col gap-4 lg:w-1/3": layoutMode === "list",
        })}
      >
        {notes?.map((note) => <EditNoteCard key={note.id} note={note} />)}
      </div>
    </section>
  );
};
export default TagNotesPage;
