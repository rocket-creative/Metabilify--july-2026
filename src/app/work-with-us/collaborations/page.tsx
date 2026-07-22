import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Strategic Collaborations",
  description:
    "Apply the Metablify platform to high value scientific and commercial opportunities.",
  alternates: { canonical: "/work-with-us/collaborations" },
};

const fits = [
  {
    title: "Research groups",
    body: "Teams pushing against the limits of what conventional LC/MS workflows can recover.",
  },
  {
    title: "Organizations",
    body: "Partners with high value scientific or commercial questions that depend on cleaner data.",
  },
  {
    title: "Long horizon work",
    body: "Programs where sustained analysis and shared discovery justify a deeper partnership.",
  },
];

export default function CollaborationsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Work With Us", href: "/work-with-us" },
          {
            name: "Strategic Collaborations",
            href: "/work-with-us/collaborations",
          },
        ]}
      />

      <PageHero
        eyebrow="Work With Us · Collaborations"
        title="Strategic Collaborations"
        lead="Apply the platform to high value scientific and commercial opportunities."
      >
        <Button href="/discuss">Discuss Your Project</Button>
      </PageHero>

      {/* Narrative + origin quote */}
      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Why collaborate"
            title="Partner on problems worth solving together"
            lead="We collaborate with research groups and organizations where Metablify can unlock discovery at a scale conventional workflows cannot reach."
          />
          <div className="border-l-4 border-ink bg-neutral p-8 md:p-10 max-w-3xl">
            <p
              className="text-xl leading-relaxed text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Metablify was developed at the {siteConfig.origin} to solve large
              scale LC/MS challenges beyond the reach of conventional workflows.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Who it fits */}
      <section className="section section-sage">
        <Reveal>
          <SectionHeading
            eyebrow="Who it fits"
            title="Where collaboration makes sense"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {fits.map((item, i) => (
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
      <section className="section-forest section-wide band-y text-center">
        <Reveal>
          <h2 className="display display-lg mx-auto mb-5 max-w-3xl text-white">
            Let us explore what we could build together
          </h2>
          <p className="lead mx-auto mb-10 !text-white/75">
            Tell us about the opportunity and how Metablify might fit.
          </p>
          <Button href="/discuss" variant="on-green">
            Discuss Your Project
          </Button>
        </Reveal>
      </section>
    </>
  );
}
