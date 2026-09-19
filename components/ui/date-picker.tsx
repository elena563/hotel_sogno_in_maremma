"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerRange() {
  const [range, setRange] = React.useState<DateRange>();

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className="justify-start text-left font-normal"
          >
            <CalendarIcon />
            {range?.from ? (
              range.to ? (
                `${format(range.from, "dd MMM yyyy")} – ${format(range.to, "dd MMM yyyy")}`
              ) : (
                format(range.from, "dd MMM yyyy")
              )
            ) : (
              <span className="text-muted-foreground">Seleziona le date</span>
            )}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
