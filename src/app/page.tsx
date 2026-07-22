import { ApplicationsCarousel } from "@/components/ApplicationsCarousel";
import { Button } from "@/components/Button";
import { CapabilitiesBand } from "@/components/CapabilitiesBand";
import { FullBleedImage } from "@/components/FullBleedImage";
import { MarqueeRibbon } from "@/components/MarqueeRibbon";
import { MetabolomeExplainer } from "@/components/MetabolomeExplainer";
import { ParallaxHero } from "@/components/ParallaxHero";
import { ProcessFlow } from "@/components/ProcessFlow";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <ParallaxHero />

      <MetabolomeExplainer />

      {/* Discovery — forest-green band with line icons */}
      <CapabilitiesBand />

      {/* Scale ribbon accent */}
      <MarqueeRibbon />

      {/* Applications — 2-col split cards */}
      <ApplicationsCarousel />

      {/* Work with us */}
      <section className="section-wide section-grey band-y">
        <div className="gutter-x mx-auto max-w-[80rem]">
          <Reveal>
            <p className="eyebrow mb-4">Work with us</p>
            <h2 className="display display-lg mb-6 max-w-2xl">
              Work With Metablify
            </h2>
            <p className="lead mb-8 max-w-2xl md:mb-12">
              Engage with Metablify through analytical services, platform
              development, or strategic collaboration.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                href: "/work-with-us/services",
                title: "Analytical Services",
                body: "Turn complex LC/MS datasets into cleaner, aligned, and quantified mass-feature results.",
                link: "Explore Services",
              },
              {
                href: "/work-with-us/platform-development",
                title: "Platform Development",
                body: "Develop and extend Metablify workflows for new applications, datasets, and partner needs.",
                link: "Explore Platform Development",
              },
              {
                href: "/work-with-us/collaborations",
                title: "Strategic Collaborations",
                body: "Apply the platform to high-value scientific and commercial opportunities.",
                link: "Explore Strategic Collaborations",
              },
            ].map((item, i) => (
              <Reveal key={item.href} delay={i * 80}>
                <Link href={item.href} className="card card-link group flex h-full flex-col">
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
                    {item.link} <span className="arrow-ne">↗</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width lifestyle image */}
      <FullBleedImage
        src="/images/team-workspace.png"
        alt="The Metablify team collaborating in the lab and workspace"
      />

      {/* Origin */}
      <section className="section">
        <Reveal>
          <p className="eyebrow mb-4">Origin</p>
          <h2 className="display display-lg mb-6 max-w-3xl">
            Metablify Was Built to Solve Real LC/MS Workflow Problems.
          </h2>
          <p className="lead mb-10">
            Metablify was developed at the Donald Danforth Plant Science Center
            to solve large-scale LC/MS challenges beyond the reach of
            conventional workflows.
          </p>
          <Button href="/about" variant="secondary">
            Learn More About Metablify
          </Button>
        </Reveal>
      </section>

      {/* Getting started */}
      <ProcessFlow />

      {/* Final CTA */}
      <section className="section-forest section-wide band-y text-center">
        <Reveal>
          <h2 className="display display-lg mx-auto mb-5 max-w-3xl text-white">
            Ready to See More in Your LC/MS Data?
          </h2>
          <p className="lead mx-auto mb-10 !text-white/75">
            Bring us your samples, LC/MS data, or workflow challenge. We will
            help determine the right path forward.
          </p>
          <Button href="/discuss" variant="on-green">
            Discuss Your Project
          </Button>
        </Reveal>
      </section>
    </>
  );
}
