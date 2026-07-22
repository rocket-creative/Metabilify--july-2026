import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "News",
  description: "Updates and announcements from Metablify.",
  alternates: { canonical: "/news" },
};

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
        lead="Announcements and milestones will appear here as they are published."
      />

      <section className="section section-sage">
        <Reveal>
          <div className="border border-dashed border-stone bg-white p-10 text-center md:p-16">
            <p className="eyebrow mb-4">Coming soon</p>
            <p className="mx-auto mb-8 max-w-md text-muted leading-relaxed">
              Check back for news from the Metablify team. In the meantime, reach
              out to discuss a project.
            </p>
            <Button href="/discuss">Discuss a Project</Button>
          </div>
        </Reveal>
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
      </section>
    </>
  );
}
