import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SampleJourney } from "@/components/SampleJourney";
import {
  AnalyzeIcon,
  DefineIcon,
  DiscussIcon,
  ReviewIcon,
} from "@/components/visuals/ProcessIcons";
import {
  CodeBracketsIcon,
  PartnershipIcon,
  VialIcon,
} from "@/components/visuals/ServiceIcons";
import {
  GuidanceIcon,
  ResultsIcon,
  TargetIcon,
} from "@/components/visuals/OutcomeIcons";

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "Engage with Metablify through analytical services, platform development, or strategic collaboration.",
  alternates: { canonical: "/work-with-us" },
};

/**
 * Built to the CEO's 9/7 Work With Us mockup: hero with image, three path
 * cards with image + badge, four getting-started cards, and a closing CTA
 * with three reasons. Copy is his. The sample journey stays parked here per
 * the 9/7 call until it becomes the hero animation.
 */
const paths = [
  {
    href: "/work-with-us/services",
    title: "Analytical Services",
    body: "Turn complex LC/MS datasets into cleaner, aligned, and quantified mass feature results.",
    detail: "Best when you have samples or data and want results.",
    icon: <VialIcon />,
    image: "Blue-cap vials in an HPLC rack",
  },
  {
    href: "/work-with-us/platform-development",
    title: "Platform Development",
    body: "Develop and extend Metablify workflows for new applications, datasets, and partner needs.",
    detail: "Best when off the shelf workflows are not enough.",
    icon: <CodeBracketsIcon />,
    image: "Peak traces on a dark monitor, data workspace",
  },
  {
    href: "/work-with-us/collaborations",
    title: "Strategic Collaborations",
    body: "Apply the platform to high-value scientific and commercial opportunities through strategic collaborations, co-development, and joint ventures.",
    detail: "Best when the opportunity calls for a deeper partnership and shared path to commercialization.",
    icon: <PartnershipIcon />,
    image: "Two researchers reviewing results on a laptop at a lab bench",
  },
] as const;

const steps = [
  {
    n: "01",
    title: "Discuss your project",
    body: "Share your scientific objective, samples, data, and desired outputs.",
    icon: <DiscussIcon />,
  },
  {
    n: "02",
    title: "Choose the approach",
    body: "Services, platform development, or strategic collaboration.",
    icon: <DefineIcon />,
  },
  {
    n: "03",
    title: "Put Metablify to work",
    body: "We process and analyze LC/MS data for cleaner mass feature results.",
    icon: <AnalyzeIcon />,
  },
  {
    n: "04",
    title: "Review results",
    body: "Understand outputs, prioritize next steps, and plan further analysis.",
    icon: <ReviewIcon />,
  },
] as const;

const reasons = [
  { label: "Tailored to your objectives", icon: <TargetIcon /> },
  { label: "Expert guidance", icon: <GuidanceIcon /> },
  { label: "Real, actionable results", icon: <ResultsIcon /> },
] as const;

export default function WorkWithUsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Work With Us", href: "/work-with-us" },
        ]}
      />

      {/* Hero */}
      <section className="wwu-hero section-wide border-b border-stone">
        <div className="gutter-x mx-auto max-w-[80rem]">
          <div className="wwu-hero-grid">
            <Reveal>
              <p className="eyebrow mb-4">Work with us</p>
              <h1 className="display display-lg">Engage with Metablify</h1>
              <p className="lead mt-6 max-w-[34rem]">
                Engage with Metablify through analytical services, platform
                development, or strategic collaboration.
              </p>
              <div className="mt-8">
                <Button href="/discuss">Discuss Your Project</Button>
              </div>
            </Reveal>
            <Reveal delay={120} className="wwu-hero-art">
              <ImagePlaceholder
                ratio="3/2"
                label="Wide landscape or lab-to-horizon image, cool green tones"
              />
              <p className="apps-hero-tag wwu-hero-tag">
                Deeper insight.
                <br />
                Broader possibility.
                <span className="apps-hero-rule" aria-hidden="true" />
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Three ways in */}
      <section className="section">
        <Reveal>
          <p className="eyebrow mb-4">Three ways in</p>
          <h2 className="display display-lg mb-10 max-w-3xl md:mb-14">
            Choose the path that fits your work
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {paths.map((p, i) => (
            <Reveal key={p.href} delay={i * 80} className="h-full">
              <Link href={p.href} className="field-card group">
                <div className="field-card-media">
                  <ImagePlaceholder ratio="3/2" label={p.image} />
                  <span className="field-card-badge">{p.icon}</span>
                </div>
                <div className="field-card-body">
                  <h3 className="field-card-title">{p.title}</h3>
                  <p className="field-card-text">{p.body}</p>
                  <p className="wwu-detail">{p.detail}</p>
                  <span className="arrow-link mt-auto">
                    Explore <span className="arrow-ne">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Getting started */}
      <section className="section-wide band-y section-grey">
        <div className="gutter-x mx-auto max-w-[80rem]">
          <Reveal>
            <p className="eyebrow mb-4">Getting started</p>
            <h2 className="display display-lg mb-4 max-w-3xl">
              From Conversation to Results
            </h2>
            <p className="lead mb-10 md:mb-14">
              We make it easy to get started — and turn your data and goals into
              actionable outcomes.
            </p>
          </Reveal>
          <ol className="grid list-none gap-5 p-0 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80} className="h-full">
                <li className="wwu-step">
                  <p className="wwu-step-num">{s.n}</p>
                  <span className="wwu-step-badge">{s.icon}</span>
                  <h3 className="wwu-step-title">{s.title}</h3>
                  <p className="wwu-step-body">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <SampleJourney />

      {/* Closing CTA */}
      <section className="section">
        <Reveal>
          <div className="wwu-cta">
            <div>
              <p className="eyebrow mb-4">Let’s move forward</p>
              <h2 className="display display-lg mb-4">
                Let us find the right path together
              </h2>
              <p className="lead mb-8">
                Start a conversation about your data, your goals, and how
                Metablify can help.
              </p>
              <Button href="/discuss">Discuss Your Project</Button>
            </div>
            <ul className="wwu-reasons">
              {reasons.map((r) => (
                <li key={r.label} className="wwu-reason">
                  <span className="wwu-reason-icon">{r.icon}</span>
                  <span>{r.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
