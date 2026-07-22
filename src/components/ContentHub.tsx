import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBlock } from "@/components/blocks";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import type { Cta } from "@/types/content";
import { pageHref } from "@/types/content";
import type { ContentPage } from "@/types/content";

export function ContentHub({
  eyebrow,
  title,
  lead,
  pages,
  crumbs,
  cta,
  emptyNote,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  pages: ContentPage[];
  crumbs: { name: string; href: string }[];
  cta: Cta;
  emptyNote?: string;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />

      <section className="section">
        {pages.length === 0 ? (
          <Reveal>
            <div className="border border-dashed border-stone bg-neutral/50 p-10 text-center md:p-16">
              <p className="eyebrow mb-4">In progress</p>
              <p className="mx-auto max-w-md text-muted leading-relaxed">
                {emptyNote ?? "Pages in this section are being prepared."}
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((page, i) => (
              <Reveal key={`${page.family}/${page.slug}`} delay={i * 60}>
                <Link
                  href={pageHref(page)}
                  className="card card-link group flex h-full flex-col"
                >
                  <h2
                    className="mb-3 text-xl text-ink"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {page.title}
                  </h2>
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
        )}
      </section>

      <CtaBlock cta={cta} />
    </>
  );
}
