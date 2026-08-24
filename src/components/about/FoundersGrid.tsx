import { Reveal } from "@/components/Reveal";
import { founders } from "@/lib/site";
import { AboutProse, AboutSection } from "./AboutSection";

export function FoundersGrid() {
  return (
    <AboutSection
      tone="grey"
      eyebrow="The Founders"
      title="Scientists + Technologists + Entrepreneurship"
    >
      <Reveal>
        <h3 className="about-subhead">
          Four Co-Founders. Complementary Strengths.
        </h3>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {founders.map((person, i) => (
          <Reveal key={person.slug} delay={i * 70}>
            <article className="about-founder">
              <p className="about-founder-index">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h4 className="about-founder-name">{person.name}</h4>
              <p className="about-founder-role">{person.role}</p>
              <p className="about-founder-expertise">{person.expertise}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <AboutProse
          className="mt-10"
          paragraphs={[
            "In 2024, entrepreneur Michael Bielski partnered with Ivan Baxter, Allen Hubbard, and Louis Connelly to form Metablify and build an independent company capable of bringing the technology to a broader scientific and commercial market. DTC publicly announced Metablify's launch on October 28, 2024.",
          ]}
        />
      </Reveal>
    </AboutSection>
  );
}
