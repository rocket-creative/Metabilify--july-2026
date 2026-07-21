import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import type { Cta, CtaTier } from "@/types/content";

/**
 * Three tier CTA ladder. Placement is driven by page intent:
 *  - benchmark  low commitment, informational pages
 *  - assessment mid, solution and comparison pages, sends a dataset
 *  - discuss    high, application and services pages
 *
 * Every CTA sits beside one concrete proof element, because a bare ask converts
 * worse than an ask with evidence next to it.
 */
export const CTA_TIERS: Record<
  CtaTier,
  { label: string; href: string; heading: string; sub: string }
> = {
  benchmark: {
    label: "See how an assessment works",
    href: "/data-assessment",
    heading: "Want to see the method on real data?",
    sub: "Read what a dataset assessment involves and what you get back.",
  },
  assessment: {
    label: "Send a dataset for assessment",
    href: "/data-assessment",
    heading: "Prove it on your own data",
    sub: "Send a limited set of your existing LC/MS data and see how many additional real mass features are recovered against your current output.",
  },
  discuss: {
    label: "Discuss a project",
    href: "/discuss",
    heading: "Ready to talk about your study?",
    sub: "Bring us your samples, LC/MS data, or workflow challenge and we will map the right path forward.",
  },
};

export function CtaBlock({ cta }: { cta: Cta }) {
  const tier = CTA_TIERS[cta.tier];
  const label = cta.label ?? tier.label;
  const href = cta.href ?? tier.href;

  return (
    <section className="section-forest section-wide py-[clamp(3.5rem,8vw,6rem)]">
      <div className="mx-auto max-w-[80rem] px-5 md:px-10">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="display display-md mb-4 text-white">
                {tier.heading}
              </h2>
              <p className="lead !max-w-2xl !text-white/75">{tier.sub}</p>
              {cta.proof ? (
                <p className="mt-6 border-l-2 border-lime pl-4 text-sm text-white/85">
                  {cta.proof}
                </p>
              ) : null}
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Button href={href} variant="on-green">
                {label}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
