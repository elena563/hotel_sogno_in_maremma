"use client";

import { useActionState } from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { createBooking } from "@/lib/booking";
import type { BookingSearch } from "@/lib/types";
import { useTranslations } from "next-intl";


export default function ConfirmForm({ search }: { search: BookingSearch }) {
    const t = useTranslations("Booking.form");
    const [state, formAction, isPending] = useActionState(createBooking, { status: "idle" });

    return (
      <form
        className="w-full flex flex-col gap-4 p-4 bg-primary"
        action={formAction}
      >
      <FieldGroup className="flex-1 md:flex-row ">
          <Field>
            <FieldLabel>{t("name")}</FieldLabel>
            <Input name="name" placeholder={t("namePlaceholder")} />
          </Field>
          <Field>
            <FieldLabel>{t("email")}</FieldLabel>
            <Input name="email" type="email" placeholder={t("emailPlaceholder")} />
          </Field>
        </FieldGroup>
        <Field orientation="horizontal">
          <Checkbox id="terms-checkbox" name="terms-checkbox" />
          <FieldLabel htmlFor="terms-checkbox">{t("terms")}</FieldLabel>
        </Field>
        <input type="hidden" name="checkIn" value={format(search.checkIn, "yyyy-MM-dd")} />
        <input type="hidden" name="checkOut" value={format(search.checkOut, "yyyy-MM-dd")} />
        <input type="hidden" name="adults" value={search.adults} />
        <input type="hidden" name="children" value={search.children} />
        <input type="hidden" name="board" value={search.board} />
        <input type="hidden" name="room" value={search.room} />
        <Button type="submit" variant="default" className="w-full max-w-48">
          {t("confirm")}
        </Button>
      </form>
    )
}