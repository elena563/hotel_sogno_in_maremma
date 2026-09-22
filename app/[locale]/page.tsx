
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerRange } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-serif">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-heading leading-10 tracking-tight text-foreground">
            Natura e Relax
          </h1>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button>Prenota</Button>
          <Button variant="outline">Scopri di più</Button>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row bg-secondary-dark p-6">
          <Button variant="outline_secondary">Scopri di più</Button>
        </div>
        <FieldGroup className="bg-primary-dark p-6">
        <Field>
          <FieldLabel>Informazioni personali</FieldLabel>
          <Input placeholder="Inserisci il tuo nome" />
        </Field>
        <Field orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" />
        <FieldLabel htmlFor="terms-checkbox">Accept terms and conditions</FieldLabel>
      </Field>
        <Field>
          <FieldLabel>Informazioni personali</FieldLabel>
          <DatePickerRange />
        </Field>
        <Select>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </FieldGroup>
      </main>
    </div>
  );
}
