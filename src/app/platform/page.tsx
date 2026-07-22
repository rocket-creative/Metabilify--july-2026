import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ChromatogramVisual } from "@/components/ChromatogramVisual";
import { FeatureCompare } from "@/components/FeatureCompare";
import { MarqueeRibbon } from "@/components/MarqueeRibbon";

export const metadata: Metadata = {
  title: "The Metablify Platform",
  description:
    "Where first principles find and amplify real mass features. Metablify puts the law of large numbers to work across complex LC/MS datasets.",
  alternates: { canonical: "/platform" },
};

const principles = [
  {
    n: "01",
    title: "Detect",
    body: "Surface real mass features buried in background signal that legacy workflows leave behind.",
  },
  {
    n: "02",
    title: "Amplify",
    body: "Put the law of large numbers to work, strengthening consistent signal and suppressing random noise.",
  },
  {
    n: "03",
    title: "Align",
    body: "Resolve and match mass features across large sample sets so cohorts stay comparable.",
  },
  {
    n: "04",
    title: "Quantify",
    body: "Produce cleaner, higher confidence outputs that are ready for downstream analysis.",
  },
];

const capabilities = [
  {
    title: "Scale without noise tax",
    body: "Process large, complex LC/MS cohorts while keeping signal clarity intact across every sample.",
  },
  {
    title: "First principles foundation",
    body: "Detection is grounded in the physics of the measurement, not tuned to a single instrument or study.",
  },
  {
    title: "Cross workflow layer",
    body: "Metablify works at the mass feature layer shared across metabolomics and proteomics workflows.",
  },
  {
    title: "Less manual review",
    body: "Cleaner outputs reduce the hours spent curating peaks, so teams move faster from data to discovery.",
  },
];

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
        eyebrow="Platform"
        title="Where first principles find and amplify real mass features"
        lead="Metablify puts the law of large numbers to work, amplifying consistent signals to detect, align, and quantify mass features across complex LC/MS datasets."
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/discuss">Discuss a Project</Button>
          <Button href="/applications" variant="secondary">
            Explore Applications
          </Button>
        </div>
      </PageHero>

      {/* First principles narrative + chromatogram */}
      <section className="section">
        <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeading
                eyebrow="First principles"
                title="Built on the first principles of physics"
                lead="Metablify is an LC/MS platform designed to extract signal from noise at the mass feature layer shared across workflows. Consistent signals are amplified. Spurious noise is suppressed."
              />
              <ul className="space-y-4 text-muted">
                {[
                  "Detect mass features other workflows miss",
                  "Align features across large, noisy sample sets",
                  "Quantify with cleaner, higher confidence outputs",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2 h-2 w-2 shrink-0 bg-ink"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={100}>
              <ChromatogramVisual />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Scale ribbon — law of large numbers accent */}
      <MarqueeRibbon />

      {/* How it works — forest band with numbered principles */}
      <section className="section-forest section-wide band-y">
        <div className="gutter-x mx-auto max-w-[80rem]">
          <Reveal>
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="display display-lg mb-4 max-w-2xl">
              From raw signal to results you can trust
            </h2>
            <p className="lead mb-8 md:mb-14">
              Every dataset moves through four stages. Each one is grounded in the
              physics of the measurement rather than tuned to a single instrument.
            </p>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 90}>
                <div className="capability">
                  <p className="eyebrow mb-4" style={{ color: "var(--color-lime)" }}>
                    {p.n}
                  </p>
                  <h3 className="capability-title mb-3 text-xl md:text-2xl">
                    {p.title}
                  </h3>
                  <p className="capability-body text-sm leading-relaxed md:text-base">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What Metablify recovers — comparison visual */}
      <section className="section section-sage">
        <Reveal>
          <SectionHeading
            eyebrow="The difference"
            title="See more of what is real in your data"
            lead="Legacy workflows may recover only a subset of detectable mass features. Metablify reveals a broader set of real signal across the same experiment."
          />
        </Reveal>
        <FeatureCompare />
      </section>

      {/* Capabilities grid */}
      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="Engineered for large, noisy datasets"
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 70}>
              <div className="card flex h-full flex-col">
                <h3
                  className="mb-3 text-xl text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {cap.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{cap.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Outcome + applications links */}
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

      {/* Final CTA */}
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
