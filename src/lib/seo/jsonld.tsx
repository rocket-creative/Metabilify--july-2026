import type { ContentPage, Faq } from "@/types/content";
import { pageHref } from "@/types/content";
import { siteConfig } from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function articleSchema(page: ContentPage) {
  const url = `${siteConfig.url}${pageHref(page)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.metaDescription,
    url,
    mainEntityOfPage: url,
    datePublished: page.lastReviewed,
    dateModified: page.lastReviewed,
    author: { "@type": "Organization", name: page.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

export function definedTermSchema(page: Extract<ContentPage, { family: "glossary" }>) {
  const url = `${siteConfig.url}${pageHref(page)}`;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: page.term,
    description: page.definition,
    url,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Metablify LC/MS glossary",
      url: `${siteConfig.url}/learn/glossary`,
    },
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "Scientific software",
    operatingSystem: "Cloud",
    description: siteConfig.description,
    url: siteConfig.url,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    logo: `${siteConfig.url}/images/logo-mark.svg`,
  };
}
