import { Button } from "../ui/button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import AddReminder from "./AddReminder";
import { addNotes, Notes, NOTES_KEY } from "@/apis/notes.api";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import RemindAtBadge from "../RemindAtBadge";

interface NewNoteFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewNoteForm = ({ setShowForm }: NewNoteFormProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addNotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTES_KEY] });
      setShowForm(false);
    },
  });

  const { user } = useUser();

  const form = useForm<Notes>({
    defaultValues: {
      createdBy: user?.id,
    },
  });

  const { register, handleSubmit } = form;

  const onSubmit: SubmitHandler<Notes> = (data) => {
    if (data.content === "") {
      setShowForm(false);
      return;
    }

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
          placeholder="Title"
          className="w-full appearance-none bg-inherit px-4 py-2 text-lg font-semibold leading-none outline-none ring-0"
          maxLength={256}
        />
        <textarea
          {...register("content")}
          rows={1}
          autoFocus
          placeholder="Take a note..."
          className="w-full resize-none appearance-none bg-inherit px-4 py-2 outline-none ring-0"
          onChange={resizeTextArea}
        />
        <div className="ml-4">
          <RemindAtBadge />
        </div>
        <div className="flex items-center px-4 py-2">
          <AddReminder />
          <Button
            type="submit"
            className="ml-auto block font-bold"
            disabled={isPending}
          >
            Close
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default NewNoteForm;
