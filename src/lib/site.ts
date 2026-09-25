export const siteConfig = {
  name: "Metablify",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://metablify.com",
  description:
    "Metablify is an LC/MS platform built on the first principles of physics. See more in your LC/MS data.",
  email: "hello@metablify.com",
  notifyEmail: process.env.NOTIFY_EMAIL ?? "hello@metablify.com",
  origin: "Donald Danforth Plant Science Center",
  // Served copy of LOGO FILES/metab-logo-final.svg. Intrinsic size from the SVG viewBox.
  logo: {
    src: "/images/metab-logo-final.svg",
    width: 1605,
    height: 329,
  },
} as const;

// No "Home" entry: the logo is the home link, which is where people look for it.
// Team is its own page, per the 9/1 review: board members, investors, and
// partners look for it first, and it was buried at the bottom of About.
export const navLinks = [
  { href: "/technology", label: "Technology" },
  { href: "/applications", label: "Applications" },
  { href: "/work-with-us", label: "Work With Us" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/news", label: "News" },
] as const;

export const footerGroups = [
  {
    title: "Technology",
    links: [{ href: "/technology", label: "The Metablify Technology" }],
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
      { href: "/team", label: "Team" },
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
  /** Headshot under /public/images/team. Omit until one is supplied. */
  photo?: string;
  /** Full profile copy. Omit while it is still a placeholder. */
  bio?: readonly string[];
};

export const founders: Person[] = [
  {
    slug: "michael-bielski",
    name: "Michael Bielski",
    role: "Co-Founder, President & CEO",
    photo: "/images/team/michael-bielski.jpg",
    expertise:
      "Entrepreneurship, company formation, commercialization and business development",
    credentials:
      "B.S. Biology, Stony Brook University · M.S. Neuroscience, Syracuse University · J.D., Syracuse University College of Law",
    bio: [
      "Michael R. Bielski, J.D., M.S., is Co-Founder, President and Chief Executive Officer of Metablify, where he leads the company's strategy, financing, business development, and commercialization activities. He is an entrepreneur and commercialization executive with more than 20 years of experience translating early-stage technologies into products, licenses, and venture-backed companies across research tools, life sciences, agricultural biotechnology, and medical devices. He is an expert in forming and commercializing spinout companies from research institutions and has worked with Cold Spring Harbor Laboratory, Stony Brook University, and the Donald Danforth Plant Science Center.",
      "Michael was part of the early founding team of NewLeaf Symbiotics, an agricultural biotechnology company developing and commercializing microbial products for crop agriculture. As General Counsel and Vice President of Intellectual Property, he led intellectual property strategy and licensing activities and was a member of the executive team that secured the company's initial venture financing.",
      "Michael is also the founder and president of DevTech Partners and has co-founded several other technology ventures, including Capseus and Hairpin Technologies. Across his ventures, Michael has led commercialization strategy, intellectual property development, fundraising, licensing, strategic partnerships, product development, manufacturing, and commercial launch. He earned a B.S. in Biology from Stony Brook University, an M.S. in Neuroscience from Syracuse University, and a J.D. from Syracuse University College of Law.",
    ],
  },
  {
    slug: "ivan-baxter",
    name: "Ivan Baxter, PhD",
    role: "Co-Founder & Chief Science Officer",
    photo: "/images/team/ivan-baxter.png",
    expertise:
      "Scientific leadership, large-scale biology, LC/MS and metabolomics",
    credentials:
      "PhD, Scripps Research Institute · USDA-ARS · Danforth Center PI",
  },
  {
    slug: "allen-hubbard",
    name: "Allen Hubbard, PhD",
    role: "Co-Founder & Chief Technology Officer",
    photo: "/images/team/allen-hubbard.png",
    expertise:
      "Computational science, bioinformatics and platform development",
    credentials:
      "PhD, University of Delaware · Bioinformatics and Systems Biology",
  },
  {
    slug: "louis-connelly",
    name: "Louis Connelly",
    role: "Co-Founder & Lead Programmer",
    photo: "/images/team/louis-connelly.png",
    expertise:
      "Scientific computing, programming and technology development",
    credentials:
      "Bachelor's, Washington University in Saint Louis · Computational Biology and Genomics · Master's, Saint Louis University · Bioinformatics",
    bio: [
      "Before co-founding Metablify, Louis was a Data Scientist in the Baxter Lab at the Danforth Plant Science Center. He has a bachelor's degree in computational biology and genomics from Washington University in Saint Louis, and a master's degree in bioinformatics from Saint Louis University. He is interested in using the power of modern computing to discover novel insights in exceptionally large datasets. In his free time, he enjoys walking his dog, reading fiction, and playing cooperative board and video games with his friends.",
    ],
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

const tomLaurita: Person = {
  slug: "tom-laurita",
  name: "Tom Laurita",
  role: "CEO, Danforth Technology Company",
  photo: "/images/team/tom-laurita.jpg",
  expertise:
    "Bringing early technologies through development to market and to exit",
  credentials:
    "Brown University, magna cum laude · MPPM, Yale School of Management · PhD, Russian Peoples' Friendship University",
  bio: [
    "Tom Laurita is CEO of the Danforth Technology Company. He is an entrepreneur with over 30 years experience bringing early technologies through development to market and to exit.",
    "Tom was CEO of DTC startup Peptyde Bio, which was acquired by Invaio in 2023. He also co-founded and was CEO of STL-based NewLeaf Symbiotics, one of the most successful US Ag Biotech companies. Tom led Monsanto's USSR business and co-founded Vitas Corporation.",
    "Tom holds degrees from Brown University (magna cum laude), Yale School of Management (MPPM), and the Russian Peoples' Friendship University (PhD).",
  ],
};

/**
 * The /team page. Order is Michael Bielski, then the scientific founders,
 * then Danforth Technology Company leadership.
 */
export const teamPage = [
  bySlug("michael-bielski"),
  bySlug("ivan-baxter"),
  bySlug("allen-hubbard"),
  bySlug("louis-connelly"),
  tomLaurita,
];

/** Building the advisory board is on the to-do list; nothing to show yet. */
export const advisors: Person[] = [];

/**
 * Investors and supporters named in the About copy draft. QRM Capital has no
 * confirmed URL yet, so it renders as an unlinked tile. Also the Partners
 * section on /team.
 */
export type Supporter = {
  name: string;
  href: string | null;
  /** Grey logo under /public/images/partners, with its intrinsic size. */
  logo?: { src: string; width: number; height: number };
};

export const supporters: Supporter[] = [
  {
    name: "Donald Danforth Plant Science Center",
    href: "https://www.danforthcenter.org/",
    logo: { src: "/images/partners/danforth-center.png", width: 700, height: 89 },
  },
  {
    name: "Danforth Technology Company",
    href: "https://danforthtechnology.com/",
    logo: {
      src: "/images/partners/danforth-technology-company.png",
      width: 500,
      height: 156,
    },
  },
  { name: "Arch Grants", href: "https://archgrants.org/" },
  {
    name: "QRM Capital",
    href: null,
    logo: { src: "/images/partners/qrm-capital.png", width: 500, height: 192 },
  },
];
