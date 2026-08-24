/**
 * Single source of truth for company news. Both the announcement ribbon and
 * /news read from here so a headline cannot be updated in one place and go
 * stale in the other.
 *
 * Copy is taken from the fact-checked About draft (v0.2). The source records
 * years rather than publication dates, so items carry a year only — do not
 * invent a month or day to make this look more like a feed.
 *
 * Order is newest first. The ribbon rotates through these in this order.
 */
export type NewsItem = {
  slug: string;
  year: string;
  /** Short enough to sit on one line in the ribbon. */
  title: string;
  body: string;
};

export const newsItems: NewsItem[] = [
  {
    slug: "inno-startup-to-watch-2025",
    year: "2025",
    title: "Named a St. Louis INNO Startup to Watch",
    body: "Metablify was named a St. Louis INNO Startup to Watch as the company began working with potential partners on external validation projects, moving from proving the technology internally to demonstrating what the platform could do with collaborators and real-world applications.",
  },
  {
    slug: "arch-grants-2024",
    year: "2024",
    title: "Selected as an Arch Grants company",
    body: "Metablify was selected as a 2024 Arch Grants company and received the standard $75,000 award in equity-free, non-dilutive funding, along with access to the St. Louis entrepreneurial ecosystem as it began validating the technology outside the Danforth Center.",
  },
];
