import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { AboutProse, AboutSection } from "./AboutSection";

export function ClosingBand() {
  return (
    <AboutSection
      tone="forest"
      eyebrow="Built on Science. Driven by Impact."
      title="Built at Danforth. Built for What Comes Next."
    >
      <Reveal>
        <AboutProse
          paragraphs={[
            "Metablify began because researchers faced a problem that existing tools could not solve.",
            "Federal research investment helped create an environment for ambitious, data-intensive science. The Donald Danforth Plant Science Center provided the people, infrastructure, and scientific setting in which the underlying challenge and technology emerged. Big Ideas gave the concept an early push toward translation. Four Danforth proof-of-concept grants totaling $200,000 helped advance the technology. Danforth Technology Company then led the spinout effort, bringing together scientists, entrepreneurial leadership, investors, capital, and company-building expertise. Metablify's founders turned those pieces into a company.",
            "Today, Metablify is building on that foundation to help scientists see more in their LC/MS data.",
          ]}
          emphasiseLast
        />
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-10">
          <Button href="/discuss" variant="on-green">
            Discuss Your Project
          </Button>
        </div>
      </Reveal>
    </AboutSection>
  );
}
