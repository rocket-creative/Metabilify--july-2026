import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CopyPlaceholder, ImagePlaceholder } from "@/components/ImagePlaceholder";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import {
  supporters,
  teamPage,
  teamPending,
  type Person,
  type Supporter,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The people building Metablify: the team, and the partners and investors behind the company.",
  alternates: { canonical: "/team" },
};

function PersonCard({ person }: { person: Person }) {
  return (
    <article className="team-card">
      <Link href={`/team/${person.slug}`} className="team-card-media">
        {person.photo ? (
          <Image
            className="team-photo photo"
            src={person.photo}
            alt={person.name}
            width={600}
            height={600}
            sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 90vw"
          />
        ) : (
          <ImagePlaceholder ratio="1/1" label={`Headshot — ${person.name}`} />
        )}
      </Link>
      <div className="team-card-body">
        <h3 className="team-card-name">{person.name}</h3>
        <p className="team-card-role">{person.role}</p>
        <Link href={`/team/${person.slug}`} className="arrow-link team-card-link">
          View bio <span className="arrow-ne">→</span>
        </Link>
      </div>
    </article>
  );
}

function PartnerLogo({ supporter }: { supporter: Supporter }) {
  if (!supporter.logo) {
    return <ImagePlaceholder ratio="3/2" label={`Logo — ${supporter.name}`} />;
  }
  return (
    <span className="partner-logo">
      <Image
        src={supporter.logo.src}
        alt={supporter.name}
        width={supporter.logo.width}
        height={supporter.logo.height}
        sizes="(min-width: 1024px) 18rem, 45vw"
      />
    </span>
  );
}

function hostLabel(href: string) {
  return new URL(href).hostname.replace(/^www\./, "");
}

export default function TeamPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Team", href: "/team" },
        ]}
      />

      <PageHero
        eyebrow="People & advisors"
        title="Our Team"
        lead="Scientific discovery, computational technology, entrepreneurship, and commercialization — brought together at the Danforth Center and built into a company."
      />

      {/* Team */}
      <section className="section">
        <Reveal>
          <p className="eyebrow mb-4">Metablify team</p>
          <h2 className="display display-md mb-8 md:mb-12">
            Team
          </h2>
        </Reveal>
        <div className="team-grid">
          {teamPage.map((person, i) => (
            <Reveal key={person.slug} delay={i * 70} className="h-full">
              <PersonCard person={person} />
            </Reveal>
          ))}
          {teamPending.map((label, i) => (
            <Reveal key={label} delay={(teamPage.length + i) * 70} className="h-full">
              <div className="team-card team-card--pending">
                <p className="about-slot-index">Team — pending</p>
                <CopyPlaceholder label={label} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="section">
        <Reveal>
          <p className="eyebrow mb-4">Partners</p>
          <h2 className="display display-md mb-8 md:mb-12">
            The organizations behind Metablify.
          </h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {supporters.map((s, i) => (
            <Reveal key={s.name} delay={i * 60} className="h-full">
              {s.href ? (
                <a
                  className="team-partner"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PartnerLogo supporter={s} />
                  <p className="team-partner-name">{s.name}</p>
                  <p className="team-partner-cue">
                    {hostLabel(s.href)}
                    <span aria-hidden="true"> &#8599;</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </p>
                </a>
              ) : (
                <div className="team-partner">
                  <PartnerLogo supporter={s} />
                  <p className="team-partner-name">{s.name}</p>
                  <p className="team-partner-cue">Link to be confirmed</p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
        <Reveal delay={supporters.length * 60}>
          <div className="team-card team-card--pending mt-6">
            <p className="about-slot-index">Partners — open slot</p>
            <CopyPlaceholder label="Additional investors and economic development partners — organization name, logo, and link" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
