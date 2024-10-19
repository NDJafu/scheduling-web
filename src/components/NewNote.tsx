import { useEffect, useId, useState } from "react";
import NewNoteForm from "./forms/NewNoteForm";

const NewNote = () => {
  const [showForm, setShowForm] = useState(false);
  const id = useId();

  useEffect(() => {
    const focusElementListener = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLElement)) return;

      const formElement = document.getElementById(id);

      const reminderElement = document.getElementById("remindersForm");

      const reminderDatePicker = document.getElementById("reminderDatePicker");

      if (
        reminderElement?.contains(e.target) ||
        reminderDatePicker?.contains(e.target)
      ) {
        return;
      }

      if (formElement?.contains(e.target)) {
        setShowForm(true);
      } else {
        setShowForm(false);
      }
    };

    window.addEventListener("mousedown", focusElementListener);

    return () => {
      window.removeEventListener("mousedown", focusElementListener);
    };
  }, [id]);

  return (
    <div
      id={id}
      className="m-auto w-1/3 rounded-xl border bg-card text-card-foreground shadow"
    >
      {!showForm ? (
        <div className="relative">
          <input
            placeholder="Take a note..."
            className="w-full appearance-none bg-inherit px-4 py-2 text-lg font-semibold outline-none ring-0"
          />
        </div>
      ) : (
        <NewNoteForm {...{ setShowForm }} />
      )}
    </div>
  );
};

export default NewNote;
