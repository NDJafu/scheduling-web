import { Button } from "../ui/button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import AddReminder from "./AddReminder";
import { addNotes, Notes, NOTES_KEY } from "@/apis/notes.api";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import RemindAtBadge from "../RemindAtBadge";
import { cn } from "@/lib/utils";

interface NewNoteFormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewNoteForm = ({ showForm, setShowForm }: NewNoteFormProps) => {
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

  const { register, handleSubmit, reset } = form;

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

  useEffect(() => {
    if (!showForm) reset();
  }, [showForm, reset]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
      >
        <input
          {...register("title")}
          placeholder="Title"
          className={cn(
            "w-full appearance-none bg-inherit px-4 py-2 text-lg font-semibold leading-none outline-none ring-0",
            { hidden: !showForm },
          )}
          maxLength={256}
        />
        <textarea
          {...register("content")}
          rows={1}
          placeholder="Take a note..."
          className={cn(
            "w-full resize-none appearance-none bg-inherit px-4 py-2 outline-none ring-0",
            { "text-lg": !showForm },
          )}
          onChange={resizeTextArea}
        />
        <div className={cn("ml-4", { hidden: !showForm })}>
          <RemindAtBadge />
        </div>
        <div
          className={cn("flex items-center px-4 py-2", { hidden: !showForm })}
        >
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
