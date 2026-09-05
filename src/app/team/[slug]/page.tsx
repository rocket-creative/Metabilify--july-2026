import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyPlaceholder, ImagePlaceholder } from "@/components/ImagePlaceholder";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { founders } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return founders.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = founders.find((p) => p.slug === slug);
  if (!person) return {};
  return {
    title: `${person.name} — ${person.role}`,
    description: `${person.name}, ${person.role} at Metablify. ${person.expertise}.`,
    alternates: { canonical: `/team/${person.slug}` },
  };
}

/**
 * One page per person. The bio is a placeholder until written. The "In the
 * news" list is where articles, talks, and publications go so a search for
 * the person's earlier work can land here and find Metablify.
 */
export default async function TeamMemberPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const person = founders.find((p) => p.slug === slug);
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
                <Image
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
              <CopyPlaceholder
                className="mt-8"
                label={`Full bio — ${person.name}: background, role at Metablify, prior work`}
              />

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
