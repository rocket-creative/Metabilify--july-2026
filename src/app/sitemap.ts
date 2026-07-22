import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { liveContent } from "@/content/registry";
import { familyRoute, pageHref } from "@/types/content";
import type { PageFamily } from "@/types/content";

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
