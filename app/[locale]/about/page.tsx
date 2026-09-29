import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import BookingCTA from "@/components/layout/BookingCTA";
import { buttonVariants } from "@/components/ui/button";

import { services } from "@/lib/data/services";

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
            <div className="absolute bottom-12 md:top-1/3 left-0 md:p-6 m-6 z-10 flex flex-col gap-6 items-start justify-end md:max-w-full text-surface">
                <h1 className="text-4xl md:text-5xl font-heading font-bold whitespace-pre-line leading-snug text-shadow-lg"
                style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,1)) drop-shadow(0 0 40px rgba(0,0,0,1)) drop-shadow(0 0 40px rgba(0,0,0,1)) drop-shadow(0 0 40px rgba(0,0,0,1))" }}>
                {t("About.headline")}
                </h1>
            </div>
            </section>
            <div className="relative w-full min-h-[300px] overflow-hidden">
                <div className="absolute bottom-0 left-1/2 w-[270%] sm:w-[150%] lg:w-[120%] -translate-x-1/2">
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
                
                <div className="relative z-10 w-full flex flex-col-reverse md:flex-row items-center justify-center gap-8 py-16 md:px-6">
                    <div className="flex flex-col items-start gap-6 px-6">
                        <h2 className="text-3xl font-semibold font-heading text-secondary">
                        {t("About.intro")}
                        </h2>
                        <p className="text-left whitespace-pre-line">
                        {t("About.text")}
                        </p>
                        <div className="flex flex-col gap-6 sm:flex-row sm:justify-start">
                             <Link href="/rooms#book" className={buttonVariants({ variant: "default" })}>
                                {t("Home.book")}
                            </Link>
                            <Link href="/rooms" className={buttonVariants({ variant: "outline" })}>
                                {t("Other.rooms")}
                            </Link>
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
            <main className="flex flex-1 w-full flex-col items-center justify-between pb-16 pt-8 sm:items-start">
                <section id="services" className="py-6 flex flex-1 w-full flex-col items-center justify-center">
                    <div className="max-w-6xl">
                        <h2 className="text-3xl font-semibold font-heading text-secondary text-center mb-4">
                            {t("Services.headline")}
                        </h2>
                        <p className="text-left sm:text-center mb-8 px-6">
                            {t("Services.text")}
                        </p>
                    </div>
                    {services.map((service, index) => (
                        <div key={index} id={service.id}
                    className={`grid items-stretch gap-2 w-full grid-cols-1 ${
                        index % 2 !== 0 ? 'md:grid-cols-[40%_60%]' : 'md:grid-cols-[60%_40%]'
                    }`}
                    >
                    <div className={`relative h-64 md:h-full md:min-h-0 ${index % 2 !== 0 ? 'md:col-start-2' : 'md:col-start-1'}`}>
                        <Image src={service.image} alt={service.id} fill className={`object-cover ${service.imgPosition || "object-center"}`} />
                    </div>
                    <div className={`col-start-1 row-start-2 m-6 md:row-start-1 ${index % 2 !== 0 ? 'md:col-start-1' : 'md:col-start-2'}`}>
                        <h3 className="text-2xl font-heading font-semibold mb-4">{t(`Services.${service.id}.headline`)}</h3>
                        <p className="whitespace-pre-line">{t(`Services.${service.id}.text`)}</p>
                    </div>
                    </div>
                    ))}
                </section>
              
                
                <BookingCTA type="default" />
            </main>
      </div>
    );
}