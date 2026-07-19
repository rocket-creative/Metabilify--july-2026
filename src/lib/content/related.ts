import type { ContentPage } from "@/types/content";
import { allContent, getAnyBySlug } from "@/content/registry";

/**
 * Internal link engine. Given a page, return related pages so loose pages form
 * a topical cluster. Author declared relatedSlugs come first, then pages that
 * share the most tags. No page should surface fewer than three links; the audit
 * enforces that authors provide at least three resolvable relatedSlugs.
 */
export function relatedPages(page: ContentPage, limit = 4): ContentPage[] {
  const results: ContentPage[] = [];
  const seen = new Set<string>([`${page.family}/${page.slug}`]);

  // 1. Explicit author declared links, in order.
  for (const slug of page.relatedSlugs) {
    const found = getAnyBySlug(slug);
    if (found && !seen.has(`${found.family}/${found.slug}`)) {
      results.push(found);
      seen.add(`${found.family}/${found.slug}`);
    }
    if (results.length >= limit) return results;
  }

  // 2. Fill remaining slots by shared tag count.
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

/** Resolve relatedSlugs to pages, dropping any that do not exist. */
export function resolveRelatedSlugs(page: ContentPage): ContentPage[] {
  return page.relatedSlugs
    .map((slug) => getAnyBySlug(slug))
    .filter((p): p is ContentPage => Boolean(p));
}
