"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

function UKFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className}>
      <rect width={30} height={20} fill="#012169" />
      <path d="M0 0 L30 20 M0 20 L30 0" stroke="#FFFFFF" strokeWidth={4} />
      <path d="M0 0 L30 20 M0 20 L30 0" stroke="#C8102E" strokeWidth={2.5} />
      <path d="M15 0 V20 M0 10 H30" stroke="#FFFFFF" strokeWidth={6} />
      <path d="M15 0 V20 M0 10 H30" stroke="#C8102E" strokeWidth={3} />
    </svg>
  );
}

function ITFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className}>
      <rect width={10} height={20} fill="#009246" />
      <rect x={10} width={10} height={20} fill="#FFFFFF" />
      <rect x={20} width={10} height={20} fill="#CE2B37" />
    </svg>
  );
}

export default function LanguageButton() {
  const locale = useLocale();
  const t = useTranslations("LanguageButton");
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = locale === "it" ? "en" : "it";

  function handleClick() {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={nextLocale === "it" ? t("switchToIt") : t("switchToEn")}
      className="flex items-center border-0 outline-none justify-center overflow-hidden cursor-pointer transition-opacity focus-visible:opacity-70"
    >
      {locale === "it" ? <UKFlag className="h-auto w-12" /> : <ITFlag className="h-auto w-12" />}
    </button>
  );
}