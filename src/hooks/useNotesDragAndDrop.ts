import { Notes, NOTES_KEY, getNotesByUser } from "@/apis/notes.api";
import { useUser } from "@clerk/clerk-react";
import { ParentConfig, animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useNotesDragAndDrop = () => {
  const { user } = useUser();

  const config: Partial<ParentConfig<Notes>> = {
    sortable: true,
    plugins: [animations()],
    dragPlaceholderClass: "opacity-0",
  };

  const [parentRef, notes, setValues] = useDragAndDrop<HTMLDivElement, Notes>(
    [],
    config,
  );

  const { data } = useQuery({
    queryKey: [NOTES_KEY],
    queryFn: () => getNotesByUser(user!.id),
  });

  useEffect(() => {
    const order: Notes[] = JSON.parse(
      localStorage.getItem("notes_order") ?? "[]",
    );

    if (!data) return;

    if (order) {
      const diff = data.length - order.length;

      if (diff > 0) {
        order.unshift(...data.slice(0, diff));
      }

      for (let i = 0; i < order.length; i++) {
        const exists = data.some((newData) => newData.id === order[i].id);

        // Item in order no longer exist so skip to next iteration
        if (!exists) {
          order.splice(i, 1);
          continue;
        }

        data.forEach((note) => {
          if (note.id === order[i].id) {
            order[i] = note;
          }
        });
      }

      setValues(order);
      return;
    }

    setValues(data);
  }, [data, setValues]);

  useEffect(() => {
    if (notes.length !== 0)
      localStorage.setItem("notes_order", JSON.stringify(notes));
  }, [notes]);

  return { notes, parentRef };
};
