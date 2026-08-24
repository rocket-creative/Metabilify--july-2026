import {
  CopyPlaceholder,
  ImagePlaceholder,
} from "@/components/ImagePlaceholder";
import { Reveal } from "@/components/Reveal";
import { managementTeam, scientificFounders, type Person } from "@/lib/site";
import { AboutProse, AboutSection } from "./AboutSection";

function PersonCard({ person }: { person: Person }) {
  return (
    <article className="about-person">
      <div className="about-person-media">
        <ImagePlaceholder ratio="1/1" label={`Headshot — ${person.name}`} />
      </div>
      <div>
        <h4 className="about-person-name">{person.name}</h4>
        <p className="about-person-role">{person.role}</p>
        {person.credentials ? (
          <p className="about-person-creds">{person.credentials}</p>
        ) : null}
      </div>
      <CopyPlaceholder label={`Short bio — ${person.name}`} />
    </article>
  );
}

export function PeopleSection() {
  return (
    <AboutSection
      eyebrow="The People Building Metablify"
      title="Built on Different Kinds of Expertise."
    >
      <Reveal>
        <AboutProse
          paragraphs={[
            "Metablify brings together scientific discovery, computational technology, entrepreneurship, commercialization, and business development.",
          ]}
        />
      </Reveal>

      <div className="mt-10 md:mt-14">
        <Reveal>
          <p className="about-group-label">Management Team</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {managementTeam.map((person, i) => (
            <Reveal key={person.slug} delay={i * 70}>
              <PersonCard person={person} />
            </Reveal>
          ))}
          <Reveal delay={managementTeam.length * 70}>
            <div className="about-slot">
              <p className="about-slot-index">Management — open slot</p>
              <CopyPlaceholder label="Additional management team member — name, title and short bio" />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-10 md:mt-14">
        <Reveal>
          <p className="about-group-label">Scientific &amp; Technical Founders</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {scientificFounders.map((person, i) => (
            <Reveal key={person.slug} delay={i * 70}>
              <PersonCard person={person} />
            </Reveal>
          ))}
        </div>
      </div>
    </AboutSection>
  );
}
