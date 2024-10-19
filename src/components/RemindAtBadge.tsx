import { Notes } from "@/apis/notes.api";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Badge } from "./ui/badge";
import { Clock, X } from "lucide-react";

const RemindAtBadge = () => {
  const { watch, unregister } = useFormContext<Notes>();

  const remindAt = watch("remindAt");

  const displayReminder = useMemo(() => {
    if (!remindAt) return undefined;

    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(remindAt);
  }, [remindAt]);

  if (displayReminder)
    return (
      <Badge
        variant="secondary"
        className="ml-4 mt-2 inline-flex items-center gap-1 rounded-full px-1 py-0.5"
      >
        <Clock size={14} strokeWidth={1.5} />
        <span className="ml-2">{displayReminder}</span>
        <button
          type="button"
          className="rounded-full hover:bg-gray-300/25 dark:hover:bg-neutral-700/75"
          onClick={() => unregister("remindAt")}
        >
          <X size={14} strokeWidth={1.5} />
        </button>
      </Badge>
    );
};

export default RemindAtBadge;
