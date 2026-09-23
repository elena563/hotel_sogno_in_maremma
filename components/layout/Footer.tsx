import Logo from "../icons/Logo";
import { useTranslations } from "next-intl";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IconButton } from "@/components/ui/icon-button";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full bg-primary text-surface flex flex-col gap-4 px-4">
      <div className="flex flex-col lg:flex-row w-full items-center justify-between gap-10 py-6">
        <div className="flex flex-col items-center lg:items-start gap-2">
            <Logo type="short" className="w-[170px] md:w-[230px] mb-2" />
            <p>tel 463 369 44</p>
            <p>info@hotelsognoinmaremma.it</p>
            <address>Strada di Tesoro, 2, Radicondoli (SI)</address>
            <p>{t.rich("disclaimer", { u: (chunks) => <u>{chunks}</u> })}</p>
        </div>
        <div className="flex flex-col gap-12 flex-1 justify-between lg:max-w-[45%] md:flex-row">
            <div>
                <h3 className="font-heading text-lg font-semibold mb-2">{t("whereWeAre")}</h3>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d2116.4872503768825!2d11.03744590934233!3d43.26388518460214!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sit!2sit!4v1700587965645!5m2!1sit!2sit"
                width="250" height="200" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
            </div>
            <div className="flex flex-col gap-2 lg:w-[250px] items-center md:items-start">
                <h3 className="font-heading text-lg font-semibold">{t("info")}</h3>
                <a className="underline" href="">{t("privacy")}</a>
                <a className="underline" href="">{t("vipSpaPools")}</a>
                <a className="underline" href="">{t("restaurant")}</a>
                <a className="underline" href="">{t("excursions")}</a>
                <div className="flex flex-col gap-2 mt-2">
                    <IconButton aria-label="Instagram"><FaInstagram /></IconButton>
                    <IconButton aria-label="X"><FaXTwitter /></IconButton>
                </div>
            </div>
        </div>
      </div>
      <p className="text-sm my-2">&copy; 2026 Hotel Sogno in Maremma. {t("copyright")} <a href="https://elenazen.it" className="underline">Elena Zen</a></p>
    </footer>
  );
}