import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "Engage with Metablify through analytical services, platform development, or strategic collaboration.",
  alternates: { canonical: "/work-with-us" },
};

const paths = [
  {
    href: "/work-with-us/services",
    title: "Analytical Services",
    body: "Turn complex LC/MS datasets into cleaner, aligned, and quantified mass feature results.",
    detail: "Best when you have samples or data and want results.",
  },
  {
    href: "/work-with-us/platform-development",
    title: "Platform Development",
    body: "Develop and extend Metablify workflows for new applications, datasets, and partner needs.",
    detail: "Best when off the shelf workflows are not enough.",
  },
  {
    href: "/work-with-us/collaborations",
    title: "Strategic Collaborations",
    body: "Apply the platform to high value scientific and commercial opportunities.",
    detail: "Best when there is a bigger problem worth solving together.",
  },
];

const steps = [
  {
    n: "01",
    title: "Discuss your project",
    body: "Share your scientific objective, samples, data, and desired outputs.",
  },
  {
    n: "02",
    title: "Choose the approach",
    body: "Services, platform development, or strategic collaboration.",
  },
  {
    n: "03",
    title: "Put Metablify to work",
    body: "We process and analyze LC/MS data for cleaner mass feature results.",
  },
  {
    n: "04",
    title: "Review results",
    body: "Understand outputs, prioritize next steps, and plan further analysis.",
  },
];

export default function WorkWithUsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Work With Us", href: "/work-with-us" },
        ]}
      />

      <PageHero
        eyebrow="Work With Us"
        title="Engage with Metablify"
        lead="Engage with Metablify through analytical services, platform development, or strategic collaboration."
      >
        <Button href="/discuss">Discuss Your Project</Button>
      </PageHero>

      {}
      <section className="section section-sage">
        <Reveal>
          <SectionHeading
            eyebrow="Three ways in"
            title="Choose the path that fits your work"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paths.map((path, i) => (
            <Reveal key={path.href} delay={i * 80}>
              <Link
                href={path.href}
                className="card card-link group flex h-full flex-col"
              >
                <h2
                  className="mb-4 text-2xl text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {path.title}
                </h2>
                <p className="mb-6 flex-1 text-muted leading-relaxed">
                  {path.body}
                </p>
                <p className="mb-8 text-sm text-faint">{path.detail}</p>
                <span className="arrow-link mt-auto">
                  Explore <span className="arrow-ne">↗</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {}
      <section className="section-wide band-y wash-botanical">
        <div className="gutter-x mx-auto max-w-[80rem]">
          <Reveal>
            <p className="eyebrow mb-4">Getting started</p>
            <h2 className="display display-lg mb-8 max-w-2xl md:mb-12">
              Four steps from conversation to results
            </h2>
          </Reveal>
          <ol className="grid list-none gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 80}>
                <li className="card flex h-full list-none flex-col">
                  <p className="eyebrow mb-4">{step.n}</p>
                  <h3
                    className="mb-3 text-xl text-ink"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {}
      <section className="section-forest section-wide band-y text-center">
        <Reveal>
          <h2 className="display display-lg mx-auto mb-5 max-w-3xl text-white">
            Let us find the right path together
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
