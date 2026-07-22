import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const isProduction =
    process.env.VERCEL_ENV === "production" ||
    (!process.env.VERCEL_ENV &&
      siteConfig.url.includes("metablify.com"));

  if (!isProduction) {
    return {
      rules: { userAgent: "*", disallow: "/" },
      sitemap: `${siteConfig.url}/sitemap.xml`,
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
