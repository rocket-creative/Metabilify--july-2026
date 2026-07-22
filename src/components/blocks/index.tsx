import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { pageHref } from "@/types/content";
import type {
  ComparisonRow,
  ContentPage,
  Faq,
  Source,
  SpecRow,
} from "@/types/content";

export { CtaBlock } from "@/components/cta/CtaBlock";

function ProseBlock({
  eyebrow,
  title,
  body,
  tinted = false,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  tinted?: boolean;
}) {
  return (
    <section className={`section ${tinted ? "section-sage" : ""}`}>
      <Reveal>
        <div className="max-w-3xl">
          {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
          <h2 className="display display-md mb-5">{title}</h2>
          <p className="text-base leading-relaxed text-muted md:text-lg">{body}</p>
        </div>
      </Reveal>
    </section>
  );
}

export function ProblemBlock(props: {
  title: string;
  body: string;
  tinted?: boolean;
}) {
  return <ProseBlock eyebrow="The problem" {...props} />;
}

export function MechanismBlock(props: {
  eyebrow?: string;
  title: string;
  body: string;
  tinted?: boolean;
}) {
  return <ProseBlock eyebrow={props.eyebrow ?? "How Metablify addresses it"} {...props} />;
}

export function ComparisonTable({
  rows,
  competitor,
}: {
  rows: ComparisonRow[];
  competitor: string;
}) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
      <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-ink/20">
            <th className="py-4 pr-4 font-medium text-faint">Criterion</th>
            <th className="py-4 pr-4 font-medium text-ink">Metablify</th>
            <th className="py-4 font-medium text-ink">{competitor}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.criterion} className="border-b border-stone align-top">
              <td className="py-4 pr-4 font-medium text-ink">{row.criterion}</td>
              <td className="py-4 pr-4 text-muted">{row.metablify}</td>
              <td className="py-4 text-muted">{row.other}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-stone align-top">
              <td className="w-1/3 py-3 pr-4 font-medium text-ink">
                {row.label}
              </td>
              <td className="py-3 text-muted">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FaqBlock({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-stone">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
            <span
              className="text-base text-ink md:text-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {faq.question}
            </span>
            <span
              className="text-faint transition group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

export function EvidenceBlock({ sources }: { sources: Source[] }) {
  return (
    <div>
      <p className="eyebrow mb-4">Sources</p>
      <ul className="space-y-3">
        {sources.map((source) => (
          <li key={source.label} className="text-sm leading-relaxed text-muted">
            {source.href ? (
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="arrow-link !text-sm"
              >
                {source.label} <span className="arrow-ne">↗</span>
              </a>
            ) : (
              <span className="text-ink">{source.label}</span>
            )}
            {source.note ? (
              <span className="block text-faint">{source.note}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

const familyLabel: Record<string, string> = {
  solution: "Solution",
  compare: "Comparison",
  instrument: "Instrument",
  "analyte-class": "Analyte class",
  glossary: "Glossary",
  application: "Application",
  resource: "Resource",
};

export function RelatedGrid({ pages }: { pages: ContentPage[] }) {
  if (pages.length === 0) return null;
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {pages.map((page, i) => (
        <Reveal key={`${page.family}/${page.slug}`} delay={i * 70}>
          <Link
            href={pageHref(page)}
            className="card card-link group flex h-full flex-col"
          >
            <p className="eyebrow mb-3">{familyLabel[page.family]}</p>
            <h3
              className="mb-3 text-lg text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {page.title}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-muted">
              {page.metaDescription}
            </p>
            <span className="arrow-link mt-auto">
              Read more <span className="arrow-ne">↗</span>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
