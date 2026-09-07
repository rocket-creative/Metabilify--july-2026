import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { FieldsGrid } from "@/components/FieldsGrid";
import { MoleculeIcon, PeptideIcon } from "@/components/visuals/FieldIcons";
import { RidgelineVisual } from "@/components/visuals/RidgelineVisual";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "One platform, multiple omics, many applications. Metablify applies LC/MS mass-feature analysis across metabolomics and proteomics, from drug discovery to environmental and PFAS research.",
  alternates: { canonical: "/applications" },
};

/**
 * Built to the CEO's 9/7 Applications mockup: hero with ridgeline art, two
 * omics cards, six field cards under "Where Metablify Can Be Applied", and a
 * closing CTA. Copy is his. Fields with a live page link to it; the rest go
 * to the discuss form until their pages exist.
 */
const omics = [
  {
    href: "/applications/metabolomics",
    title: "Metabolomics",
    body: "Analyze complex untargeted LC/MS datasets to generate cleaner, aligned, and quantified mass-feature data.",
    icon: <MoleculeIcon />,
    image: "Metabolomics — macro of small-molecule sample vials or an abstract molecular texture, cool green tones",
    tone: "sage",
  },
  {
    href: "/applications/proteomics",
    title: "Proteomics",
    body: "Apply the same platform principles to complex peptide LC/MS datasets for improved feature detection, alignment, and quantification.",
    icon: <PeptideIcon />,
    image: "Proteomics — protein structure render or peptide chain, cool grey tones",
    tone: "grey",
  },
] as const;

export default function ApplicationsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Applications", href: "/applications" },
        ]}
      />

      {/* Hero */}
      <section className="apps-hero section-wide border-b border-stone">
        <div className="gutter-x mx-auto max-w-[80rem]">
          <div className="apps-hero-grid">
            <Reveal>
              <p className="eyebrow mb-4">Applications</p>
              <h1 className="display apps-hero-title">
                <span className="block">One Platform.</span>
                <span className="block">Multiple Omics.</span>
                <span className="block whitespace-nowrap">Many Applications.</span>
              </h1>
              <p className="lead mt-6 max-w-[36rem]">
                Metablify applies its LC/MS mass-feature analysis platform
                across metabolomics and proteomics, helping companies extract
                more usable information from complex datasets across a wide
                range of commercial applications.
              </p>
              <div className="mt-8">
                <Button href="/discuss">Discuss a Project</Button>
              </div>
            </Reveal>
            <Reveal delay={120} className="apps-hero-art">
              <RidgelineVisual />
              <p className="apps-hero-tag">
                Same data.
                <br />
                More to discover.
                <span className="apps-hero-rule" aria-hidden="true" />
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The omics */}
      <section className="section">
        <div className="grid gap-6 md:grid-cols-2">
          {omics.map((app, i) => (
            <Reveal key={app.href} delay={i * 90} className="h-full">
              <Link
                href={app.href}
                className={`omics-card omics-card--${app.tone} group`}
              >
                <div className="omics-card-copy">
                  <span className="omics-card-badge">{app.icon}</span>
                  <h2 className="omics-card-title">{app.title}</h2>
                  <p className="omics-card-body">{app.body}</p>
                  <span className="arrow-link mt-auto">
                    Explore {app.title} <span className="arrow-ne">→</span>
                  </span>
                </div>
                <div className="omics-card-media">
                  <ImagePlaceholder ratio="1/1" label={app.image} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Where Metablify can be applied */}
      <section className="section-wide band-y section-grey">
        <div className="gutter-x mx-auto max-w-[80rem]">
          <Reveal>
            <p className="eyebrow mb-4">Real-world impact</p>
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
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section">
        <Reveal>
          <div className="apps-cta">
            <div>
              <p className="eyebrow mb-4">Let’s advance your research</p>
              <h2 className="display display-lg mb-4">Discuss Your Project</h2>
              <p className="lead">
                Tell us about your LC/MS dataset and research goals. We’ll help
                you explore how Metablify can add value to your work.
              </p>
            </div>
            <div className="apps-cta-action">
              <Button href="/discuss">Discuss a Project</Button>
            </div>
          </div>
          <p className="apps-tagline">
            More signal. Greater discovery.
            <span className="apps-hero-rule" aria-hidden="true" />
          </p>
        </Reveal>
      </section>
    </>
  );
}
