import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { PlatformPipeline } from "@/components/PlatformPipeline";
import { Reveal } from "@/components/Reveal";
import { FeatureCompare } from "@/components/FeatureCompare";
import { ScaleBand } from "@/components/ScaleBand";

export const metadata: Metadata = {
  title: "The Metablify Technology",
  description:
    "First principles and AI find and amplify real mass features. Metablify aligns, pools, and amplifies consistent signal across complex LC/MS datasets.",
  alternates: { canonical: "/technology" },
};

/**
 * Structure per the 9/7 review: hero, Align → Pool → Amplify → output, the
 * Venn diagram, then a built-for-scale band in place of the omics cards. The
 * page was /platform until the CEO renamed it; /platform redirects here.
 */
export default function TechnologyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Technology", href: "/technology" },
        ]}
      />

      <PageHero
        eyebrow="The Metablify Technology"
        title="First Principles and AI Find and Amplify Real Mass Features"
        lead="Metablify combines the first principles of physics with AI to align, pool, and amplify consistent signal across complex LC/MS datasets, so real mass features can be detected with confidence amid the noise."
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/discuss">Discuss a Project</Button>
          <Button href="/applications" variant="secondary">
            Explore Applications
          </Button>
        </div>
      </PageHero>

      <PlatformPipeline />

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="The difference"
            title="See more of what is real in your data"
            lead="Legacy workflows may recover only a subset of real mass features. Metablify reveals a broader set from the same LC/MS dataset."
          />
        </Reveal>
        <FeatureCompare />
      </section>

      <ScaleBand />

      <section className="section-forest section-wide band-y text-center">
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
