import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Analytical Services",
  description:
    "Turn complex LC/MS datasets into cleaner, aligned, and quantified mass feature results with Metablify analytical services.",
  alternates: { canonical: "/work-with-us/services" },
};

const steps = [
  {
    n: "01",
    title: "Share context",
    body: "Scientific objective, sample types, instruments, and what success looks like.",
  },
  {
    n: "02",
    title: "Run Metablify",
    body: "We process and analyze LC/MS data to produce cleaner, aligned, quantified mass feature results.",
  },
  {
    n: "03",
    title: "Review together",
    body: "Work with our team to understand outputs and prioritize next steps.",
  },
];

const deliverables = [
  {
    title: "Cleaner mass features",
    body: "Real features recovered from background signal, with noise suppressed.",
  },
  {
    title: "Aligned datasets",
    body: "Features matched across samples so cohorts stay comparable.",
  },
  {
    title: "Quantified outputs",
    body: "Results structured and ready for statistics and downstream analysis.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Work With Us", href: "/work-with-us" },
          { name: "Analytical Services", href: "/work-with-us/services" },
        ]}
      />

      <PageHero
        eyebrow="Work With Us · Services"
        title="Analytical Services"
        lead="Turn complex LC/MS datasets into cleaner, aligned, and quantified mass feature results."
      >
        <Button href="/discuss">Discuss Your Project</Button>
      </PageHero>

      {}
      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Bring us your samples or data"
            lead="Tell us about your scientific objective, samples, existing data, and desired outputs. We define an analytical services project matched to your workflow challenge."
          />
        </Reveal>
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 80}>
              <li>
                <p className="eyebrow mb-3">{step.n}</p>
                <h3
                  className="mb-2 text-xl text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.title}
                </h3>
                <p className="text-muted leading-relaxed">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {}
      <section className="section section-sage">
        <Reveal>
          <SectionHeading
            eyebrow="What you get"
            title="Results you can build on"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {deliverables.map((item, i) => (
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

      {}
      <section className="section">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="Before you reach out"
                title="What to include"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <ul className="space-y-4 text-muted">
                {[
                  "Scientific objective and desired outputs",
                  "Sample types and approximate scale",
                  "Existing LC/MS data or instrument context",
                  "Timeline and any constraints we should know",
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
        </div>
      </section>

      {}
      <section className="section-forest section-wide band-y text-center">
        <Reveal>
          <h2 className="display display-lg mx-auto mb-5 max-w-3xl text-white">
            Ready to turn your data into results?
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
