"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  adults: number;
  children: number;
  board: Board;
};

export default function BookingForm() {
  const t = useTranslations("Booking.form");
  const router = useRouter();

  const [formData, setFormData] = useState<BookingFormState>({
    range: undefined,
    adults: 2,
    children: 0,
    board: "bb",
  });

  function handleChange(patch: Partial<BookingFormState>) {
    setFormData((prev) => ({ ...prev, ...patch }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { range, adults, children, board } = formData;

    if (!range?.from || !range.to) return;

    router.push({
      pathname: "/rooms",
      query: {
        checkIn: format(range.from, "yyyy-MM-dd"),
        checkOut: format(range.to, "yyyy-MM-dd"),
        adults: String(adults),
        children: String(children),
        board,
      },
    });
  }

  return (
    <form
      className="w-full flex flex-col gap-4 p-4 bg-primary"
      onSubmit={handleSubmit}
    >
      <FieldGroup className="flex-1 md:flex-row ">
        <Field>
          <FieldLabel>{t("name")}</FieldLabel>
          <Input placeholder={t("namePlaceholder")} />
        </Field>
        <Field>
          <FieldLabel>{t("email")}</FieldLabel>
          <Input type="email" placeholder={t("emailPlaceholder")} />
        </Field>
      </FieldGroup>
      <FieldGroup className="flex-1 md:flex-row items-end">
        <Field>
          <FieldLabel>{t("period")}</FieldLabel>
          <DatePickerRange
            value={formData.range}
            onChange={(range) => handleChange({ range })}
          />
        </Field>
        <Field>
          <FieldLabel>{t("board")}</FieldLabel>
          <Select
            value={formData.board}
            onValueChange={(board) => handleChange({ board: board as Board })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("boardPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="bb">{t("boardBb")}</SelectItem>
                <SelectItem value="half_board">{t("boardHalfBoard")}</SelectItem>
                <SelectItem value="full_board">{t("boardFullBoard")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel>{t("adults")}</FieldLabel>
          <Input
            type="number"
            min={0}
            max={20}
            value={formData.adults}
            onChange={(event) => handleChange({ adults: Number(event.target.value) })}
          />
        </Field>
        <Field>
          <FieldLabel>{t("children")}</FieldLabel>
          <Input
            type="number"
            min={0}
            max={20}
            value={formData.children}
            onChange={(event) => handleChange({ children: Number(event.target.value) })}
          />
        </Field>
      </FieldGroup>
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" />
        <FieldLabel htmlFor="terms-checkbox">{t("terms")}</FieldLabel>
      </Field>
      <Button type="submit" variant="default" className="w-full max-w-48">
        {t("search")}
      </Button>
    </form>
  );
}
