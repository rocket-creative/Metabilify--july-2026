import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { PlatformPipeline } from "@/components/PlatformPipeline";
import { Reveal } from "@/components/Reveal";
import { FeatureCompare } from "@/components/FeatureCompare";

export const metadata: Metadata = {
  title: "The Metablify Platform",
  description:
    "Where first principles and AI find and amplify real mass features. Metablify aligns, pools, and amplifies signal across complex LC/MS datasets.",
  alternates: { canonical: "/platform" },
};

/**
 * Structure per the 9/1 review: hero, then the Align → Pool → Amplify →
 * output section, then the Venn diagram, then the omics. The first-principles
 * band and the "capabilities" cards were removed because their copy was not
 * the CEO's and he could not vouch for it; they come back when the technical
 * team writes them.
 */
export default function PlatformPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Platform", href: "/platform" },
        ]}
      />

      <PageHero
        eyebrow="The Metablify Platform"
        title="Where First Principles and AI Find and Amplify Real Mass Features"
        lead="Metablify combines the first principles of physics with AI to align, pool, and amplify consistent signal across complex LC/MS datasets, so real mass features are detected, resolved, and quantified."
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/discuss">Discuss a Project</Button>
          <Button href="/applications" variant="secondary">
            Explore Applications
          </Button>
        </div>
      </PageHero>

      <PlatformPipeline />

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="The difference"
            title="See more of what is real in your data"
            lead="Legacy workflows may recover only a subset of detectable mass features. Metablify reveals a broader set of real signal across the same experiment."
          />
        </Reveal>
        <FeatureCompare />
      </section>

      <section className="section section-sage">
        <Reveal>
          <SectionHeading
            eyebrow="Outcome"
            title="Cleaner data. Stronger discovery."
            lead="Cleaner, higher confidence mass feature data reduces manual review and provides a stronger foundation for downstream metabolomics, proteomics, and discovery."
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            {
              href: "/applications/metabolomics",
              title: "Metabolomics",
              body: "Turn complex untargeted LC/MS datasets into cleaner, aligned, and quantified results.",
            },
            {
              href: "/applications/proteomics",
              title: "Proteomics",
              body: "Reveal and quantify peptide mass features across complex datasets at scale.",
            },
          ].map((item, i) => (
            <Reveal key={item.href} delay={i * 80}>
              <Link
                href={item.href}
                className="card card-link group flex h-full flex-col"
              >
                <h3
                  className="mb-3 text-xl text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
                <span className="arrow-link mt-auto">
                  Explore {item.title} <span className="arrow-ne">↗</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-forest section-wide band-y text-center">
        <Reveal>
          <h2 className="display display-lg mx-auto mb-5 max-w-3xl text-white">
            Ready to see more in your LC/MS data?
          </h2>
          <p className="lead mx-auto mb-10 !text-white/75">
            Bring us your samples, LC/MS data, or workflow challenge.
          </p>
          <Button href="/discuss" variant="on-green">
            Discuss Your Project
          </Button>
        </Reveal>
      </section>
    </>
  );
}
