import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FullBleedImage } from "@/components/FullBleedImage";
import { siteConfig, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Metablify was developed at the Donald Danforth Plant Science Center to solve large scale LC/MS challenges.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "First principles",
    body: "We build on the physics of the measurement, not shortcuts tuned to a single dataset.",
  },
  {
    title: "Signal over noise",
    body: "Every decision serves one goal: recover more of what is real and suppress what is not.",
  },
  {
    title: "Discovery first",
    body: "Cleaner data exists to move researchers faster from measurement to insight.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      <PageHero
        eyebrow="About"
        title="Metablify was built to solve real LC/MS workflow problems."
        lead="Metablify was developed at the Donald Danforth Plant Science Center to solve large scale LC/MS challenges beyond the reach of conventional workflows."
      />

      {/* Mission */}
      <section className="section">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading eyebrow="Mission" title="See more in every experiment" />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <div className="space-y-6 text-base leading-relaxed text-muted md:text-lg">
                <p>
                  We build on the first principles of physics so researchers can
                  recover real mass features that other workflows miss, and move
                  faster from data to discovery.
                </p>
                <p className="text-ink font-medium">
                  It is time for a clearer way to extract signal from noise.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Workspace image */}
      <FullBleedImage
        src="/images/team-workspace.png"
        alt="The Metablify team collaborating in the lab and workspace"
      />

      {/* Values */}
      <section className="section section-sage">
        <Reveal>
          <SectionHeading eyebrow="What we value" title="How we work" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((item, i) => (
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

      {/* Team */}
      <section className="section">
        <Reveal>
          <SectionHeading eyebrow="Team" title="Leadership" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 80}>
              <article className="border-t-2 border-ink pt-6">
                <h3
                  className="mb-1 text-xl text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {member.name}
                </h3>
                <p className="mb-3 text-sm font-medium text-ink">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  {member.credentials}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Origin */}
      <section className="section section-sage">
        <Reveal>
          <SectionHeading
            eyebrow="Origin"
            title="Developed at the Donald Danforth Plant Science Center"
            lead="Metablify was built to solve large scale LC/MS challenges beyond the reach of conventional workflows, grounded in research and validated on real data."
          />
          <div className="border-l-4 border-ink bg-white p-8 md:p-10 max-w-3xl">
            <p
              className="text-xl leading-relaxed text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {siteConfig.description}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="section-forest section-wide band-y text-center">
        <Reveal>
          <h2 className="display display-lg mx-auto mb-5 max-w-3xl text-white">
            Ready to work with Metablify?
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
