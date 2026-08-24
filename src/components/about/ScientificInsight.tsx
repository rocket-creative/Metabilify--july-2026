import { Reveal } from "@/components/Reveal";
import { AboutProse, AboutSection } from "./AboutSection";

export function ScientificInsight() {
  return (
    <AboutSection
      eyebrow="The Scientific Insight"
      title="What If the Dataset Could Help Reveal the Signal?"
    >
      <Reveal>
        <AboutProse
          paragraphs={[
            "Allen Hubbard, Louis Connelly, Ivan Baxter, and colleagues began developing a different way to approach the problem.",
            "Instead of treating every sample as an isolated analysis, the emerging approach used information across samples to reinforce consistent signals and distinguish them from background noise.",
          ]}
        />
      </Reveal>

      <Reveal delay={80}>
        <figure className="about-quote my-[clamp(2rem,4vw,3rem)]">
          <blockquote>
            <p>
              Hubbard described the concept as needing something like{" "}
              <span className="about-quote-highlight">
                &ldquo;PCR for metabolites&rdquo;
              </span>
              : not physically amplifying molecules, but using information
              across the dataset to improve the signal-to-noise relationship
              computationally.
            </p>
          </blockquote>
        </figure>
      </Reveal>

      <Reveal delay={120}>
        <AboutProse
          paragraphs={[
            "That insight became the foundation for the Metablify platform.",
          ]}
          emphasiseLast
        />
      </Reveal>
    </AboutSection>
  );
}
