export const siteConfig = {
  name: "Metablify",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://metablify.com",
  description:
    "Metablify is an LC/MS platform built on the first principles of physics. See more in your LC/MS data.",
  email: "hello@metablify.com",
  notifyEmail: process.env.NOTIFY_EMAIL ?? "hello@metablify.com",
  origin: "Donald Danforth Plant Science Center",
} as const;

// No "Home" entry: the logo is the home link, which is where people look for it.
export const navLinks = [
  { href: "/platform", label: "Platform" },
  { href: "/applications", label: "Applications" },
  { href: "/work-with-us", label: "Work With Us" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
] as const;

export const footerGroups = [
  {
    title: "Platform",
    links: [{ href: "/platform", label: "The Metablify Platform" }],
  },
  {
    title: "Applications",
    links: [
      { href: "/applications/metabolomics", label: "Metabolomics" },
      { href: "/applications/proteomics", label: "Proteomics" },
    ],
  },
  {
    title: "Work With Us",
    links: [
      { href: "/work-with-us/services", label: "Analytical Services" },
      { href: "/work-with-us/platform-development", label: "Platform Development" },
      { href: "/work-with-us/collaborations", label: "Collaborations" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/news", label: "News" },
      { href: "/discuss", label: "Discuss a Project" },
    ],
  },
] as const;

/**
 * Roles and expertise lines are taken verbatim from the fact-checked About copy
 * draft (v0.2). `credentials` is only present where we have a vetted academic
 * record; leave it off rather than inferring one.
 */
export type Person = {
  slug: string;
  name: string;
  role: string;
  expertise: string;
  credentials?: string;
};

export const founders: Person[] = [
  {
    slug: "michael-bielski",
    name: "Michael Bielski",
    role: "Co-Founder, President & CEO",
    expertise:
      "Entrepreneurship, company formation, commercialization and business development",
  },
  {
    slug: "ivan-baxter",
    name: "Ivan Baxter, PhD",
    role: "Co-Founder & Chief Science Officer",
    expertise:
      "Scientific leadership, large-scale biology, LC/MS and metabolomics",
    credentials:
      "PhD, Scripps Research Institute · USDA-ARS · Danforth Center PI",
  },
  {
    slug: "allen-hubbard",
    name: "Allen Hubbard, PhD",
    role: "Co-Founder & Chief Technology Officer",
    expertise:
      "Computational science, bioinformatics and platform development",
    credentials:
      "PhD, University of Delaware · Bioinformatics and Systems Biology",
  },
  {
    slug: "louis-connelly",
    name: "Louis Connelly",
    role: "Co-Founder & Lead Programmer",
    expertise:
      "Scientific computing, programming and technology development",
    credentials:
      "MS, Saint Louis University · Bioinformatics and Computational Biology",
  },
];

const bySlug = (slug: string) => {
  const person = founders.find((f) => f.slug === slug);
  if (!person) throw new Error(`Unknown founder slug: ${slug}`);
  return person;
};

// Hubbard sits in both groups, per the copy draft.
export const managementTeam = [
  bySlug("michael-bielski"),
  bySlug("allen-hubbard"),
];

export const scientificFounders = [
  bySlug("ivan-baxter"),
  bySlug("allen-hubbard"),
  bySlug("louis-connelly"),
];

/**
 * Investors and supporters named in the About copy draft. QRM Capital has no
 * confirmed URL yet, so it renders as an unlinked tile.
 */
export const supporters = [
  {
    name: "Donald Danforth Plant Science Center",
    href: "https://www.danforthcenter.org/",
  },
  {
    name: "Danforth Technology Company",
    href: "https://danforthtechnology.com/",
  },
  { name: "QRM Capital", href: null },
  { name: "Arch Grants", href: "https://archgrants.org/" },
] as const;
