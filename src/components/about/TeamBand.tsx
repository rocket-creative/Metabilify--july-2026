import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { AboutSection } from "./AboutSection";

/**
 * The team moved to its own page (/team) so it is not buried at the bottom of
 * a fifteen-section story. This band points there.
 */
export function TeamBand() {
  return (
    <AboutSection
      tone="grey"
      eyebrow="The People Building Metablify"
      title="Built on Different Kinds of Expertise."
    >
      <Reveal>
        <p className="lead mb-8">
          Metablify brings together scientific discovery, computational
          technology, entrepreneurship, commercialization, and business
          development.
        </p>
        <Button href="/team" variant="secondary">
          Meet the Team
        </Button>
      </Reveal>
    </AboutSection>
  );
}
