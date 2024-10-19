import { getNotesByUser, Notes, NOTES_KEY } from "@/apis/notes.api";
import EditNoteCard from "@/components/EditNoteCard";
import NewNote from "@/components/NewNote";
import { useMainLayoutContext } from "@/contexts/MainLayout.context";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

const NotesPage = () => {
  const { layoutMode } = useMainLayoutContext();
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [NOTES_KEY],
    queryFn: () => getNotesByUser(user!.id),
  });

  return (
    <section className="w-full space-y-4 px-6 py-3">
      <NewNote />
      <div
        className={cn({
          "grid grid-cols-6 items-start gap-4": layoutMode === "grid",
          "mx-auto flex w-1/3 flex-col gap-4": layoutMode === "list",
        })}
      >
        {data?.map((note: Notes) => <EditNoteCard {...note} />)}
      </div>
    </section>
  );
};

export default NotesPage;
