import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className = "", priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center gap-2.5 ${className}`}
      aria-label="Metablify home"
    >
      <Image
        src="/images/logo-icon.png"
        alt=""
        width={333}
        height={333}
        // Important: the global img rule is unlayered, so it outranks plain
        // height utilities and would leave this at height auto.
        className="no-round !h-11 w-auto !max-w-none md:!h-12"
        priority={priority}
      />
      <Image
        src="/images/logo-wordmark.png"
        alt=""
        width={1270}
        height={308}
        // Wordmark sits below the icon’s optical weight — a bit over half its height.
        className="no-round !h-7 w-auto !max-w-none md:!h-8"
        priority={priority}
      />
    </Link>
  );
}
