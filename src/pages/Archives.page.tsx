import { NOTES_KEY, Notes, getNotesByUser } from "@/apis/notes.api";
import EditNoteCard from "@/components/EditNoteCard";
import { useMainLayoutContext } from "@/contexts/MainLayout.context";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { BookMarked } from "lucide-react";

const ArchivesPage = () => {
  const { user } = useUser();
  const { layoutMode } = useMainLayoutContext();
  const { data } = useQuery({
    queryKey: [NOTES_KEY],
    queryFn: () => getNotesByUser(user!.id),
    select: (data) => data.filter((note) => note.isArchived),
  });

  return (
    <section className="w-full space-y-4 overflow-auto px-6 py-3">
      {data?.length === 0 ? (
        <div className="mt-24 flex flex-col items-center justify-center gap-5 text-muted-foreground opacity-50">
          <BookMarked size={120} />
          <p className="text-xl font-semibold">
            Your archived notes appear here
          </p>
        </div>
      ) : (
        <div
          className={cn({
            "flex flex-wrap items-start gap-4": layoutMode === "grid",
            "mx-auto flex w-2/3 flex-col gap-4 lg:w-1/3": layoutMode === "list",
          })}
        >
          {data?.map((note: Notes) => (
            <EditNoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ArchivesPage;
