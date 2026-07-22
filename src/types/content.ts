export type ContentStatus = "draft" | "staged" | "live";

export type PageIntent = "informational" | "commercial";

export type PageFamily =
  | "solution"
  | "compare"
  | "instrument"
  | "analyte-class"
  | "glossary"
  | "application"
  | "resource";

export type CtaTier = "benchmark" | "assessment" | "discuss";

export type Cta = {
  tier: CtaTier;
  label?: string;
  href?: string;
  proof?: string;
};

export type ValueBlock = {
  heading: string;
  body: string;
};

export type Source = {
  label: string;
  href?: string;
  note?: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type ComparisonRow = {
  criterion: string;
  metablify: string;
  other: string;
};

export type SpecRow = {
  label: string;
  value: string;
};

export type BaseContent = {
  family: PageFamily;
  slug: string;
  status: ContentStatus;
  intent: PageIntent;

  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;

  uniqueValueBlocks: ValueBlock[];
  sources: Source[];
  relatedSlugs: string[];
  tags: string[];

  primaryCta: Cta;

  lastReviewed: string;
  author: string;
};

export type SolutionPage = BaseContent & {
  family: "solution";
  problem: string;
  cause: string;
  mechanism: string;
  outcome: string;
  limits: string;
  faqs: Faq[];
};

export type ComparisonPage = BaseContent & {
  family: "compare";
  competitor: string;
  overview: string;
  otherStrengths: string[];
  comparison: ComparisonRow[];
  whenOther: string;
  complement: string;
  faqs: Faq[];
};

export type InstrumentPage = BaseContent & {
  family: "instrument";
  vendor: string;
  productionSupported: boolean;
  fileFormats: SpecRow[];
  dataCharacteristics: string;
  recoveryNotes: string;
  ingestion: string;
  faqs: Faq[];
};

export type AnalyteClassPage = BaseContent & {
  family: "analyte-class";
  analyteClass: string;
  characteristics: string;
  challenges: string;
  approach: string;
  faqs: Faq[];
};

export type GlossaryTerm = BaseContent & {
  family: "glossary";
  term: string;
  definition: string;
  example: string;
};

export type ApplicationPage = BaseContent & {
  family: "application";
  field: string;
  problem: string;
  approach: string;
  audience: string;
  faqs: Faq[];
};

export type ResourcePage = BaseContent & {
  family: "resource";
  body: string;
  faqs?: Faq[];
};

export type ContentPage =
  | SolutionPage
  | ComparisonPage
  | InstrumentPage
  | AnalyteClassPage
  | GlossaryTerm
  | ApplicationPage
  | ResourcePage;

export const familyRoute: Record<PageFamily, string> = {
  solution: "/solutions",
  compare: "/compare",
  instrument: "/instruments",
  "analyte-class": "/analytes",
  glossary: "/learn/glossary",
  application: "/applications",
  resource: "/resources",
};

export function pageHref(page: Pick<ContentPage, "family" | "slug">): string {
  return `${familyRoute[page.family]}/${page.slug}`;
}
