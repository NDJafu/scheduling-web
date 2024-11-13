import { addTag, Tags, TAGS_KEY } from "@/apis/tags.api";
import { XIcon, PlusIcon, CheckIcon } from "lucide-react";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";

const NewTagForm = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const form = useForm<Tags>({
    defaultValues: {
      createdBy: user!.id,
    },
  });

  const { register, handleSubmit } = form;

  const newTagRef = useRef<HTMLInputElement>(null);

  const { mutate } = useMutation({
    mutationFn: addTag,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [TAGS_KEY] }),
  });

  const onSubmit: SubmitHandler<Tags> = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-2 rounded border border-l-4 border-l-amber-300 p-1 dark:border-l-amber-400">
        <Button
          className="hidden rounded-full has-[~_input:focus-within]:inline-flex"
          onClick={() => newTagRef.current?.blur()}
          variant="ghost"
          size="icon"
        >
          <XIcon size={20} strokeWidth={3} />
        </Button>
        <Button
          className="rounded-full has-[~_input:focus-within]:hidden"
          onClick={() => newTagRef.current?.focus()}
          variant="ghost"
          size="icon"
        >
          <PlusIcon size={20} strokeWidth={3} />
        </Button>
        <input
          {...register("name")}
          ref={(e) => {
            register("name").ref(e);
            return newTagRef;
          }}
          className="peer/new_tag bg-background placeholder:text-muted-foreground focus-within:outline-none"
          placeholder="Create new tag"
        />
        <Button
          type="submit"
          className="rounded-full opacity-0 peer-focus-within/new_tag:opacity-100"
          onClick={() => newTagRef.current?.blur()}
          variant="ghost"
          size="icon"
        >
          <CheckIcon size={20} strokeWidth={3} />
        </Button>
      </div>
    </form>
  );
};

export default NewTagForm;
