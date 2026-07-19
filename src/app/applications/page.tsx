import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "One Metablify platform. Multiple omics. Leading applications in metabolomics and proteomics.",
  alternates: { canonical: "/applications" },
};

const applications = [
  {
    href: "/applications/metabolomics",
    title: "Metabolomics",
    body: "Turn complex untargeted LC/MS datasets into cleaner, aligned, and quantified mass feature results.",
    points: [
      "Detect features buried in background signal",
      "Align across large sample cohorts",
      "Quantify with confidence for discovery",
    ],
  },
  {
    href: "/applications/proteomics",
    title: "Proteomics",
    body: "Reveal and quantify peptide mass features across complex LC/MS datasets with a workflow built for scale.",
    points: [
      "Scale across complex peptide datasets",
      "Align features for comparative analysis",
      "Clarify signal for confident quantification",
    ],
  },
];

export default function ApplicationsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Applications", href: "/applications" },
        ]}
      />

      <PageHero
        eyebrow="Applications"
        title="One Metablify platform. Multiple omics."
        lead="Metablify analyzes the mass feature layer shared across LC/MS workflows, with leading applications in metabolomics and proteomics."
      >
        <Button href="/discuss">Discuss Your Project</Button>
      </PageHero>

      {/* Shared platform explainer */}
      <section className="section">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="One layer, many workflows"
                title="A shared foundation across omics"
                lead="Different omics ask different questions, yet they share the same underlying LC/MS measurement. Metablify works at that mass feature layer, so the same first principles benefit every application."
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  title: "Detect",
                  body: "Surface real mass features other workflows miss.",
                },
                {
                  title: "Align",
                  body: "Match features across large, noisy sample sets.",
                },
                {
                  title: "Quantify",
                  body: "Deliver cleaner outputs ready for analysis.",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="card flex h-full flex-col">
                    <h3
                      className="mb-3 text-lg text-ink"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application cards */}
      <section className="section section-sage">
        <Reveal>
          <SectionHeading eyebrow="Explore" title="Leading applications" />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {applications.map((app, i) => (
            <Reveal key={app.href} delay={i * 90}>
              <Link
                href={app.href}
                className="card card-link group flex h-full flex-col"
              >
                <h2
                  className="mb-4 text-3xl text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {app.title}
                </h2>
                <p className="mb-6 text-muted leading-relaxed">{app.body}</p>
                <ul className="mb-8 space-y-3 text-sm text-muted">
                  {app.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 bg-ink"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <span className="arrow-link mt-auto">
                  Explore {app.title} <span className="arrow-ne">↗</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-forest section-wide py-[clamp(4.5rem,10vw,7.5rem)] text-center">
        <Reveal>
          <h2 className="display display-lg mx-auto mb-5 max-w-3xl text-white">
            Not sure which fits your data?
          </h2>
          <p className="lead mx-auto mb-10 !text-white/75">
            Tell us about your samples and objective. We will help find the right
            approach.
          </p>
          <Button href="/discuss" variant="on-green">
            Discuss Your Project
          </Button>
        </Reveal>
      </section>
    </>
  );
}
