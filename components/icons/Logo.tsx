import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  type?: "default" | "short";
  width?: number;
  className?: string;
};

export default function Logo({
  type = "default",
  width = 500,
  className,
}: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={`${type === "default" ? "/images/logo.png" : "/images/logo_short.png"}`}
        alt="Hotel Sogno in Maremma Logo"
        width={540}
        height={129}
        style={className ? undefined : { width: `${width}px`, height: "auto" }}
        className={className ? `${className} h-auto` : ""}
      />
    </Link>
  );
}
