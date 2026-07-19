import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Only the production domain should be indexable. Preview deployments (such as
 * the vercel.app URL) are disallowed so they do not compete with metablify.com
 * for the same content.
 */
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
