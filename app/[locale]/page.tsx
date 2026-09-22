
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

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
        <Field>
          <FieldLabel>Informazioni personali</FieldLabel>
          <Input type="email" placeholder="Inserisci la tua email" />
        </Field>
        <Field>
          <FieldLabel>Informazioni personali</FieldLabel>
          <Input type="number" placeholder="Adulti" />
        </Field>
        </FieldGroup>
      </main>
    </div>
  );
}
