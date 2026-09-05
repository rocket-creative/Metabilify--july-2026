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

      {/* The Big Ideas 3.0 pitch, cued to Metablify's slot. youtube-nocookie
          keeps tracking cookies off the page; ads are YouTube's call, not ours. */}
      <Reveal delay={100}>
        <div className="mt-10 md:mt-14">
          <div className="about-video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/2VPGF2xUvq4?start=2810&rel=0&modestbranding=1"
              title="Metablify at the Danforth Center Big Ideas 3.0 competition"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <p className="about-video-caption">
            Big Ideas 3.0 · Metablify pitch begins at 46:50
          </p>
        </div>
      </Reveal>

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
