import { Reveal } from "@/components/Reveal";
import { AboutProse, AboutSection } from "./AboutSection";

export function StartupToWatch() {
  return (
    <AboutSection
      tone="grey"
      eyebrow="2025"
      title="From Spinout to Startup to Watch."
    >
      <Reveal>
        <AboutProse
          paragraphs={[
            "In 2025, Metablify was named a St. Louis INNO Startup to Watch as the company began working with potential partners on external validation projects.",
            "The company was moving from proving the technology internally to demonstrating what the platform could do with collaborators and real-world applications.",
          ]}
        />
      </Reveal>
    </AboutSection>
  );
}
