import { CheckIcon, PencilIcon, TagIcon, TrashIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Tags, TAGS_KEY, updateTag } from "@/apis/tags.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditTagForm = ({ defaultValues }: { defaultValues?: Partial<Tags> }) => {
  const editTagRef = useRef<HTMLInputElement>(null);
  const form = useForm<Tags>({ defaultValues });
  const { register, handleSubmit } = form;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateTag,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [TAGS_KEY] }),
  });

  const onSubmit: SubmitHandler<Tags> = (data) => {
    if (data.name === defaultValues?.name) return;
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="group/edit_tag flex items-center gap-2 rounded border border-l-4 border-l-amber-300 p-1 dark:border-l-amber-400">
        <Button
          size="icon"
          variant="ghost"
          className="group-hover/edit_tag:hidden"
        >
          <TagIcon size={20} strokeWidth={3} />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="hidden rounded-full group-hover/edit_tag:inline-flex"
        >
          <TrashIcon size={20} strokeWidth={3} />
        </Button>
        <input
          {...register("name", {
            required: true,
          })}
          type="text"
          ref={(e) => {
            register("name").ref(e);
            return editTagRef;
          }}
          className="peer/edit_tag bg-background focus-within:outline-none"
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="rounded-full peer-focus-within/edit_tag:[&>svg+svg]:hidden peer-focus-within/edit_tag:[&>svg]:inline-block"
        >
          <CheckIcon size={20} className="hidden" />
          <PencilIcon size={20} />
        </Button>
      </div>
    </form>
  );
};

export default EditTagForm;
