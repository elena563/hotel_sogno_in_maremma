import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("Privacy");

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-serif">
      <main className="flex flex-1 w-full flex-col max-w-6xl items-center justify-between pb-16 pt-8 sm:items-start">
        <div className="w-full flex flex-col items-center gap-6 px-6 py-16">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-center mb-8">
            {t("headline")}
          </h1>

          <section className="w-full flex flex-col gap-2">
            <h2 className="text-xl font-semibold font-heading text-secondary">
              {t("project.title")}
            </h2>
            <p>{t("project.text")}</p>
          </section>

          <section className="w-full flex flex-col gap-2">
            <h2 className="text-xl font-semibold font-heading text-secondary">
              {t("images.title")}
            </h2>
            <p>{t("images.text")}</p>
          </section>

          <section className="w-full flex flex-col gap-2">
            <h2 className="text-xl font-semibold font-heading text-secondary">
              {t("cookies.title")}
            </h2>
            <p>{t("cookies.text")}</p>
          </section>

          <section className="w-full flex flex-col gap-2">
            <h2 className="text-xl font-semibold font-heading text-secondary">
              {t("bookings.title")}
            </h2>
            <p>{t("bookings.text")}</p>
          </section>

          <section className="w-full flex flex-col gap-2">
            <h2 className="text-xl font-semibold font-heading text-secondary">
              {t("advice.title")}
            </h2>
            <p>{t("advice.text")}</p>
          </section>

          <p className="text-sm text-center mt-4">{t("updated")}</p>
        </div>
      </main>
    </div>
  );
}
