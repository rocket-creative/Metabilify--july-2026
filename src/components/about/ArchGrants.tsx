import { Reveal } from "@/components/Reveal";
import { AboutProse, AboutSection } from "./AboutSection";

export function ArchGrants() {
  return (
    <AboutSection eyebrow="2024" title="Metablify Wins Arch Grants.">
      <Reveal>
        <AboutProse
          paragraphs={[
            "Soon after its formation, Metablify was selected as a 2024 Arch Grants company, joining one of St. Louis's best-known programs for high-potential startups.",
            "Metablify received the standard $75,000 Arch Grants award in equity-free, non-dilutive funding, along with access to the St. Louis entrepreneurial ecosystem.",
            "The award provided another source of early support as Metablify began building relationships and validating the technology outside the Danforth Center.",
          ]}
        />
      </Reveal>
    </AboutSection>
  );
}
