import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Reveal } from "@/components/Reveal";
import { AboutProse, AboutSection } from "./AboutSection";

export function TodayPlatform() {
  return (
    <AboutSection
      tone="forest"
      eyebrow="Today"
      title="One Platform. Expanding Opportunity."
    >
      <Reveal>
        <AboutProse
          paragraphs={[
            "What began as a solution to a difficult metabolomics data-analysis problem is now being advanced as a broader LC/MS mass-feature analysis platform. Metabolomics is the most mature application today, with proteomics an important next area of development for the company.",
          ]}
        />
      </Reveal>
      <Reveal delay={80}>
        <div className="mt-8 md:w-2/3">
          <ImagePlaceholder
            ratio="16/9"
            tone="dark"
            label="Metablify team at work — lab or data workspace, candid"
          />
        </div>
      </Reveal>
    </AboutSection>
  );
}
