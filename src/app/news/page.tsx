import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "News",
  description:
    "Milestones and announcements from Metablify, including Arch Grants selection and recognition as a St. Louis INNO Startup to Watch.",
  alternates: { canonical: "/news" },
};

/**
 * Copy is taken from the fact-checked About draft (v0.2) so the two sources
 * cannot drift. The source records years rather than publication dates, so
 * these are labelled by year — do not invent a month or day to make the list
 * look more like a feed.
 */
const milestones = [
  {
    year: "2025",
    title: "Named a St. Louis INNO Startup to Watch",
    body: "Metablify was named a St. Louis INNO Startup to Watch as the company began working with potential partners on external validation projects, moving from proving the technology internally to demonstrating what the platform could do with collaborators and real-world applications.",
  },
  {
    year: "2024",
    title: "Selected as an Arch Grants company",
    body: "Metablify was selected as a 2024 Arch Grants company and received the standard $75,000 award in equity-free, non-dilutive funding, along with access to the St. Louis entrepreneurial ecosystem as it began validating the technology outside the Danforth Center.",
  },
];

const topics = [
  {
    title: "Platform milestones",
    body: "Advances in detection, alignment, and quantification across LC/MS data.",
  },
  {
    title: "Applications",
    body: "New work in metabolomics, proteomics, and beyond.",
  },
  {
    title: "Collaborations",
    body: "Partnerships putting Metablify to work on problems worth solving.",
  },
];

export default function NewsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "News", href: "/news" },
        ]}
      />

      <PageHero
        eyebrow="News"
        title="Updates from Metablify"
        lead="Milestones from the company so far, and the kinds of updates we will publish here."
      />

      <section className="section section-sage">
        <Reveal>
          <p className="eyebrow mb-4">Milestones</p>
          <h2 className="display display-md mb-8 max-w-2xl md:mb-12">
            Where Metablify has been recognized
          </h2>
        </Reveal>
        <ol className="news-list">
          {milestones.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <li className="news-item">
                <p className="news-year">{item.year}</p>
                <div>
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-body">{item.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {}
      <section className="section">
        <Reveal>
          <p className="eyebrow mb-4">What to expect</p>
          <h2 className="display display-md mb-8 max-w-2xl md:mb-12">
            The kinds of updates we will share
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {topics.map((topic, i) => (
            <Reveal key={topic.title} delay={i * 70}>
              <div className="card flex h-full flex-col">
                <h3
                  className="mb-3 text-lg text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {topic.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {topic.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={210}>
          <div className="mt-10 text-center">
            <Button href="/discuss">Discuss a Project</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
