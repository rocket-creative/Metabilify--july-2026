import { PageHero, SectionHeading } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import {
  ComparisonTable,
  CtaBlock,
  EvidenceBlock,
  FaqBlock,
  RelatedGrid,
  SpecTable,
} from "@/components/blocks";
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
  definedTermSchema,
  faqSchema,
} from "@/lib/seo/jsonld";
import { relatedPages } from "@/lib/content/related";
import type { ContentPage, Faq } from "@/types/content";
import { familyRoute, pageHref } from "@/types/content";

const familyLabel: Record<ContentPage["family"], string> = {
  solution: "Solutions",
  compare: "Comparison",
  instrument: "Instruments",
  "analyte-class": "Analytes",
  glossary: "Glossary",
  application: "Applications",
  resource: "Resources",
};

function Prose({ eyebrow, title, body }: { eyebrow?: string; title: string; body: string }) {
  return (
    <Reveal>
      <div className="max-w-3xl">
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h2 className="display display-md mb-5">{title}</h2>
        <p className="text-base leading-relaxed text-muted md:text-lg">{body}</p>
      </div>
    </Reveal>
  );
}

function ValueBlocks({ page }: { page: ContentPage }) {
  return (
    <section className="section section-sage">
      <Reveal>
        <SectionHeading eyebrow="What matters" title="Where this makes a difference" />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {page.uniqueValueBlocks.map((block, i) => (
          <Reveal key={block.heading} delay={i * 70}>
            <div className="card flex h-full flex-col">
              <h3
                className="mb-3 text-lg text-ink"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {block.heading}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{block.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FaqSection({ faqs }: { faqs: Faq[] }) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <section className="section">
      <Reveal>
        <SectionHeading eyebrow="Questions" title="Common questions" />
      </Reveal>
      <FaqBlock faqs={faqs} />
    </section>
  );
}

function familyBody(page: ContentPage) {
  switch (page.family) {
    case "solution":
      return (
        <>
          <section className="section">
            <Prose eyebrow="The problem" title={page.title} body={page.problem} />
          </section>
          <section className="section section-sage">
            <Prose eyebrow="Why it happens" title="Where conventional workflows produce it" body={page.cause} />
          </section>
          <section className="section">
            <Prose eyebrow="How Metablify addresses it" title="Evidence from the whole cohort" body={page.mechanism} />
          </section>
          <section className="section section-sage">
            <Prose eyebrow="What changes" title="What you see in the output" body={page.outcome} />
          </section>
          <section className="section">
            <Prose eyebrow="Honest limits" title="What this does not do" body={page.limits} />
          </section>
          <ValueBlocks page={page} />
          <FaqSection faqs={page.faqs} />
        </>
      );
    case "compare":
      return (
        <>
          <section className="section">
            <Prose eyebrow={`About ${page.competitor}`} title={`What ${page.competitor} does well`} body={page.overview} />
            <Reveal>
              <ul className="mt-6 max-w-3xl space-y-3 text-muted">
                {page.otherStrengths.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-ink" aria-hidden="true" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
          <section className="section section-sage">
            <Reveal>
              <SectionHeading eyebrow="Side by side" title="How they compare" />
            </Reveal>
            <Reveal>
              <ComparisonTable rows={page.comparison} competitor={page.competitor} />
            </Reveal>
          </section>
          <section className="section">
            <Prose eyebrow="Be honest" title={`When ${page.competitor} is the right choice`} body={page.whenOther} />
          </section>
          <section className="section section-sage">
            <Prose eyebrow="Better together" title="Where Metablify complements it" body={page.complement} />
          </section>
          <ValueBlocks page={page} />
          <FaqSection faqs={page.faqs} />
        </>
      );
    case "instrument":
      return (
        <>
          {!page.productionSupported ? (
            <section className="section-wide py-6">
              <div className="mx-auto max-w-[80rem] px-5 md:px-10">
                <p className="border-l-2 border-ink bg-neutral px-4 py-3 text-sm text-muted">
                  Roadmap page. Confirm current production support for your exact
                  model and acquisition mode with the Metablify team before
                  planning a project.
                </p>
              </div>
            </section>
          ) : null}
          <section className="section">
            <Prose eyebrow="Data characteristics" title={`${page.vendor} data`} body={page.dataCharacteristics} />
          </section>
          <section className="section section-sage">
            <Reveal>
              <SectionHeading eyebrow="File formats" title="What Metablify reads" />
            </Reveal>
            <Reveal>
              <div className="max-w-2xl">
                <SpecTable rows={page.fileFormats} />
              </div>
            </Reveal>
          </section>
          <section className="section">
            <Prose eyebrow="Where recovery matters" title="What high resolution does not solve on its own" body={page.recoveryNotes} />
          </section>
          <section className="section section-sage">
            <Prose eyebrow="Ingestion" title="How your data comes in" body={page.ingestion} />
          </section>
          <ValueBlocks page={page} />
          <FaqSection faqs={page.faqs} />
        </>
      );
    case "application":
      return (
        <>
          <section className="section">
            <Prose eyebrow="The problem" title={`The gap in ${page.field.toLowerCase()}`} body={page.problem} />
          </section>
          <section className="section section-sage">
            <Prose eyebrow="How Metablify fits" title="Recovery and alignment on data you already have" body={page.approach} />
          </section>
          <section className="section">
            <Prose eyebrow="Who this is for" title="Where the need is real" body={page.audience} />
          </section>
          <ValueBlocks page={page} />
          <FaqSection faqs={page.faqs} />
        </>
      );
    case "analyte-class":
      return (
        <>
          <section className="section">
            <Prose eyebrow="Characteristics" title={page.analyteClass} body={page.characteristics} />
          </section>
          <section className="section section-sage">
            <Prose eyebrow="Challenges" title="Where analysis strains" body={page.challenges} />
          </section>
          <section className="section">
            <Prose eyebrow="Approach" title="How Metablify addresses it" body={page.approach} />
          </section>
          <ValueBlocks page={page} />
          <FaqSection faqs={page.faqs} />
        </>
      );
    case "glossary":
      return (
        <>
          <section className="section">
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow mb-3">Definition</p>
                <p className="text-base leading-relaxed text-ink md:text-lg">{page.definition}</p>
              </div>
            </Reveal>
          </section>
          <section className="section section-sage">
            <Prose eyebrow="Worked example" title="In practice" body={page.example} />
          </section>
          <ValueBlocks page={page} />
        </>
      );
    case "resource":
      return (
        <>
          <section className="section">
            <Reveal>
              <div className="max-w-3xl">
                <p className="text-base leading-relaxed text-muted md:text-lg">{page.body}</p>
              </div>
            </Reveal>
          </section>
          <ValueBlocks page={page} />
          {page.faqs ? <FaqSection faqs={page.faqs} /> : null}
        </>
      );
    default:
      return null;
  }
}

export function ContentArticle({ page }: { page: ContentPage }) {
  const related = relatedPages(page);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: familyLabel[page.family], href: familyRoute[page.family] },
    { name: page.title, href: pageHref(page) },
  ];

  const faqs =
    "faqs" in page && Array.isArray(page.faqs) ? page.faqs : undefined;

  return (
    <>
      <JsonLd data={articleSchema(page)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {faqs && faqs.length > 0 ? <JsonLd data={faqSchema(faqs)} /> : null}
      {page.family === "glossary" ? (
        <JsonLd data={definedTermSchema(page)} />
      ) : null}

      <Breadcrumbs items={crumbs} />
      <PageHero eyebrow={familyLabel[page.family]} title={page.h1} lead={page.lead} />

      {familyBody(page)}

      <section className="section">
        <div className="max-w-3xl">
          <EvidenceBlock sources={page.sources} />
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section">
          <Reveal>
            <SectionHeading eyebrow="Keep reading" title="Related" />
          </Reveal>
          <RelatedGrid pages={related} />
        </section>
      ) : null}

      <CtaBlock cta={page.primaryCta} />
    </>
  );
}
