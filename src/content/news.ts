/**
 * Single source of truth for company news. Both the announcement ribbon and
 * /news read from here so a headline cannot be updated in one place and go
 * stale in the other.
 *
 * Copy is taken from the fact-checked About draft (v0.2). The source records
 * years rather than publication dates, so items carry a year only — do not
 * invent a month or day to make this look more like a feed. `date` and `href`
 * are filled in when the client supplies the article and its date.
 *
 * Order is newest first. The ribbon rotates through these in this order.
 */
export type NewsItem = {
  slug: string;
  year: string;
  /** Full publication date for the card, e.g. "June 4, 2026". Null until known. */
  date: string | null;
  /** Short enough to sit on one line in the ribbon. */
  title: string;
  body: string;
  /** External article. Null until the client supplies the link. */
  href: string | null;
  /** Art brief for the card thumbnail. */
  image: string;
};

export const newsItems: NewsItem[] = [
  {
    slug: "inno-startup-to-watch-2025",
    year: "2025",
    date: null,
    title: "Named a St. Louis INNO Startup to Watch",
    body: "Metablify was named a St. Louis INNO Startup to Watch as the company began working with potential partners on external validation projects, moving from proving the technology internally to demonstrating what the platform could do with collaborators and real-world applications.",
    href: null,
    image: "St. Louis INNO Startup to Watch — article image or Metablify team photo",
  },
  {
    slug: "arch-grants-2024",
    year: "2024",
    date: null,
    title: "Selected as an Arch Grants company",
    body: "Metablify was selected as a 2024 Arch Grants company and received the standard $75,000 award in equity-free, non-dilutive funding, along with access to the St. Louis entrepreneurial ecosystem as it began validating the technology outside the Danforth Center.",
    href: null,
    image: "Arch Grants 2024 cohort announcement — event or award photo",
  },
];
