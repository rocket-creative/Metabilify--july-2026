import type { Metadata } from "next";
import type { ContentPage } from "@/types/content";
import { pageHref } from "@/types/content";
import { siteConfig } from "@/lib/site";
import { isIndexable } from "@/content/registry";

/**
 * Single source of metadata for content pages. Canonical always points at the
 * production domain, never the vercel.app preview, to avoid duplicate content.
 * Staged and draft pages carry noindex so only approved live pages are indexed.
 */
export function buildMetadata(page: ContentPage): Metadata {
  const path = pageHref(page);
  const canonical = `${siteConfig.url}${path}`;
  const indexable = isIndexable(page);

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: siteConfig.name,
      title: page.metaTitle,
      description: page.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

/** Metadata for hub and static content pages. */
export function buildBasicMetadata(opts: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const canonical = `${siteConfig.url}${opts.path}`;
  const index = opts.index ?? true;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: siteConfig.name,
      title: opts.title,
      description: opts.description,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}
