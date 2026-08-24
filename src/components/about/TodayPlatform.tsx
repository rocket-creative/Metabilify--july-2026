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
    </AboutSection>
  );
}
