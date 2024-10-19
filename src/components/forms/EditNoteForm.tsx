import { Notes } from "@/apis/notes.api";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import AddReminder from "./AddReminder";
import RemindAtBadge from "../RemindAtBadge";

const EditNoteForm = (note: Partial<Notes>) => {
  const { title, content, remindAt } = note;
  const form = useForm<Notes>({
    defaultValues: {
      title,
      content,
      remindAt,
    },
  });

  const { register } = form;

  const resizeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.setProperty("height", `auto`);
    e.target.style.setProperty("height", `${e.target.scrollHeight}px`);
  };

  return (
    <FormProvider {...form}>
      <form>
        <input
          {...register("title")}
          type="text"
          placeholder="Title"
          className="w-full bg-background py-1 text-xl font-semibold outline-none placeholder:text-muted-foreground focus-visible:ring-0"
        />
        <textarea
          {...register("content")}
          autoFocus
          placeholder="Note"
          rows={1}
          className="w-full resize-none bg-background py-1 outline-none placeholder:text-muted-foreground focus-visible:ring-0"
          onChange={resizeTextArea}
        />
        <RemindAtBadge />
        <div className="flex items-center">
          <AddReminder />
          <Button className="ml-auto block">Close</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditNoteForm;
