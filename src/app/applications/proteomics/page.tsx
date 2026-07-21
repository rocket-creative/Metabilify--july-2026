import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ChromatogramVisual } from "@/components/ChromatogramVisual";

export const metadata: Metadata = {
  title: "Proteomics",
  description:
    "Reveal and quantify peptide mass features across complex LC/MS datasets with Metablify.",
  alternates: { canonical: "/applications/proteomics" },
};

const workflow = [
  {
    n: "01",
    title: "Scale",
    body: "Handle complex peptide datasets without losing signal clarity as runs multiply.",
  },
  {
    n: "02",
    title: "Align",
    body: "Match peptide features across samples for comparative and quantitative analysis.",
  },
  {
    n: "03",
    title: "Clarify",
    body: "Separate real signal from noise so quantification rests on confident features.",
  },
];

const useCases = [
  {
    title: "Comparative proteomics",
    body: "Compare peptide abundance across conditions with features aligned sample to sample.",
  },
  {
    title: "Large study designs",
    body: "Keep results stable as complex proteomics cohorts grow in size and depth.",
  },
  {
    title: "Deep signal recovery",
    body: "Recover peptide features that noise and legacy pipelines would otherwise hide.",
  },
];

export default function ProteomicsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Applications", href: "/applications" },
          { name: "Proteomics", href: "/applications/proteomics" },
        ]}
      />

      <PageHero
        eyebrow="Applications · Proteomics"
        title="Proteomics built for scale and signal clarity"
        lead="Reveal and quantify peptide mass features across complex LC/MS datasets with a workflow built for scale, alignment, and signal clarity."
      >
        <Button href="/discuss">Discuss Your Project</Button>
      </PageHero>

      {/* Intro + visual */}
      <section className="section">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeading
                eyebrow="The challenge"
                title="Peptide mass features without the noise tax"
                lead="Metablify analyzes the mass feature layer shared across LC/MS workflows so proteomics teams can recover more of what is real and spend less time on manual review."
              />
              <p className="text-muted leading-relaxed">
                Consistent signal is amplified and random noise is suppressed, so
                complex peptide datasets stay clean, aligned, and quantifiable.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={100}>
              <ChromatogramVisual />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Workflow — forest band */}
      <section className="section-forest section-wide py-[clamp(4.5rem,10vw,7.5rem)]">
        <div className="mx-auto max-w-[80rem] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4">Workflow</p>
            <h2 className="display display-lg mb-4 max-w-2xl">
              From complex runs to confident quantification
            </h2>
            <p className="lead mb-14">
              Three stages carry your proteomics data from raw signal to results
              ready for comparison.
            </p>
          </Reveal>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
            {workflow.map((step, i) => (
              <Reveal key={step.n} delay={i * 90}>
                <div className="capability">
                  <p
                    className="eyebrow mb-4"
                    style={{ color: "var(--color-lime)" }}
                  >
                    {step.n}
                  </p>
                  <h3 className="capability-title mb-3 text-xl md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="capability-body text-sm leading-relaxed md:text-base">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Outcomes"
            title="Recover more of what is real"
            lead="Metablify helps proteomics teams recover more real peptide features while spending less time curating peaks, so effort shifts from cleanup to discovery."
          />
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            "Scale across complex peptide datasets",
            "Align features for comparative analysis",
            "Clarify signal for confident quantification",
          ].map((text, i) => (
            <Reveal key={text} delay={i * 70}>
              <p className="border-l-2 border-ink pl-5 text-muted leading-relaxed">
                {text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="section section-sage">
        <Reveal>
          <SectionHeading eyebrow="Where it fits" title="Built for real studies" />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {useCases.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="card flex h-full flex-col">
                <h3
                  className="mb-3 text-lg text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-forest section-wide py-[clamp(4.5rem,10vw,7.5rem)] text-center">
        <Reveal>
          <h2 className="display display-lg mx-auto mb-5 max-w-3xl text-white">
            Ready to apply Metablify to proteomics?
          </h2>
          <p className="lead mx-auto mb-10 !text-white/75">
            Bring us your samples, LC/MS data, or workflow challenge.
          </p>
          <Button href="/discuss" variant="on-green">
            Discuss a Project
          </Button>
        </Reveal>
      </section>
    </>
  );
}
