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
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="Metablify home"
    >
      <Image
        src="/images/logo-lockup.png"
        alt=""
        width={1034}
        height={269}
        // Important: the global img rule is unlayered, so it outranks plain
        // height utilities and would leave this at height auto. max-w-none goes
        // with the shrink-0 above: without it a tight bar squeezes the width
        // while the height class holds, which distorts the lockup.
        className="no-round !h-12 w-auto !max-w-none md:!h-14"
        priority={priority}
      />
    </Link>
  );
}
