import { useMemo, useState } from "react";

export const useAddReminder = () => {
  const [tab, setTab] = useState<"preset" | "custom">("preset");

  const options = useMemo(() => {
    const today = new Date();

    const laterToday = {
      text: "Later today",
      time: today.setHours(20, 0, 0, 0),
    };

    today.setDate(today.getDate() + 1);

    const tomorrow = {
      text: "Tomorrow",
      time: today.setHours(8, 0, 0, 0),
    };

    today.setDate(today.getDate() + 6);

    const nextWeek = {
      text: "Next Week",
      time: today.setHours(8, 0, 0, 0),
    };

    return [laterToday, tomorrow, nextWeek];
  }, []);

  const format = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);

  const formatTime = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "numeric",
      hour12: true,
    }).format(date);

  return { options, tab, setTab, format, formatTime };
};
