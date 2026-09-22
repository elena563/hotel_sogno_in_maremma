import Logo from "../icons/Logo";
import { Link } from "@/i18n/navigation";
import LanguageButton from "@/components/icons/LanguageButton";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Nav");
  return (
    <header className="w-full flex items-center justify-between p-4 bg-primary text-surface">
      <Logo type="default" width={300} />
      <nav className="flex w-full max-w-2xl justify-between items-center">
        <Link href="/about" className="hover:underline">
          {t("about")}
        </Link>
        <Link href="/about" className="hover:underline">
          {t("rooms")}
        </Link>
        <Link href="/about" className="hover:underline">
          {t("services")}
        </Link>
        <Link href="/about" className="hover:underline">
          {t("book")}
        </Link>
        <Link href="/contact" className="hover:underline">
          {t("contact")}
        </Link>
        <LanguageButton />
      </nav>
    </header>
  )
}
