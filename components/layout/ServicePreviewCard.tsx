import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Service } from "@/lib/data/services";

export default function ServicePreviewCard({ service }: { service: Service }) {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center gap-4 bg-background p-6">
      <Image
        src={service.illustration}
        alt={t(`Services.${service.id}.title`)}
        width={150}
        height={150}
        className="object-cover"
      />
      <h3 className="text-2xl font-semibold">{t(`Services.${service.id}.title`)}</h3>
      <p className="text-gray-600 text-center">{t(`Services.${service.id}.description`)}</p>
      <Link href={service.link} className="text-secondary hover:underline">
        {t("Other.discover")}
      </Link>
    </div>
  );
}
