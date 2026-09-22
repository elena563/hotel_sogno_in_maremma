
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import BookingCTA from "@/components/layout/BookingCTA";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-serif">
      <main className="flex flex-1 w-full flex-col max-w-5xl items-center justify-between py-32 px-16 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-6xl font-heading font-bold text-foreground">
            NATURA, RELAX E COMFORT
          </h1>
        </div>
        <BookingCTA type="form" />
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
    
        </FieldGroup>
      </main>
    </div>
  );
}
