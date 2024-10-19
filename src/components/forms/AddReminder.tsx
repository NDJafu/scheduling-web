import { ArrowLeft, BellPlus, CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { useFormContext } from "react-hook-form";
import { Notes } from "@/apis/notes.api";
import { cn } from "@/lib/utils";
import { useAddReminder } from "@/hooks/useAddReminder";
import { Calendar } from "../ui/calendar";
import { useRef, useState } from "react";
import { Input } from "../ui/input";

const AddReminder = () => {
  const { options, tab, setTab, format, formatTime } = useAddReminder();
  const { setValue } = useFormContext<Notes>();

  const [datePickerValue, setDatePickerValue] = useState<Date>();
  const [isValidTime, setIsValidTime] = useState<boolean>(true);
  const timePickerRef = useRef<HTMLInputElement>(null);

  function setDate(day?: Date) {
    const date = new Date();
    if (datePickerValue) {
      date.setHours(datePickerValue.getHours(), datePickerValue.getMinutes());
    }
    if (day) {
      date.setFullYear(day.getFullYear(), day.getMonth(), day.getDate());
    }

    timePickerRef.current!.value = formatTime(date);
    setDatePickerValue(date);
  }

  function setTime(value: string) {
    const checkTime = new RegExp(/^(0[1-9]|1[0-2]):[0-5][0-9]\s(AM|PM)$/);

    if (!checkTime.test(value)) {
      setIsValidTime(false);
      return;
    }

    const [time, period] = value.split(" ");
    const [hourStr, minuteStr] = time.split(":");

    let hour = Number(hourStr);
    const minute = Number(minuteStr);
    if (period === "PM" && hour < 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    let date = new Date();
    if (datePickerValue) date = datePickerValue;
    date.setHours(hour, minute);
    setDatePickerValue(date);
    setIsValidTime(true);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <BellPlus size={20} />
      </PopoverTrigger>
      <PopoverContent
        className="space-y-2 overflow-hidden"
        id="remindersForm"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div
          className={cn(
            "flex w-[calc(200%_+_32px)] gap-8 transition-transform",
            {
              "-translate-x-[calc(50%_+_16px)]": tab === "custom",
            },
          )}
        >
          <div className="flex-1">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Remind me later</h4>
              <p className="text-sm text-muted-foreground">
                Saved in reminders tab
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Options</label>
              {options.map((option) => (
                <ReminderOption
                  key={option.text}
                  text={option.text}
                  time={option.time}
                  showWeekday={option.text === "Next Week"}
                />
              ))}
              <Button
                variant="outline"
                className="flex w-full justify-between rounded-sm px-2"
                onClick={() => setTab("custom")}
              >
                <span className="font-medium">Pick date and time</span>
              </Button>
            </div>
          </div>
          <div className="relative flex-1">
            <ArrowLeft
              onClick={() => setTab("preset")}
              className="absolute -left-1 -top-1 size-8 rounded-full p-1 hover:bg-gray-200/50 dark:hover:bg-neutral-800"
            />
            <div className="space-y-2 text-right">
              <h4 className="font-medium leading-none">Pick time and date</h4>
              <p className="text-sm text-muted-foreground">
                Saved in reminders tab
              </p>
            </div>
            <div className="mt-2 space-y-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start px-2 text-left font-normal",
                      {
                        "text-muted-foreground": !datePickerValue,
                      },
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {datePickerValue ? (
                      format(datePickerValue)
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  id="reminderDatePicker"
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={datePickerValue}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="text"
                ref={timePickerRef}
                placeholder="Pick a time"
                className={cn("focus-visible:ring-0", {
                  "border-b-red-600": !isValidTime,
                })}
                onChange={(e) => setTime(e.target.value)}
              />
              <PopoverClose asChild>
                <Button
                  className="absolute bottom-0 right-0"
                  type="button"
                  disabled={!datePickerValue || !isValidTime}
                  onClick={() => setValue("remindAt", datePickerValue!)}
                >
                  Save
                </Button>
              </PopoverClose>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface ReminderOption {
  text: string;
  time: number;
  showWeekday?: boolean;
}

export const ReminderOption = ({
  text,
  time,
  showWeekday = false,
}: ReminderOption) => {
  const displayTime = new Intl.DateTimeFormat("en-US", {
    weekday: showWeekday ? "short" : undefined,
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(time));

  const { setValue } = useFormContext<Notes>();

  return (
    <PopoverClose asChild>
      <Button
        variant="outline"
        className="flex w-full justify-between rounded-sm px-2"
        onClick={() => setValue("remindAt", new Date(time))}
      >
        <span className="font-medium">{text}</span>
        <span>{displayTime}</span>
      </Button>
    </PopoverClose>
  );
};

export default AddReminder;
