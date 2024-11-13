import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import React, { ComponentPropsWithoutRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import NewTagForm from "../forms/NewTagForm";
import EditTagForm from "../forms/EditTagForm";
import { getTagsByUser, TAGS_KEY } from "@/apis/tags.api";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

const EditTagsDialog = () => {
  const { user } = useUser();
  const { data: tags } = useQuery({
    queryFn: () => getTagsByUser(user!.id),
    queryKey: [TAGS_KEY],
    enabled: Boolean(user?.id),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <EditTagsButton />
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>Edit labels</DialogTitle>
          <DialogDescription>Create tags to sort your notes</DialogDescription>
        </DialogHeader>
        <NewTagForm />
        {tags?.map(({ id, name }) => (
          <EditTagForm key={id} defaultValues={{ id, name }} />
        ))}
      </DialogContent>
    </Dialog>
  );
};

export const EditTagsButton = React.forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>((props, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={cn(
        "flex items-center self-stretch rounded-full p-1 text-lg transition duration-300 ease-in-out",
        "group-data-[state=open]/sidebar:rounded-l-none group-data-[state=open]/sidebar:px-3",
      )}
    >
      <span
        className={cn(
          "p-3 group-hover/sidebar:mr-4",
          "group-data-[state=open]/sidebar:mr-4",
        )}
      >
        <Pencil size={24} />
      </span>
      <p
        className={cn(
          "max-w-[200px] truncate font-medium",
          "group-data-[state=open]/sidebar:translate-x-0 group-data-[state=open]/sidebar:opacity-100",
          "group-data-[state=closed]/sidebar:translate-x-96 group-data-[state=closed]/sidebar:opacity-0",
          "group-hover/sidebar:!translate-x-0 group-hover/sidebar:!opacity-100",
        )}
      >
        Edit Labels
      </p>
    </button>
  );
});

export default EditTagsDialog;
