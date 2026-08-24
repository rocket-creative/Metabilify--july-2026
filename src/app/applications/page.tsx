import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { byFamily } from "@/content/registry";
import { pageHref } from "@/types/content";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "What the Metablify platform enables, the omics it serves, and the fields it supports, from drug discovery and environmental analysis to lipidomics and agricultural science.",
  alternates: { canonical: "/applications" },
};

const enables = [
  {
    title: "Recover real features",
    body: "Mass features sitting in background signal are surfaced from data you have already acquired, with no change to the instrument method.",
  },
  {
    title: "Keep large sample sets comparable",
    body: "Features are matched across hundreds of injections, so retention drift and batch structure stop standing in for real differences.",
  },
  {
    title: "Quantify on a cleaner table",
    body: "Outputs are more complete and ready for the statistics and annotation tools your group already uses.",
  },
];

const omics = [
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

// Explicit ordering so breadth leads and no single field reads as the headline.
const verticalOrder = [
  "drug-discovery",
  "pfas-environmental",
  "lipidomics",
  "plant-agricultural-science",
];

function orderedVerticals() {
  const rank = (slug: string) => {
    const i = verticalOrder.indexOf(slug);
    return i === -1 ? verticalOrder.length : i;
  };
  return byFamily("application")
    .filter((p) => p.status !== "draft")
    .sort((a, b) => rank(a.slug) - rank(b.slug));
}

function SpecificApplications() {
  const pages = orderedVerticals();
  if (pages.length === 0) return null;
  return (
    <section className="section section-sage">
      <Reveal>
        <SectionHeading
          eyebrow="Specific applications"
          title="Fields where recovery and alignment decide the result"
          lead="LC/MS carries work across many industries. These are the areas where feature level recovery at cohort scale is the limiting step."
        />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {pages.map((page, i) => (
          <Reveal key={page.slug} delay={i * 70}>
            <Link
              href={pageHref(page)}
              className="card card-link group flex h-full flex-col"
            >
              <h3
                className="mb-3 text-lg text-ink"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {page.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted">
                {page.metaDescription}
              </p>
              <span className="arrow-link mt-auto">
                Explore <span className="arrow-ne">↗</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

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
        lead="Metablify analyzes the mass feature layer shared across LC/MS workflows, with leading applications in metabolomics and proteomics and use across drug discovery, environmental, and agricultural science."
      >
        <Button href="/discuss">Discuss Your Project</Button>
      </PageHero>

      {}
      <section className="section section-sage">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="What we enable"
                title="Three gains that carry across every workflow"
                lead="Metablify works at the mass feature layer shared by all LC/MS analysis, so the same benefits apply whatever the samples are."
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {enables.map((item, i) => (
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

      {}
      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="The omics"
            title="Two leading applications, one measurement layer"
            lead="Different omics ask different questions of the same underlying LC/MS measurement, which is where Metablify does its work."
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {omics.map((app, i) => (
            <Reveal key={app.href} delay={i * 90}>
              <Link
                href={app.href}
                className="card card-link group flex h-full flex-col"
              >
                <h3
                  className="mb-4 text-2xl text-ink md:text-3xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {app.title}
                </h3>
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
        <Reveal delay={180}>
          <div className="card card-provisional mt-6">
            <p className="eyebrow mb-3">Under evaluation</p>
            <h3
              className="mb-3 text-lg text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Other omics
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-muted">
              The mass feature layer is not specific to metabolites or peptides.
              Other omics are under evaluation and are not offered today. If your
              work sits outside these two, tell us what you measure and we will
              say plainly whether the platform applies.
            </p>
          </div>
        </Reveal>
      </section>

      {}
      <SpecificApplications />

      {}
      <section className="section-forest section-wide band-y text-center">
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
