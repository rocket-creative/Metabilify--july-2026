import { Reveal } from "@/components/Reveal";
import { AboutProse, AboutSection } from "./AboutSection";

export function BigIdeas() {
  return (
    <AboutSection
      tone="sage"
      eyebrow="From Big Idea to Company"
      title="2023 | Metablify Wins Big Ideas 3.0."
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
        <Reveal>
          <AboutProse
            paragraphs={[
              "The idea moved beyond the lab when Team Metablify from the Baxter lab won the Donald Danforth Plant Science Center's Big Ideas 3.0 competition in 2023.",
              "More than 600 people participated in the event in person and online. Team Metablify, represented by Britney Millman, Allen Hubbard, and Louis Connelly, won the audience vote and a $10,000 grant to advance the idea.",
            ]}
          />
        </Reveal>

        <Reveal delay={80}>
          <h3 className="about-subhead">
            A Big Idea Gets the Resources to Grow.
          </h3>
          <AboutProse
            paragraphs={[
              "The Big Ideas award was only the beginning.",
              "The Donald Danforth Plant Science Center subsequently supported the technology with four proof-of-concept grants totaling $200,000, providing critical resources to advance the underlying IP-protected inventions.",
            ]}
          />
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div className="about-callout">
          <p>
            Big Ideas created momentum. Danforth proof-of-concept funding helped
            turn momentum into technology.
          </p>
        </div>
      </Reveal>
    </AboutSection>
  );
}
