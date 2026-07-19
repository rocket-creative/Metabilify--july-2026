import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ChromatogramVisual } from "@/components/ChromatogramVisual";

export const metadata: Metadata = {
  title: "Metabolomics",
  description:
    "Turn complex untargeted LC/MS datasets into cleaner, aligned, and quantified mass feature results with Metablify.",
  alternates: { canonical: "/applications/metabolomics" },
};

const workflow = [
  {
    n: "01",
    title: "Detect",
    body: "Surface real mass features buried in background signal across untargeted runs.",
  },
  {
    n: "02",
    title: "Align",
    body: "Match features across large, noisy sample cohorts so groups stay comparable.",
  },
  {
    n: "03",
    title: "Quantify",
    body: "Produce cleaner outputs ready for statistics and downstream discovery.",
  },
];

const useCases = [
  {
    title: "Untargeted discovery",
    body: "Cast a wide net across the metabolome and recover more of what is really there.",
  },
  {
    title: "Large cohort studies",
    body: "Keep alignment and quantification stable as sample counts grow into the hundreds.",
  },
  {
    title: "Biomarker candidates",
    body: "Build a cleaner foundation for the features that matter to your hypothesis.",
  },
];

export default function MetabolomicsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Applications", href: "/applications" },
          { name: "Metabolomics", href: "/applications/metabolomics" },
        ]}
      />

      <PageHero
        eyebrow="Applications · Metabolomics"
        title="Metabolomics with clearer mass features"
        lead="Turn complex untargeted LC/MS datasets into cleaner, aligned, and quantified mass feature results."
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
                title="Signal that hides in the noise"
                lead="Untargeted metabolomics generates large, noisy LC/MS datasets. Real mass features can be missed, split, or buried, and legacy workflows may recover only a subset of what is detectable."
              />
              <p className="text-muted leading-relaxed">
                Metablify amplifies consistent signal and suppresses noise, so
                more of the true metabolome is recovered from the same experiment.
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
              From untargeted data to quantified features
            </h2>
            <p className="lead mb-14">
              Three stages carry your metabolomics data from raw signal to
              results ready for analysis.
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
            title="Stronger foundations for downstream discovery"
            lead="Cleaner, higher confidence mass feature data reduces manual review and provides a stronger foundation for metabolomics workflows that depend on accurate detection, alignment, and quantification."
          />
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            "Detect real mass features buried in background signal",
            "Align features across large, noisy sample cohorts",
            "Quantify with outputs ready for downstream analysis",
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
            Ready to apply Metablify to metabolomics?
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
