import { Bookmark, Clock, ImageIcon, Pin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Note, NOTES_KEY, updateNote } from "@/apis/notes.api";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NoteCardOptions from "./NoteCardOptions";
import { Badge } from "./ui/badge";
import { useMemo } from "react";
import React from "react";
import { UploadButton } from "@/lib/uploadthing";

const NoteCard = ({
  id,
  title,
  content,
  isPinned,
  isArchived,
  remindAt,
  images,
  tags,
}: Note) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [NOTES_KEY] }),
  });

  const togglePinned = () => {
    mutate({ id, isPinned: !isPinned });
  };

  const toggleArchived = () => {
    mutate({ id, isArchived: !isArchived });
  };

  const displayReminder = useMemo(() => {
    if (!remindAt) return undefined;

    return new Date(`${remindAt} UTC`).toLocaleString("en-US", {
      weekday: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }, [remindAt]);

  return (
    <Card className="group/note relative h-fit">
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        <CardDescription className="whitespace-pre-line">
          {content}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        {images && (
          <div className="relative mb-2 overflow-hidden rounded">
            <img className="w-full" src={images[0].url} alt="upload-image" />
            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <p className="text-xl font-bold text-white">
                  +{images.length - 1}
                </p>
              </div>
            )}
          </div>
        )}
        {displayReminder && (
          <Badge
            variant="secondary"
            className="mt-2 inline-flex items-center gap-1 rounded-full px-1 py-0.5"
          >
            <Clock size={14} strokeWidth={1.5} />
            <span className="mx-2">{displayReminder}</span>
          </Badge>
        )}
        <div
          className="-mx-1.5 -mb-1.5 flex w-fit items-center text-muted-foreground opacity-0 transition-opacity group-hover/note:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <Bookmark
            size={32}
            className={cn(
              "rounded-full p-1.5 hover:cursor-pointer hover:bg-gray-200/50 dark:hover:bg-neutral-800",
              isArchived && "fill-muted-foreground",
            )}
            onClick={toggleArchived}
          />
          <UploadButton
            endpoint="imageUploader"
            className="size-8"
            appearance={{
              allowedContent: "hidden",
              button: "!text-inherit",
            }}
            onClientUploadComplete={(res) => {
              // Map the result itself into another object array
              mutate({
                id,
                images: images ? images.concat(res) : res,
              });
            }}
            content={{
              button: (
                <ImageIcon
                  className="rounded-full p-1.5 hover:cursor-pointer hover:bg-gray-200/50 dark:hover:bg-neutral-800"
                  size={32}
                />
              ),
            }}
          />
          <NoteCardOptions id={id} tags={tags} />
          <Pin
            size={40}
            className={cn(
              "absolute right-2 top-2 rounded-full p-2 hover:cursor-pointer hover:bg-gray-200/50 dark:hover:bg-neutral-800",
              isPinned && "fill-muted-foreground",
            )}
            onClick={togglePinned}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(NoteCard);
