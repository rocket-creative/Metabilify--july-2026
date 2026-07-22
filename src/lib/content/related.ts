import type { ContentPage } from "@/types/content";
import { allContent, getAnyBySlug } from "@/content/registry";

export function relatedPages(page: ContentPage, limit = 4): ContentPage[] {
  const results: ContentPage[] = [];
  const seen = new Set<string>([`${page.family}/${page.slug}`]);

  for (const slug of page.relatedSlugs) {
    const found = getAnyBySlug(slug);
    if (found && !seen.has(`${found.family}/${found.slug}`)) {
      results.push(found);
      seen.add(`${found.family}/${found.slug}`);
    }
    if (results.length >= limit) return results;
  }

  const tagSet = new Set(page.tags);
  const scored = allContent()
    .filter((p) => !seen.has(`${p.family}/${p.slug}`))
    .map((p) => ({
      page: p,
      score: p.tags.filter((t) => tagSet.has(t)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  for (const entry of scored) {
    results.push(entry.page);
    seen.add(`${entry.page.family}/${entry.page.slug}`);
    if (results.length >= limit) break;
  }

  return results;
}

export function resolveRelatedSlugs(page: ContentPage): ContentPage[] {
  return page.relatedSlugs
    .map((slug) => getAnyBySlug(slug))
    .filter((p): p is ContentPage => Boolean(p));
}
