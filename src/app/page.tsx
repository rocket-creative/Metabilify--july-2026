import { ApplicationsCarousel } from "@/components/ApplicationsCarousel";
import { Button } from "@/components/Button";
import { CapabilitiesBand } from "@/components/CapabilitiesBand";
import { FeatureCompare } from "@/components/FeatureCompare";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ProcessFlow } from "@/components/ProcessFlow";
import { Reveal } from "@/components/Reveal";
import { StaticHero } from "@/components/StaticHero";
import {
  CodeBracketsIcon,
  PartnershipIcon,
  VialIcon,
} from "@/components/visuals/ServiceIcons";
import Link from "next/link";

const services = [
  {
    href: "/work-with-us/services",
    title: "Analytical Services",
    body: "Turn complex LC/MS datasets into cleaner, aligned, and quantified mass-feature results.",
    link: "Explore Services",
    icon: <VialIcon />,
    image: "Amber LC/MS sample vials loaded in an autosampler tray",
  },
  {
    href: "/work-with-us/platform-development",
    title: "Platform Development",
    body: "Develop and extend Metablify workflows for new applications, datasets, and partner needs.",
    link: "Explore Platform Development",
    icon: <CodeBracketsIcon />,
    image:
      "Scientist writing analysis code beside a chromatogram on a second monitor",
  },
  {
    href: "/work-with-us/collaborations",
    title: "Strategic Collaborations",
    body: "Apply the platform to high-value scientific and commercial opportunities.",
    link: "Explore Strategic Collaborations",
    icon: <PartnershipIcon />,
    image:
      "Two researchers reviewing LC/MS results together at a lab bench workstation",
  },
];

export default function HomePage() {
  return (
    <>
      <StaticHero />

      {/* The Venn message the pinned dive used to carry. */}
      <section className="section">
        <Reveal>
          <p className="eyebrow mb-4">Why Metablify</p>
          <h2 className="display display-lg mb-6 max-w-3xl">
            Don’t leave real mass features in the noise.
          </h2>
        </Reveal>
        <FeatureCompare />
      </section>

      <CapabilitiesBand />

      <ApplicationsCarousel />

      {/* Work with us: split band, then the three engagement routes. */}
      <section className="section-wide section-grey band-y">
        <div className="gutter-x mx-auto max-w-[80rem]">
          <Reveal className="mb-10 md:mb-14">
            <div className="work-band">
              <div className="work-band-panel">
                <p className="eyebrow mb-4">Work with us</p>
                <span className="work-band-rule mb-5" aria-hidden="true" />
                <h2 className="display display-md mb-5">Work With Metablify</h2>
                <p className="lead">
                  Engage with Metablify through analytical services, platform
                  development, or strategic collaboration.
                </p>
              </div>
              <div className="work-band-media">
                <ImagePlaceholder
                  ratio="3/2"
                  label="Metablify scientists at work between the LC/MS instrument bay and the data workspace"
                />
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((item, i) => (
              <Reveal key={item.href} delay={i * 80}>
                <Link
                  href={item.href}
                  className="card card-link service-card group"
                >
                  <ImagePlaceholder
                    ratio="4/3"
                    label={item.image}
                    className="service-card-media"
                  />
                  <div className="service-card-body">
                    <div className="service-card-head">
                      <span className="service-badge">{item.icon}</span>
                      <h3 className="service-card-title">{item.title}</h3>
                    </div>
                    <p className="mb-8 text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                    <span className="arrow-link mt-auto">
                      {item.link} <span className="arrow-ne">↗</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Origin */}
      <section className="section">
        <Reveal className="mx-auto mb-10 w-full md:mb-14 md:w-4/5">
          <ImagePlaceholder
            ratio="16/9"
            label="96-well microplate being prepared for LC/MS analysis on an autosampler deck"
          />
        </Reveal>

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

      <ProcessFlow />

      {/* Closing CTA */}
      <section className="section-forest section-wide band-y text-center">
        <Reveal>
          <h2 className="display display-md mx-auto mb-6 max-w-2xl">
            Ready to See More in Your LC/MS Data?
          </h2>
          <p className="lead mx-auto mb-10 max-w-[34rem]">
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
