import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
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
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
