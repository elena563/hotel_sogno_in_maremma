import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerRange } from "@/components/ui/date-picker";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function BookingForm() {
  const t = useTranslations("Booking.form");

  return (
    <form className="w-full flex flex-col gap-4 p-4 bg-primary">
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
          <DatePickerRange />
        </Field>
      <Field>
          <FieldLabel>{t("board")}</FieldLabel>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("boardPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel>{t("adults")}</FieldLabel>
          <Input type="number" />
        </Field>
        <Field>
          <FieldLabel>{t("children")}</FieldLabel>
          <Input type="number" />
        </Field>  
    </FieldGroup>
     <Field orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" />
        <FieldLabel htmlFor="terms-checkbox">{t("terms")}</FieldLabel>
        </Field>
    <Button type="submit" variant="default" className="w-full max-w-48">
        {t("submit")}
    </Button>
    </form>
  );
}