import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { getTagsByUser, Tags, TAGS_KEY } from "@/apis/tags.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  addNoteToTag,
  deleteNoteFromTag,
  NoteToTag,
} from "@/apis/relation.api";
import { Note, NOTES_KEY } from "@/apis/notes.api";

function ManageLabelForm(note: Partial<Note>) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data: tags } = useQuery({
    queryFn: () => getTagsByUser(user!.id),
    queryKey: [TAGS_KEY],
    enabled: Boolean(user?.id),
  });

  const { mutate: mutateUpdate, isPending: updatePending } = useMutation({
    mutationFn: addNoteToTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTES_KEY] });
    },
  });

  const { mutate: mutateDelete, isPending: deletePending } = useMutation({
    mutationFn: deleteNoteFromTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTES_KEY] });
    },
  });

  const toggleUpdate = (data: NoteToTag, hasLabel: boolean) => {
    if (hasLabel) {
      mutateDelete(data);
      return;
    }
    mutateUpdate(data);
  };

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="block h-fit w-full px-2 py-1.5 text-left text-sm"
        >
          Manage labels
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" side="right" className="min-h-40 p-0">
        <Command loop>
          <CommandInput
            ref={inputRef}
            placeholder="Search label..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandGroup className="max-h-[145px] overflow-auto">
              {tags?.map((tag) => {
                const hasLabel = note.tags?.some(
                  (noteTag) => noteTag.id === tag.id,
                );
                return (
                  <CommandItem
                    key={tag.id}
                    value={tag.name}
                    onSelect={() =>
                      toggleUpdate(
                        { noteId: note.id!, tagId: tag.id },
                        hasLabel!,
                      )
                    }
                    disabled={updatePending || deletePending}
                  >
                    <Check
                      className={cn("h-4 w-4", { "opacity-0": !hasLabel })}
                    />
                    <div className="flex-1">{tag.name}</div>
                  </CommandItem>
                );
              })}
              <CommandItemCreate
                onSelect={() => {}}
                {...{ inputValue, tags: tags! }}
              />
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const CommandItemCreate = ({
  inputValue,
  tags,
  onSelect,
}: {
  inputValue: string;
  tags: Tags[];
  onSelect: () => void;
}) => {
  const hasNoValues = !tags
    .map(({ name }) => name)
    .includes(`${inputValue.toLowerCase()}`);

  const render = inputValue !== "" && hasNoValues;

  if (!render) return null;

  // BUG: whenever a space is appended, the Create-Button will not be shown.
  return (
    <CommandItem
      key={`${inputValue}`}
      value={`${inputValue}`}
      className="text-xs text-muted-foreground"
      onSelect={onSelect}
    >
      <div className={cn("mr-2 h-4 w-4")} />
      Create new label &quot;{inputValue}&quot;
    </CommandItem>
  );
};

export default ManageLabelForm;
