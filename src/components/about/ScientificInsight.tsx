import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { AboutProse, AboutSection } from "./AboutSection";

export function ScientificInsight() {
  return (
    <AboutSection
      tone="grey"
      eyebrow="The Scientific Insight"
      title="Finding and amplifying real mass features."
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <Reveal className="lg:col-span-7">
          <AboutProse
            paragraphs={[
              "Ivan Baxter, Allen Hubbard, and Louis Connelly developed a different approach to LC/MS analysis. Instead of treating each sample in isolation, they used information across the dataset and algorithms grounded in the first principles of physics to distinguish consistent mass features from background noise. That work became the foundation of Metablify’s platform.",
            ]}
            emphasiseLast
          />
        </Reveal>
        <Reveal delay={80} className="lg:col-span-5">
          <Photo
            shape="card"
            src="/images/team-whiteboard.jpg"
            alt="Ivan Baxter, Louis Connelly, and Allen Hubbard working through a chromatogram at a whiteboard"
            width={1800}
            height={1202}
            sizes="(min-width: 1024px) 32rem, 90vw"
          />
        </Reveal>
      </div>
    </AboutSection>
  );
}
