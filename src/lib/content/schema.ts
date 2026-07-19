import { z } from "zod";
import type { ContentPage } from "@/types/content";

/**
 * Build time validation. A malformed or thin entry throws here, which fails the
 * build rather than shipping a low quality page. This is the first line of the
 * quality gate; the Agent 9 audit is the second.
 */

const ctaSchema = z.object({
  tier: z.enum(["benchmark", "assessment", "discuss"]),
  label: z.string().optional(),
  href: z.string().optional(),
  proof: z.string().optional(),
});

const valueBlock = z.object({
  heading: z.string().min(3),
  body: z.string().min(80, "Value blocks must be substantive"),
});

const source = z.object({
  label: z.string().min(2),
  href: z.string().url().optional(),
  note: z.string().optional(),
});

const faq = z.object({
  question: z.string().min(8),
  answer: z.string().min(40),
});

const comparisonRow = z.object({
  criterion: z.string().min(2),
  metablify: z.string().min(2),
  other: z.string().min(2),
});

const specRow = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const base = {
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab case"),
  status: z.enum(["draft", "staged", "live"]),
  intent: z.enum(["informational", "commercial"]),
  title: z.string().min(6),
  metaTitle: z.string().min(6).max(70, "metaTitle should be under 70 chars"),
  metaDescription: z
    .string()
    .min(80)
    .max(200, "metaDescription should be under 200 chars"),
  h1: z.string().min(6),
  lead: z.string().min(60),
  uniqueValueBlocks: z.array(valueBlock).min(3, "Min 3 unique value blocks"),
  sources: z.array(source).min(2, "Min 2 sources"),
  relatedSlugs: z.array(z.string()).min(3, "Min 3 related pages"),
  tags: z.array(z.string()).min(1),
  primaryCta: ctaSchema,
  lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use ISO date"),
  author: z.string().min(2),
};

export const solutionSchema = z.object({
  ...base,
  family: z.literal("solution"),
  problem: z.string().min(120),
  cause: z.string().min(120),
  mechanism: z.string().min(120),
  outcome: z.string().min(80),
  limits: z.string().min(80, "Limits section is required for trust"),
  faqs: z.array(faq).min(2),
});

export const comparisonSchema = z.object({
  ...base,
  family: z.literal("compare"),
  competitor: z.string().min(2),
  overview: z.string().min(120),
  otherStrengths: z.array(z.string().min(20)).min(2),
  comparison: z.array(comparisonRow).min(3),
  whenOther: z.string().min(80, "When the other tool wins is required"),
  complement: z.string().min(80),
  faqs: z.array(faq).min(2),
});

export const instrumentSchema = z.object({
  ...base,
  family: z.literal("instrument"),
  vendor: z.string().min(2),
  productionSupported: z.boolean(),
  fileFormats: z.array(specRow).min(1),
  dataCharacteristics: z.string().min(120),
  recoveryNotes: z.string().min(120),
  ingestion: z.string().min(80),
  faqs: z.array(faq).min(2),
});

export const analyteClassSchema = z.object({
  ...base,
  family: z.literal("analyte-class"),
  analyteClass: z.string().min(2),
  characteristics: z.string().min(120),
  challenges: z.string().min(120),
  approach: z.string().min(120),
  faqs: z.array(faq).min(2),
});

export const glossarySchema = z.object({
  ...base,
  family: z.literal("glossary"),
  term: z.string().min(1),
  definition: z.string().min(200, "Glossary entries must be substantive"),
  example: z.string().min(80, "A worked example is required"),
});

export const applicationSchema = z.object({
  ...base,
  family: z.literal("application"),
  field: z.string().min(2),
  problem: z.string().min(120),
  approach: z.string().min(120),
  audience: z.string().min(60),
  faqs: z.array(faq).min(2),
});

export const resourceSchema = z.object({
  ...base,
  family: z.literal("resource"),
  body: z.string().min(200),
  faqs: z.array(faq).optional(),
});

export const contentSchema = z.discriminatedUnion("family", [
  solutionSchema,
  comparisonSchema,
  instrumentSchema,
  analyteClassSchema,
  glossarySchema,
  applicationSchema,
  resourceSchema,
]);

export function validateContent(entries: ContentPage[]): ContentPage[] {
  const seen = new Set<string>();
  for (const entry of entries) {
    const result = contentSchema.safeParse(entry);
    if (!result.success) {
      const issue = result.error.issues[0];
      throw new Error(
        `Content validation failed for "${entry.slug}" (${entry.family}): ` +
          `${issue?.path.join(".")} ${issue?.message}`,
      );
    }
    const key = `${entry.family}/${entry.slug}`;
    if (seen.has(key)) {
      throw new Error(`Duplicate content slug: ${key}`);
    }
    seen.add(key);
  }
  return entries;
}
