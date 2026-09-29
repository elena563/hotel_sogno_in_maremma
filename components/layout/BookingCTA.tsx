import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import BookingForm from "@/components/layout/BookingForm";

export default function BookingCTA({
  type = "default",
}: {
  type?: "default" | "form";
}) {
  const t = useTranslations("Booking");

  return (
    <div
      className={`w-full flex ${type === "form" ? "flex-col" : "md:flex-row md:items-center flex-col items-center"} flex-1 justify-center bg-surface text-foreground gap-6 p-6`}
    >
      <div className="w-full flex flex-col items-center md:items-start gap-4 text-center md:text-left">
        <h2 className="text-3xl font-heading font-semibold">{t("ctaTitle")}</h2>
        <p>{t("ctaSubtitle")}</p>
      </div>
      {type === "form" ? (
        <BookingForm />
      ) : (
        <Link
          href="/rooms#book"
          className={`w-full max-w-48 ${buttonVariants({ variant: "default" })}`}
        >
                                {t("ctaButton")}
                            </Link>
      )}
    </div>
  );
}
