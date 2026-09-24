import { ApplicationsCarousel } from "@/components/ApplicationsCarousel";
import { Button } from "@/components/Button";
import { CapabilitiesBand } from "@/components/CapabilitiesBand";
import MassFeatureCircle from "@/components/visuals/MassFeatureCircle";
import { FieldsGrid } from "@/components/FieldsGrid";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ProcessFlow } from "@/components/ProcessFlow";
import { Reveal } from "@/components/Reveal";
import MetablifyHero from "@/components/MetablifyHero";
import {
  CodeBracketsIcon,
  PartnershipIcon,
  VialIcon,
} from "@/components/visuals/ServiceIcons";
import Link from "next/link";
import type { ReactNode } from "react";
import { stock, type StockShot } from "@/lib/stock";
import { Photo } from "@/components/Photo";

const services: {
  href: string;
  title: string;
  body: string;
  link: string;
  icon: ReactNode;
  image: string;
  photo?: StockShot;
}[] = [
  {
    href: "/work-with-us/services",
    title: "Analytical Services",
    body: "Turn complex LC/MS datasets into cleaner, aligned, and quantified mass-feature results.",
    link: "Explore Services",
    icon: <VialIcon />,
    image: "Rack of capped amber HPLC vials, close-up",
    photo: stock.vialRack,
  },
  {
    href: "/work-with-us/platform-development",
    title: "Platform Development",
    body: "Develop and extend Metablify workflows for new applications, datasets, and partner needs.",
    link: "Explore Platform Development",
    icon: <CodeBracketsIcon />,
    image:
      "Analyst at dual monitors showing peak traces, dim lab",
  },
  {
    href: "/work-with-us/collaborations",
    title: "Strategic Collaborations",
    body: "Apply the platform to high-value scientific and commercial opportunities.",
    link: "Explore Strategic Collaborations",
    icon: <PartnershipIcon />,
    image:
      "Two researchers reviewing results on a laptop at a lab bench",
  },
];

export default function HomePage() {
  return (
    <>
      <MetablifyHero />

      {/* Legacy workflows versus the broader set Metablify recovers. */}
      <section className="section">
        <Reveal>
          <p className="eyebrow mb-4">Why Metablify</p>
          <h2 className="display display-lg mb-6 max-w-3xl">
            Don’t leave real mass features in the noise.
          </h2>
        </Reveal>
        <MassFeatureCircle className="mt-2" />
      </section>

      <CapabilitiesBand />

      <ApplicationsCarousel />

      {/* Applications — the six fields, per the 9/7 call. */}
      <section className="section-wide band-y section-grey">
        <div className="gutter-x mx-auto max-w-[80rem]">
          <Reveal>
            <p className="eyebrow mb-4">Applications</p>
            <h2 className="display display-lg mb-4 max-w-3xl">
              Where Metablify Can Be Applied
            </h2>
            <p className="lead mb-10 md:mb-14">
              Our platform supports companies across diverse industries,
              applying metabolomics and proteomics workflows to solve
              real-world challenges.
            </p>
          </Reveal>
          <FieldsGrid />
          <Reveal delay={420}>
            <div className="mt-10 text-center md:mt-14">
              <Button href="/applications" variant="secondary">
                Explore All Applications
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Work with us: split band, then the three engagement routes. */}
      <section className="section-wide band-y">
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
                <Photo
                  shape="card"
                  className="work-band-photo"
                  src="/images/team-whiteboard.jpg"
                  alt="Ivan Baxter, Louis Connelly, and Allen Hubbard working through a chromatogram at a whiteboard"
                  width={1800}
                  height={1202}
                  sizes="(min-width: 1024px) 40rem, 90vw"
                />
              </div>
            </div>
          </Reveal>

          <div className="work-routes">
            {services.map((item, i) => (
              <Reveal key={item.href} delay={i * 80} className="min-w-0">
                <Link
                  href={item.href}
                  className="card card-link service-card group"
                >
                  {item.photo ? (
                    <Photo
                      shape="card"
                      className="service-card-media"
                      src={item.photo.src}
                      alt={item.photo.alt}
                      width={item.photo.width}
                      height={item.photo.height}
                      sizes="(min-width: 1024px) 24rem, 90vw"
                    />
                  ) : (
                    <ImagePlaceholder
                      ratio="4/3"
                      label={item.image}
                      className="service-card-media"
                    />
                  )}
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
            <ImagePlaceholder
              ratio="16/9"
              label="Wide view of a collaboration session in the lab"
              className="work-routes-photo"
            />
          </div>
        </div>
      </section>

      {/* Origin */}
      <section className="section">
        <Reveal className="mx-auto mb-10 w-full md:mb-14 md:w-4/5">
          <Photo
            shape="wide"
            src={stock.greenhouse.src}
            alt={stock.greenhouse.alt}
            width={stock.greenhouse.width}
            height={stock.greenhouse.height}
            sizes="(min-width: 1024px) 64rem, 90vw"
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
