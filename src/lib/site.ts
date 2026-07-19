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
  { href: "/solutions", label: "Solutions" },
  { href: "/applications", label: "Applications" },
  { href: "/compare", label: "Compare" },
  { href: "/learn", label: "Learn" },
  { href: "/work-with-us", label: "Work With Us" },
  { href: "/about", label: "About" },
] as const;

export const footerGroups = [
  {
    title: "Platform",
    links: [
      { href: "/platform", label: "The Metablify Platform" },
      { href: "/data-assessment", label: "Send us a dataset" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/solutions/peak-splitting", label: "Peak splitting" },
      { href: "/solutions/retention-time-drift", label: "Retention time drift" },
      { href: "/solutions/batch-effect-alignment", label: "Batch effects" },
      { href: "/solutions/large-cohort-processing", label: "Large cohorts" },
    ],
  },
  {
    title: "Applications",
    links: [
      { href: "/applications/metabolomics", label: "Metabolomics" },
      { href: "/applications/proteomics", label: "Proteomics" },
      { href: "/applications/pfas-environmental", label: "PFAS and environmental" },
      { href: "/applications/lipidomics", label: "Lipidomics" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/learn/glossary", label: "Glossary" },
      { href: "/compare", label: "Tool comparisons" },
      { href: "/instruments", label: "Instruments" },
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
