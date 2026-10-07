"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { DatePickerRange } from "@/components/ui/date-picker";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

import type { Board } from "@/lib/pricing";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BookingFormState = {
  range: DateRange | undefined;
  adults: string;
  children: string;
  board: Board;
};

export default function BookingForm() {
  const t = useTranslations("Booking.form");
  const router = useRouter();
  const boardLabels: Record<Board, string> = {
    bb: t("bb"),
    half_board: t("half_board"),
    full_board: t("full_board"),
  };

  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState<BookingFormState>({
    range: undefined,
    adults: "2",
    children: "0",
    board: "bb",
  });

  function handleChange(patch: Partial<BookingFormState>) {
    setFormData((prev) => ({ ...prev, ...patch }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { range, board } = formData;

    if (!range?.from || !range.to) return;

    const adults = Math.min(20, Math.max(0, Number(formData.adults) || 0));
    const children = Math.min(20, Math.max(0, Number(formData.children) || 0));

    const checkIn = format(range.from, "yyyy-MM-dd");
    const checkOut = format(range.to, "yyyy-MM-dd");

    startTransition(() => {
      router.push(
        {
          pathname: "/rooms",
          query: {
            checkIn,
            checkOut,
            adults: String(adults),
            children: String(children),
            board,
          },
        },
        { scroll: false },
      );
    });
  }

  return (
    <form
      className="w-full flex flex-col md:flex-row md:items-end gap-4 md:gap-10 p-4 bg-primary"
      onSubmit={handleSubmit}
    >
      <FieldGroup className="flex-1 md:flex-row items-end">
        <Field>
          <FieldLabel htmlFor="period">{t("period")}</FieldLabel>
          <DatePickerRange
            id="period"
            value={formData.range}
            onChange={(range) => handleChange({ range })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="board">{t("board")}</FieldLabel>
          <Select
            value={formData.board}
            onValueChange={(board) => handleChange({ board: board as Board })}
            itemToStringLabel={(value) =>
              boardLabels[value as Board] ?? String(value)
            }
          >
            <SelectTrigger id="board" className="w-full">
              <SelectValue placeholder={t("boardPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="bb">{t("bb")}</SelectItem>
                <SelectItem value="half_board">{t("half_board")}</SelectItem>
                <SelectItem value="full_board">{t("full_board")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="adults">{t("adults")}</FieldLabel>
          <Input
            id="adults"
            name="adults"
            type="number"
            min={0}
            max={20}
            value={formData.adults}
            onChange={(event) => handleChange({ adults: event.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="children">{t("children")}</FieldLabel>
          <Input
            id="children"
            name="children"
            type="number"
            min={0}
            max={20}
            value={formData.children}
            onChange={(event) => handleChange({ children: event.target.value })}
          />
        </Field>
      </FieldGroup>
      <Button
        type="submit"
        variant="default"
        className="w-full max-w-48"
        disabled={isPending}
      >
        {isPending ? <Spinner className="size-5" /> : t("search")}
      </Button>
    </form>
  );
}
