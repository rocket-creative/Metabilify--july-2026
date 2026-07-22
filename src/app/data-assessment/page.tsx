import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { DataAssessmentForm } from "@/components/cta/DataAssessmentForm";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { buildBasicMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildBasicMetadata({
  title: "Send Us a Dataset | Metablify",
  description:
    "Send a limited set of your existing LC/MS data and see how many additional real mass features Metablify recovers against your current workflow output.",
  path: "/data-assessment",
  index: false,
});

const whatToSend = [
  {
    title: "A representative subset",
    body: "A slice of a study you have already processed works best, because it lets us compare recovery against your current output.",
  },
  {
    title: "Your current results",
    body: "Include the feature table or output from your existing workflow so the comparison is against your real baseline, not a generic one.",
  },
  {
    title: "Context",
    body: "Instrument, matrix, and what you are trying to find. A few lines is enough to scope the assessment correctly.",
  },
];

const getBack = [
  {
    title: "Recovery against your baseline",
    body: "How many additional reproducible mass features were recovered compared with your current workflow on the same data.",
  },
  {
    title: "Alignment at cohort scale",
    body: "How features aligned across the subset, including matches that fixed apparent missing values.",
  },
  {
    title: "An honest read",
    body: "Where the difference is meaningful for your study and where it is not. If the gain is small, we will say so.",
  },
];

export default function DataAssessmentPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Send us a dataset", href: "/data-assessment" },
        ])}
      />

      <PageHero
        eyebrow="Dataset assessment"
        title="Prove it on your own data"
        lead="Assertions are easy. Send a limited set of your existing LC/MS data and see how many additional real mass features Metablify recovers against your current workflow output."
      />

      {}
      <section className="section section-sage">
        <Reveal>
          <div className="border-l-4 border-ink bg-white p-8 md:p-10">
            <p className="eyebrow mb-3">Confidentiality</p>
            <p
              className="text-xl leading-relaxed text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your data is yours. We handle assessment data under a
              confidentiality agreement, use it only to run your assessment, and
              return or delete it on request. We are glad to sign your agreement
              before you send anything.
            </p>
          </div>
        </Reveal>
      </section>

      {}
      <section className="section">
        <Reveal>
          <SectionHeading eyebrow="What to send" title="Three things, nothing heavy" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {whatToSend.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="card flex h-full flex-col">
                <h3
                  className="mb-3 text-lg text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {}
      <section className="section section-sage">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="Formats and vendors"
                title="Work from the files you already have"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <p className="mb-6 text-muted leading-relaxed">
                Metablify is designed to work from open high resolution formats
                such as mzML produced by standard conversion of vendor files, so
                you do not need to change how you acquire data. Confirm support
                for your exact instrument and acquisition mode with us before you
                send, since supported formats are validated per project.
              </p>
              <ul className="space-y-3 text-muted">
                {[
                  "High resolution LC/MS data, converted to an open format",
                  "Vendor files from major platforms, confirmed per project",
                  "A subset is enough for an assessment, not a whole study",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-ink" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {}
      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="What you get back"
            title="A comparison on your data, not a claim"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {getBack.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="card flex h-full flex-col">
                <h3
                  className="mb-3 text-lg text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {}
      <section className="section section-sage">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading eyebrow="Request" title="Start an assessment" />
              <p className="mb-8 text-muted leading-relaxed">
                Turnaround depends on the size and format of what you send. We
                will confirm timing and terms when we reply, before you commit
                anything.
              </p>
              <div className="border-t border-stone pt-6">
                <p className="eyebrow mb-3">Why trust the result</p>
                <p className="text-sm leading-relaxed text-muted">
                  Metablify was developed at the {siteConfig.origin} to process
                  large LC/MS cohorts. The assessment runs on your own data, so
                  you judge the result, not our description of it.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <DataAssessmentForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
