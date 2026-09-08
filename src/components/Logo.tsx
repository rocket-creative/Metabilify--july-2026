import Link from "next/link";
import { siteConfig } from "@/lib/site";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

/**
 * Site mark. The canonical brand files live in /LOGO FILES and must not be
 * deleted — that folder is the source for clones and future exports. The
 * served file is public/images/metab-logo-final.svg.
 */
export function Logo({ className = "", priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="Metablify home"
    >
      <img
        src={siteConfig.logo.src}
        alt=""
        width={siteConfig.logo.width}
        height={siteConfig.logo.height}
        className="brand-logo no-round"
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </Link>
  );
}
