import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerRangeProps = {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
};

export function DatePickerRange({ value, onChange }: DatePickerRangeProps) {
  const t = useTranslations("Other");

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="secondary"
            className="justify-start text-left font-normal"
          >
            <CalendarIcon />
            {value?.from ? (
              value.to ? (
                `${format(value.from, "dd MMM yyyy")} - ${format(value.to, "dd MMM yyyy")}`
              ) : (
                format(value.from, "dd MMM yyyy")
              )
            ) : (
              <span className="text-foreground">{t("dates")}</span>
            )}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
