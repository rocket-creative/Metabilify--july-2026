export const siteConfig = {
  name: "Metablify",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://metablify.com",
  description:
    "Metablify is an LC/MS platform built on the first principles of physics. See more in your LC/MS data.",
  email: "hello@metablify.com",
  notifyEmail: process.env.NOTIFY_EMAIL ?? "hello@metablify.com",
  origin: "Donald Danforth Plant Science Center",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
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

export const team = [
  {
    name: "Ivan Baxter",
    role: "Chief Scientific Officer",
    credentials: "PhD, Scripps Research Institute · USDA-ARS · Danforth Center PI",
  },
  {
    name: "Allen Hubbard",
    role: "Chief Technology Officer",
    credentials: "PhD, University of Delaware · Bioinformatics and Systems Biology",
  },
  {
    name: "Louis Connelly",
    role: "Data Scientist",
    credentials:
      "MS, Saint Louis University · Bioinformatics and Computational Biology",
  },
] as const;
