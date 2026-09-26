import Image from "next/image";
import { useTranslations } from "next-intl";

import BookingCTA from "@/components/layout/BookingCTA";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    const t = useTranslations();
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-background font-serif">
            <section className="relative h-[80vh]">
            <Image
                src="/images/hero-about.webp"
                alt="Hotel Sogno in Maremma"
                fill
                priority
                className="object-cover object-center"
            />
            <div className="absolute top-1/3 left-0 p-6 m-6 z-10 flex flex-col gap-6 items-start justify-end md:max-w-full text-surface">
                <h1 className="text-5xl font-heading font-bold whitespace-pre-line leading-snug text-shadow-lg"
                style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,1)) drop-shadow(0 0 40px rgba(0,0,0,1)) drop-shadow(0 0 80px rgba(0,0,0,1)) drop-shadow(0 0 120px rgba(0,0,0,1))" }}>
                {t("About.headline")}
                </h1>
            </div>
            </section>
            <div className="relative w-full min-h-[300px] overflow-hidden">
                <div className="absolute bottom-0 left-1/2 w-[170%] sm:w-[150%] lg:w-[120%] -translate-x-1/2">
                    <Image
                        src="/images/hill.svg"
                        alt=""
                        width={1940}
                        height={355}
                        aria-hidden="true"
                        sizes="100vw"
                        className="block h-auto w-full"
                    />
                </div>
                
                <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-10">
                    <div className="flex flex-col items-start gap-6 px-6 py-10">
                        <h2 className="text-3xl font-semibold font-heading text-secondary">
                        {t("About.intro")}
                        </h2>
                        <p className="text-left whitespace-pre-line">
                        {t("About.text")}
                        </p>
                        <div className="flex flex-col gap-6 sm:flex-row sm:justify-start">
                            <Button>{t("Home.book")}</Button>
                            <Button variant="outline">{t("Other.discover")}</Button>
                        </div>
                    </div>
                    <Image
                    src="/images/maremma-town.webp"
                    alt="Maremma"
                    width={500}
                    height={500}
                    aria-hidden="true"
                    className="object-contain w-[80%] md:w-[40%]"
                    />
                </div>
                </div>
            <main className="flex flex-1 w-full flex-col max-w-6xl items-center justify-between pb-16 pt-8 sm:items-start">
               
                
                <BookingCTA type="default" />
            </main>
      </div>
    );
}