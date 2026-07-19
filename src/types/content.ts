/**
 * Content contract for the Metablify back pages.
 *
 * Every page family shares one base shape so the SEO layer, sitemap, related
 * engine, and audit script can treat them uniformly. Family specific fields
 * extend the base. Zod schemas in lib/content/schema.ts validate these at build
 * so a malformed or thin entry fails the build instead of shipping.
 */

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

/** Three tier CTA ladder. Placement is driven by page intent. */
export type CtaTier = "benchmark" | "assessment" | "discuss";

export type Cta = {
  tier: CtaTier;
  /** Optional override label. Defaults come from the tier. */
  label?: string;
  /** Optional override destination. Defaults come from the tier. */
  href?: string;
  /** One concrete proof element that sits beside the ask. */
  proof?: string;
};

/** A unit of non templated value. Min 3 per page, enforced by schema. */
export type ValueBlock = {
  heading: string;
  body: string;
};

export type Source = {
  label: string;
  href?: string;
  /** Optional note on what the source supports. */
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

/** Fields shared by every page family. */
export type BaseContent = {
  family: PageFamily;
  slug: string;
  status: ContentStatus;
  intent: PageIntent;

  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Short lead paragraph under the h1. */
  lead: string;

  /** Min 3, enforced. The proof that a page is not swap a variable content. */
  uniqueValueBlocks: ValueBlock[];
  /** Min 2, enforced. */
  sources: Source[];
  /** Min 3, enforced. Slugs of related pages for the internal link engine. */
  relatedSlugs: string[];
  /** Tags power the related engine and cluster grouping. */
  tags: string[];

  primaryCta: Cta;

  lastReviewed: string; // ISO date
  author: string;
};

export type SolutionPage = BaseContent & {
  family: "solution";
  /** The problem in technical terms. */
  problem: string;
  /** Why conventional workflows produce it. */
  cause: string;
  /** How Metablify addresses it. */
  mechanism: string;
  /** What changes in the output. */
  outcome: string;
  /** Honest limits section. Required for trust. */
  limits: string;
  faqs: Faq[];
};

export type ComparisonPage = BaseContent & {
  family: "compare";
  competitor: string;
  /** Fair, sourced summary of the other tool. */
  overview: string;
  /** Named real strengths of the other tool. */
  otherStrengths: string[];
  comparison: ComparisonRow[];
  /** When the other tool is the right choice. Required for trust. */
  whenOther: string;
  /** Where Metablify complements rather than replaces. */
  complement: string;
  faqs: Faq[];
};

export type InstrumentPage = BaseContent & {
  family: "instrument";
  vendor: string;
  /** true only when the client has confirmed production support. */
  productionSupported: boolean;
  fileFormats: SpecRow[];
  dataCharacteristics: string;
  /** Where feature recovery typically suffers on this platform. */
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
  /** Substantive definition, min length enforced. */
  definition: string;
  /** A worked example or practical implication. Required. */
  example: string;
};

export type ApplicationPage = BaseContent & {
  family: "application";
  field: string;
  problem: string;
  approach: string;
  /** Who buys, in their vocabulary. */
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

/** Route segment for each family. */
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
