import type { Metadata } from "next";
import { DiscussForm } from "@/components/DiscussForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Discuss a Project",
  description:
    "Bring us your samples, LC/MS data, or workflow challenge. We will help determine the right path forward.",
  alternates: { canonical: "/discuss" },
};

export default function DiscussPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Discuss a Project", href: "/discuss" },
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title="Discuss your project"
        lead="Bring us your samples, LC/MS data, or workflow challenge. We will help determine the right path forward."
      />

      <section className="section">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2
                className="mb-4 text-2xl text-ink"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What to include
              </h2>
              <ul className="mb-10 space-y-3 text-muted">
                {[
                  "Scientific objective and desired outputs",
                  "Sample types and approximate scale",
                  "Existing LC/MS data or instrument context",
                  "Whether you need services, platform work, or collaboration",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2 h-2 w-2 shrink-0 bg-ink"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-stone pt-8">
                <p className="eyebrow mb-3">Prefer email?</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="arrow-link text-base"
                >
                  {siteConfig.email} <span className="arrow-ne">↗</span>
                </a>
                <p className="mt-6 text-sm leading-relaxed text-muted">
                  Every message reaches the Metablify team directly. We read each
                  one and reply with the right path forward.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="relative lg:col-span-7">
            <Reveal delay={80}>
              <DiscussForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
