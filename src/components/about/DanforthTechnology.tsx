import { Reveal } from "@/components/Reveal";
import { AboutProse, AboutSection } from "./AboutSection";

export function DanforthTechnology() {
  return (
    <AboutSection
      eyebrow="From Discovery to Startup"
      title="Danforth Technology Company Took the Next Step."
    >
      <Reveal>
        <AboutProse
          paragraphs={[
            "Scientific breakthroughs do not become companies on their own.",
            "Danforth Technology Company was created to help move promising technologies developed by Danforth Center scientists from discovery toward commercial impact by bringing together scientists, entrepreneurs, investors, management, and capital.",
            "DTC recognized the commercial potential of the technology emerging from the Baxter lab and led the effort to build a company around it.",
            "DTC helped bring experienced entrepreneurial leadership into the effort, connecting Michael Bielski with the scientific founders and supporting the transition from research innovation to independent company.",
          ]}
        />
      </Reveal>
    </AboutSection>
  );
}
