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
      className={`inline-flex items-center ${className}`}
      aria-label="Metablify home"
    >
      <Image
        src="/images/logo-lockup.png"
        alt=""
        width={644}
        height={146}
        // Important: the global img rule is unlayered, so it outranks plain
        // height utilities and would leave this at height auto.
        className="no-round !h-12 w-auto md:!h-14"
        priority={priority}
      />
    </Link>
  );
}
