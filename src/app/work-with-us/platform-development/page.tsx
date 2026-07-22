import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Platform Development",
  description:
    "Develop and extend Metablify workflows for new applications, datasets, and partner needs.",
  alternates: { canonical: "/work-with-us/platform-development" },
};

const focus = [
  {
    title: "New applications",
    body: "Adapt Metablify beyond current metabolomics and proteomics focus areas.",
  },
  {
    title: "Custom datasets",
    body: "Tune detection and alignment for unusual dataset characteristics and study designs.",
  },
  {
    title: "Partner integration",
    body: "Shape outputs and interfaces around the systems your team already relies on.",
  },
];

export default function PlatformDevelopmentPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Work With Us", href: "/work-with-us" },
          {
            name: "Platform Development",
            href: "/work-with-us/platform-development",
          },
        ]}
      />

      <PageHero
        eyebrow="Work With Us · Platform"
        title="Platform Development"
        lead="Develop and extend Metablify workflows for new applications, datasets, and partner needs."
      >
        <Button href="/discuss">Discuss Your Project</Button>
      </PageHero>

      {/* Narrative */}
      <section className="section section-sage">
        <Reveal>
          <SectionHeading
            eyebrow="When standard is not enough"
            title="Extend the platform where your science needs it"
            lead="When off the shelf workflows are not enough, we partner to adapt Metablify for new instruments, study designs, and discovery goals."
          />
          <ul className="max-w-2xl space-y-4 text-muted">
            {[
              "New applications beyond current metabolomics and proteomics focus",
              "Custom dataset characteristics and alignment requirements",
              "Partner specific outputs and integration needs",
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
      </section>

      {/* Focus areas */}
      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Focus areas"
            title="Where development work concentrates"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {focus.map((item, i) => (
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

      {/* How we partner */}
      <section className="section-forest section-wide band-y">
        <div className="gutter-x mx-auto max-w-[80rem]">
          <Reveal>
            <p className="eyebrow mb-4">How we partner</p>
            <h2 className="display display-lg mb-4 max-w-2xl">
              Grounded in the same first principles
            </h2>
            <p className="lead mb-8 md:mb-14">
              Development work builds on the physics that makes Metablify reliable,
              so new workflows inherit the same signal clarity.
            </p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Scope",
                body: "Define the workflow gap, the data, and the outcomes that matter.",
              },
              {
                n: "02",
                title: "Build",
                body: "Adapt detection, alignment, and quantification to the new problem.",
              },
              {
                n: "03",
                title: "Validate",
                body: "Test against real data and refine until results hold up.",
              },
            ].map((step, i) => (
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

      {/* Final CTA */}
      <section className="section section-sage text-center">
        <Reveal>
          <h2 className="display display-md mx-auto mb-6 max-w-2xl">
            Have a workflow Metablify should reach?
          </h2>
          <Button href="/discuss">Discuss a Project</Button>
        </Reveal>
      </section>
    </>
  );
}
