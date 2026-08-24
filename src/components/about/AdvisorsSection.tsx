import { CopyPlaceholder } from "@/components/ImagePlaceholder";
import { Reveal } from "@/components/Reveal";
import { AboutSection } from "./AboutSection";

const slots = ["Advisor 01", "Advisor 02", "Advisor 03"];

export function AdvisorsSection() {
  return (
    <AboutSection
      tone="grey"
      eyebrow="Advisors"
      title="Guided by Leaders in Science and Industry."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {slots.map((slot, i) => (
          <Reveal key={slot} delay={i * 70}>
            <div className="about-slot">
              <p className="about-slot-index">{slot}</p>
              <CopyPlaceholder label={`Advisor name and title — ${slot}`} />
            </div>
          </Reveal>
        ))}
      </div>
    </AboutSection>
  );
}
