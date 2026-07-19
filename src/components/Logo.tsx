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
      className={`inline-flex items-center gap-3 ${className}`}
      aria-label="Metablify home"
    >
      <Image
        src="/images/logo-mark.svg"
        alt=""
        width={40}
        height={40}
        className="h-9 w-9 md:h-10 md:w-10"
        priority={priority}
      />
      <span
        className="text-lg font-semibold tracking-[0.04em] text-ink uppercase md:text-xl"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Metablify
      </span>
    </Link>
  );
}
