/**
 * Slim announcement ribbon, mounted above the site header on every page.
 *
 * This was a full-height forest band with GSAP-animated waves and display-scale
 * type — a billboard. It now carries a single news item at metadata scale and
 * is completely still: a permanent animation directly above a sticky header
 * competes with the navigation it sits on top of. Nothing here needs the
 * client, so it ships no JavaScript.
 */
import Link from "next/link";

const NEWS = {
  href: "/news",
  flag: "News",
  headline: "Named a 2025 St. Louis INNO Startup to Watch",
  aside: "2024 Arch Grants recipient",
  cta: "Read the news",
};

export function AnnouncementRibbon() {
  return (
    <aside className="ribbon" aria-label="Announcement">
      <Link href={NEWS.href} className="ribbon-link">
        <span className="ribbon-flag">{NEWS.flag}</span>
        <span className="ribbon-headline">{NEWS.headline}</span>
        <span className="ribbon-sep" aria-hidden="true" />
        <span className="ribbon-aside">{NEWS.aside}</span>
        <span className="ribbon-cta">
          <span className="ribbon-cta-label">{NEWS.cta}</span>
          <span className="ribbon-arrow" aria-hidden="true">
            →
          </span>
        </span>
      </Link>
    </aside>
  );
}

export default AnnouncementRibbon;
