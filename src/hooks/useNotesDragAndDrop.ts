import { Note, NOTES_KEY, getNotesByUser } from "@/apis/notes.api";
import { useUser } from "@clerk/clerk-react";
import { ParentConfig, animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useNotesDragAndDrop = () => {
  const { user } = useUser();

  const config: Partial<ParentConfig<Note>> = {
    sortable: true,
    plugins: [animations()],
    dragPlaceholderClass: "opacity-0",
  };

  const [parentRef, notes, setValues] = useDragAndDrop<HTMLDivElement, Note>(
    [],
    config,
  );

  const { data } = useQuery({
    queryKey: [NOTES_KEY],
    queryFn: () => getNotesByUser(user!.id),
  });

  useEffect(() => {
    const order: Note[] = JSON.parse(
      localStorage.getItem("notes_order") ?? "[]",
    );

    if (!data) return;

    if (order) {
      const dataMap = new Map(data.map((item) => [item.id, item]));

      const updatedOrder = order.filter((item) => dataMap.has(item.id));

      const diff = data.length - updatedOrder.length;

      if (diff > 0) {
        updatedOrder.unshift(...data.slice(0, diff));
      }

      for (let i = 0; i < updatedOrder.length; i++) {
        updatedOrder[i] = dataMap.get(updatedOrder[i].id)!;
      }

      setValues(updatedOrder);
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
