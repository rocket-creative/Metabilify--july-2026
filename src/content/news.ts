/**
 * Single source of truth for company news. Both the announcement ribbon and
 * /news read from here so a headline cannot be updated in one place and go
 * stale in the other.
 *
 * Dates: the Danforth Center launch piece and AgFunderNews carry a dateline
 * in the article; the two St. Louis Inno dates are taken from their URLs. The
 * Big Ideas article has no dateline, so it carries the year of the event.
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
  /** Who published it, shown beside the date. */
  source: string;
};

export const newsItems: NewsItem[] = [
  {
    slug: "inno-startup-to-watch-2025",
    year: "2025",
    date: "January 30, 2025",
    title: "Named a St. Louis INNO Startup to Watch",
    body: "Metablify was named a St. Louis INNO Startup to Watch as the company began working with potential partners on external validation projects, moving from proving the technology internally to demonstrating what the platform could do with collaborators and real-world applications.",
    href: "https://www.bizjournals.com/stlouis/inno/stories/awards/2025/01/30/startups-to-watch-2025-metablify.html",
    image: "St. Louis Inno Startups to Watch 2025 — article image or Metablify team photo",
    source: "St. Louis Inno",
  },
  {
    slug: "arch-grants-2024",
    year: "2024",
    date: "November 21, 2024",
    title: "Selected as an Arch Grants company",
    body: "Metablify was selected as a 2024 Arch Grants company and received the standard $75,000 award in equity-free, non-dilutive funding, along with access to the St. Louis entrepreneurial ecosystem as it began validating the technology outside the Danforth Center.",
    href: "https://www.bizjournals.com/stlouis/inno/stories/fundings/2024/11/21/arch-grants-20-companies-2024-group.html",
    image: "Arch Grants 2024 cohort announcement — event or award photo",
    source: "St. Louis Inno",
  },
  {
    slug: "dtc-launches-metablify-2024",
    year: "2024",
    date: "October 28, 2024",
    title: "Danforth Technology Company launches Metablify",
    body: "The Danforth Technology Company announced the launch of Metablify, a startup built on LC/MS data-processing technology developed in the Baxter lab at the Donald Danforth Plant Science Center.",
    href: "https://www.danforthcenter.org/news/danforth-technology-company-launches-new-startup/",
    image: "Danforth Technology Company launch announcement — Danforth Center exterior or the founding team",
    source: "Donald Danforth Plant Science Center",
  },
  {
    slug: "agfundernews-launch-2024",
    year: "2024",
    date: "October 28, 2024",
    title: "AgFunderNews covers the Metablify launch",
    body: "AgFunderNews reported on the Danforth Technology Company's launch of Metablify, a startup using LC/MS data-processing algorithms to help researchers find real signal in large biological datasets.",
    href: "https://agfundernews.com/danforth-technology-center-launches-startup-to-open-new-research-pathways-through-metabolite-analysis",
    image: "AgFunderNews launch coverage — Danforth Center campus photo",
    source: "AgFunderNews",
  },
  {
    slug: "big-ideas-3-2023",
    year: "2023",
    date: null,
    title: "Team Metablify wins Big Ideas 3.0",
    body: "Team Metablify from the Baxter lab won the Donald Danforth Plant Science Center's Big Ideas 3.0 competition, taking the audience vote and a $10,000 grant to advance the idea in front of more than 600 people on August 31, 2023.",
    href: "https://www.danforthcenter.org/news/big-ideas-3-0/",
    image: "Big Ideas 3.0 — Team Metablify on stage at the Danforth Center",
    source: "Donald Danforth Plant Science Center",
  },
];
