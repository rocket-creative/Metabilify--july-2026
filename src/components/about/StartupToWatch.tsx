import { ImagePlaceholder } from "@/components/ImagePlaceholder";
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
      <Reveal delay={80}>
        <div className="mt-8 md:w-2/3">
          <ImagePlaceholder ratio="3/2" label="St. Louis Inno Startups to Watch 2025 — award or team photo" />
        </div>
      </Reveal>
    </AboutSection>
  );
}
