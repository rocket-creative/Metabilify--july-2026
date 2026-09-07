import { Reveal } from "@/components/Reveal";
import { AboutProse, AboutSection } from "./AboutSection";

export function CapitalBand() {
  return (
    <AboutSection
      tone="forest"
      eyebrow="Capital to Build"
      title="Backed From the Beginning."
    >
      <Reveal>
        <AboutProse
          paragraphs={[
            "DTC did more than help organize the spinout. It invested capital alongside outside investors to help Metablify move from technology development toward commercialization.",
            "Danforth Technology Company and QRM Capital were announced as Metablify's initial investors.",
            "Together with the Big Ideas award and Danforth proof-of-concept funding, that support created a continuum from early scientific exploration to company formation.",
          ]}
        />
      </Reveal>
    </AboutSection>
  );
}
