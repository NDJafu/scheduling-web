import { Notes, NOTES_KEY, updateNote } from "@/apis/notes.api";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import AddReminder from "./AddReminder";
import RemindAtBadge from "../RemindAtBadge";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type EditNoteFormProps = Notes & {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditNoteForm = ({ setOpen, ...note }: EditNoteFormProps) => {
  const { id, title, content, remindAt } = note;
  const queryClient = useQueryClient();

  const form = useForm<Notes>({
    defaultValues: { id, title, content, remindAt },
  });

  const { register, handleSubmit } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTES_KEY] });
      setOpen(false);
    },
  });

  const onSubmit: SubmitHandler<Notes> = (data) => {
    mutate(data);
  };

  const resizeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.setProperty("height", `auto`);
    e.target.style.setProperty("height", `${e.target.scrollHeight}px`);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="flex items-center py-2">
          <AddReminder />
          <Button type="submit" className="ml-auto block" disabled={isPending}>
            Close
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditNoteForm;
