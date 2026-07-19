import { ApplicationsCarousel } from "@/components/ApplicationsCarousel";
import { Button } from "@/components/Button";
import { CapabilitiesBand } from "@/components/CapabilitiesBand";
import { FullBleedImage } from "@/components/FullBleedImage";
import { MetabolomeExplainer } from "@/components/MetabolomeExplainer";
import { ParallaxHero } from "@/components/ParallaxHero";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <ParallaxHero />

      {/* Problem — Vireo-style narrative */}
      <section className="section-wide section-grey py-[clamp(4.5rem,10vw,7.5rem)]">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <Reveal>
            <p className="eyebrow mb-6">The problem</p>
            <h2 className="display display-lg mb-8">
              Large LC/MS datasets are noisy, complex, and difficult to align.
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted">
              <p>
                Real mass features can be missed, split, or buried in background
                signal. Legacy workflows may recover only a subset of what is
                detectable.
              </p>
              <p className="text-ink font-medium">
                It is time for a clearer way to extract signal from noise.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Platform capabilities — forest-green band with line icons */}
      <CapabilitiesBand />

      <MetabolomeExplainer />

      {/* Applications — 2-col split cards */}
      <ApplicationsCarousel />

      {/* Work with us */}
      <section className="section-wide section-grey py-[clamp(4.5rem,10vw,7.5rem)]">
        <div className="mx-auto max-w-[80rem] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4">Work with us</p>
            <h2 className="display display-lg mb-12 max-w-2xl">
              Analytical services, platform development, or collaboration.
            </h2>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                href: "/work-with-us/services",
                title: "Analytical Services",
                body: "Turn complex LC/MS datasets into cleaner, aligned, quantified results.",
              },
              {
                href: "/work-with-us/platform-development",
                title: "Platform Development",
                body: "Extend Metablify for new applications, datasets, and partner needs.",
              },
              {
                href: "/work-with-us/collaborations",
                title: "Strategic Collaborations",
                body: "Apply the platform to high value scientific and commercial opportunities.",
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
                    Read more <span className="arrow-ne">↗</span>
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
            Developed at the Donald Danforth Plant Science Center
          </h2>
          <p className="lead mb-10">
            Metablify was built to solve large scale LC/MS challenges beyond the
            reach of conventional workflows.
          </p>
          <Button href="/about" variant="secondary">
            About Metablify
          </Button>
        </Reveal>
      </section>

      {/* Getting started */}
      <section className="section-wide border-t border-stone py-[clamp(4.5rem,10vw,7.5rem)]">
        <div className="mx-auto max-w-[80rem] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4">Getting started</p>
            <h2 className="display display-lg mb-12 max-w-2xl">
              Four steps from conversation to results
            </h2>
          </Reveal>
          <ol className="grid list-none gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                title: "Discuss your project",
                body: "Scientific objective, samples, data, and desired outputs.",
              },
              {
                n: "02",
                title: "Choose the approach",
                body: "Services, platform development, or strategic collaboration.",
              },
              {
                n: "03",
                title: "Put Metablify to work",
                body: "Process and analyze LC/MS data for cleaner mass feature results.",
              },
              {
                n: "04",
                title: "Review results",
                body: "Understand outputs, prioritize next steps, plan further analysis.",
              },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 80}>
                <li className="card flex h-full list-none flex-col">
                  <p className="eyebrow mb-4">{step.n}</p>
                  <h3
                    className="mb-3 text-xl text-ink"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-forest section-wide py-[clamp(4.5rem,10vw,7.5rem)] text-center">
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
