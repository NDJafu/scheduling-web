import EditNoteCard from "@/components/EditNoteCard";
import NewNote from "@/components/NewNote";
import { useMainLayoutContext } from "@/contexts/MainLayout.context";
import { cn } from "@/lib/utils";
import { useNotesDragAndDrop } from "@/hooks/useNotesDragAndDrop";

const NotesPage = () => {
  const { layoutMode } = useMainLayoutContext();
  const { parentRef, notes } = useNotesDragAndDrop();
  const pinnedNotes = notes.filter((note) => note.isPinned);

  return (
    <section className="w-full space-y-4 overflow-auto px-6 py-3">
      <NewNote />
      {pinnedNotes.length > 0 && (
        <>
          <h4
            className={cn({ "mx-auto w-2/3 lg:w-1/3": layoutMode === "list" })}
          >
            Pinned
          </h4>
          <div
            className={cn({
              "flex flex-wrap items-start gap-4": layoutMode === "grid",
              "mx-auto flex w-2/3 flex-col gap-4 lg:w-1/3":
                layoutMode === "list",
            })}
          >
            {pinnedNotes.map((note) => (
              <EditNoteCard key={note.id} note={note} />
            ))}
          </div>
        </>
      )}

      {pinnedNotes.length > 0 && <h4>Others</h4>}
      <div
        ref={parentRef}
        className={cn({
          "flex flex-wrap items-start gap-4": layoutMode === "grid",
          "mx-auto flex w-2/3 flex-col gap-4 lg:w-1/3": layoutMode === "list",
        })}
      >
        {notes
          .filter((note) => !note.isPinned)
          .map((note) => (
            <EditNoteCard key={note.id} note={note} />
          ))}
      </div>
    </section>
  );
};

export default NotesPage;
