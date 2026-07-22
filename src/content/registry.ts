import type {
  ContentPage,
  ContentStatus,
  PageFamily,
} from "@/types/content";
import { validateContent } from "@/lib/content/schema";
import { solutions } from "./solutions";
import { comparisons } from "./compare";
import { glossary } from "./glossary";
import { applicationPages } from "./applications";
import { instruments } from "./instruments";

const all: ContentPage[] = validateContent([
  ...solutions,
  ...comparisons,
  ...glossary,
  ...applicationPages,
  ...instruments,
]);

export const contentRegistry = all;

export function allContent(): ContentPage[] {
  return all;
}

export function byFamily(family: PageFamily): ContentPage[] {
  return all.filter((p) => p.family === family);
}

export function byStatus(status: ContentStatus): ContentPage[] {
  return all.filter((p) => p.status === status);
}

export function liveContent(): ContentPage[] {
  return all.filter((p) => p.status === "live");
}

export function isIndexable(page: Pick<ContentPage, "status">): boolean {
  return page.status === "live";
}

export function getBySlug(
  family: PageFamily,
  slug: string,
): ContentPage | undefined {
  return all.find((p) => p.family === family && p.slug === slug);
}

export function getAnyBySlug(slug: string): ContentPage | undefined {
  return all.find((p) => p.slug === slug);
}

export function slugsForFamily(family: PageFamily): { slug: string }[] {
  return byFamily(family).map((p) => ({ slug: p.slug }));
}
