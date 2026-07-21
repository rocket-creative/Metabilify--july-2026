import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBlock } from "@/components/blocks";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { buildBasicMetadata } from "@/lib/seo/metadata";
import { byFamily } from "@/content/registry";

export const metadata: Metadata = buildBasicMetadata({
  title: "Learn | LC/MS and Omics | Metablify",
  description:
    "A learning hub for LC/MS and omics: a working glossary of terms and method notes on feature detection, alignment, and processing large studies.",
  path: "/learn",
});

export default function LearnHub() {
  const glossaryCount = byFamily("glossary").filter(
    (p) => p.status !== "draft",
  ).length;

  const cards = [
    {
      href: "/learn/glossary",
      title: "Glossary",
      body: `Working definitions of LC/MS and omics terms, with a practical example for each. ${glossaryCount} terms and growing.`,
    },
    {
      href: "/solutions",
      title: "Solutions",
      body: "The processing problems that break large studies, and how they are addressed at the feature layer.",
    },
    {
      href: "/compare",
      title: "Tool comparisons",
      body: "Honest comparisons with common LC/MS processing tools, including when the other tool is the right choice.",
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Learn", href: "/learn" },
        ])}
      />
      <PageHero
        eyebrow="Learn"
        title="Understand the layer where LC/MS results are won"
        lead="Most results in untargeted LC/MS are decided at the feature layer, long before a compound has a name. These pages explain that layer in plain, technical terms."
      />

      <section className="section">
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.href} delay={i * 70}>
              <Link
                href={card.href}
                className="card card-link group flex h-full flex-col"
              >
                <h2
                  className="mb-3 text-xl text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {card.title}
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-muted">
                  {card.body}
                </p>
                <span className="arrow-link mt-auto">
                  Explore <span className="arrow-ne">↗</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBlock cta={{ tier: "benchmark" }} />
    </>
  );
}
