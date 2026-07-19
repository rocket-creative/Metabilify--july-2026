import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { liveContent } from "@/content/registry";
import { familyRoute, pageHref } from "@/types/content";
import type { PageFamily } from "@/types/content";

/**
 * The sitemap only lists live content, so pages self register when their status
 * is promoted from staged to live. This is the release valve that keeps a new
 * domain from publishing hundreds of pages at once.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/platform",
    "/applications",
    "/applications/metabolomics",
    "/applications/proteomics",
    "/work-with-us",
    "/work-with-us/services",
    "/work-with-us/platform-development",
    "/work-with-us/collaborations",
    "/about",
    "/news",
    "/discuss",
    "/data-assessment",
  ];

  const live = liveContent();

  // Only surface a hub when it has at least one live child.
  const familiesWithLive = new Set<PageFamily>(live.map((p) => p.family));
  const hubRoutes = Array.from(familiesWithLive).map((f) => familyRoute[f]);

  const contentRoutes = live.map((p) => pageHref(p));

  const all = [...staticRoutes, ...hubRoutes, ...contentRoutes];

  return all.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
