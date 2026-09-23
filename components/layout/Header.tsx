"use client";

import { useState } from "react";
import Logo from "../icons/Logo";
import { Link } from "@/i18n/navigation";
import LanguageButton from "@/components/icons/LanguageButton";
import { useTranslations } from "next-intl";

const navItems = [
  { href: "/about", key: "about" },
  { href: "/about", key: "rooms" },
  { href: "/about", key: "services" },
  { href: "/about", key: "book" },
  { href: "/contact", key: "contact" },
];

export default function Header() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="relative w-full bg-primary text-surface">
      <div className="flex w-full items-center justify-between gap-8 p-4">
        <Logo className="w-[170px] md:w-[300px]" />
        <div className="flex items-center gap-4 md:hidden">
          <LanguageButton />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            className="flex items-center justify-center border-0 outline-none cursor-pointer"
          >
            <span
              aria-hidden="true"
              className={`relative block h-3.5 w-5 transition-transform duration-300 ease-in-out ${
                open ? "rotate-90" : ""
              }`}
            >
              <span
                className={`absolute left-0 top-0 block h-0.5 w-full bg-current transition-all duration-300 ease-in-out origin-center ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 bg-current transition-all duration-300 ease-in-out ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 block h-0.5 w-full bg-current transition-all duration-300 ease-in-out origin-center ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
        <nav className="hidden md:flex w-full max-w-2xl justify-between items-center">
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
      </div>
      <nav
        id="mobile-nav"
        aria-hidden={!open}
        className={`absolute top-full left-0 right-0 flex flex-col gap-2 overflow-hidden bg-primary px-4 pb-4 transition-all duration-500 ease-in-out md:hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            onClick={() => setOpen(false)}
            className="hover:underline py-2"
          >
            {t(item.key)}
          </Link>
        ))}
      </nav>
    </header>
  )
}
