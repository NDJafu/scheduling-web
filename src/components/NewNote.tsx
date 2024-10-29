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
      className="mx-auto w-2/3 rounded-xl border bg-card text-card-foreground shadow lg:w-1/3"
    >
      <NewNoteForm {...{ showForm, setShowForm }} />
    </div>
  );
};

export default NewNote;
