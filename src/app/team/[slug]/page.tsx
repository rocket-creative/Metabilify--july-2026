import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { notFound } from "next/navigation";
import { CopyPlaceholder, ImagePlaceholder } from "@/components/ImagePlaceholder";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { teamPage, type Person } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return teamPage.map((p) => ({ slug: p.slug }));
}

function findPerson(slug: string): Person | undefined {
  return teamPage.find((p) => p.slug === slug);
}

function descriptionFor(person: Person): string {
  const lead = person.bio?.[0];
  if (!lead) {
    return `${person.name}, ${person.role} at Metablify. ${person.expertise}.`;
  }
  const sentenceEnd = lead.indexOf(". ");
  return sentenceEnd === -1 ? lead : lead.slice(0, sentenceEnd + 1);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = findPerson(slug);
  if (!person) return {};
  return {
    title: `${person.name} — ${person.role}`,
    description: descriptionFor(person),
    alternates: { canonical: `/team/${person.slug}` },
  };
}

/**
 * One page per person. The "In the news" list is where articles, talks, and
 * publications go so a search for the person's earlier work can land here
 * and find Metablify.
 */
export default async function TeamMemberPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const person = findPerson(slug);
  if (!person) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Team", href: "/team" },
          { name: person.name, href: `/team/${person.slug}` },
        ]}
      />

      <section className="section">
        <Reveal>
          <Link href="/team" className="arrow-link mb-8 inline-flex">
            <span className="arrow-ne" aria-hidden="true">←</span> All team
          </Link>
        </Reveal>
        <div className="team-bio">
          <Reveal>
            <div className="team-bio-media">
              {person.photo ? (
                <Photo
                  shape="circle"
                  className="team-photo"
                  src={person.photo}
                  alt={person.name}
                  width={600}
                  height={600}
                  sizes="16rem"
                  priority
                />
              ) : (
                <ImagePlaceholder ratio="1/1" label={`Headshot — ${person.name}`} />
              )}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="team-bio-body">
              <p className="eyebrow mb-4">{person.role}</p>
              <h1 className="display display-lg mb-4">{person.name}</h1>
              {person.credentials ? (
                <p className="team-bio-creds">{person.credentials}</p>
              ) : null}
              <p className="team-bio-expertise">{person.expertise}</p>
              {person.bio ? (
                <div className="team-bio-copy">
                  {person.bio.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <CopyPlaceholder
                  className="mt-8"
                  label={`Full bio — ${person.name}: background, role at Metablify, prior work`}
                />
              )}

              <div className="team-bio-news">
                <p className="about-group-label">In the news, talks &amp; publications</p>
                <CopyPlaceholder label={`Articles, talks, and publications featuring ${person.name} — title, outlet, date, link`} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
