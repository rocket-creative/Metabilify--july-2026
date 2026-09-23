import { Reveal } from "./Reveal";
import AmplificationGraphic from "./visuals/AmplificationGraphic";

const CAPABILITIES = [
  {
    title: "Real Mass Features Get Lost in the Noise",
    body: "Large LC/MS datasets are noisy, complex, and difficult to align across samples. Real mass features can be missed, split, or buried in background signal.",
  },
  {
    title: "Metablify Amplifies What is Real",
    body: "Metablify organizes the chaos of large, noisy datasets to extract the signal from the noise and identify mass features other workflows miss.",
  },
  {
    title: "Get More From Every Experiment",
    body: "Cleaner, higher-confidence mass-feature data reduces manual review and provides a stronger foundation for downstream metabolomics, proteomics, and discovery.",
  },
];

export function CapabilitiesBand() {
  return (
    <section className="section-forest section-wide band-y">
      <div className="gutter-x mx-auto max-w-[80rem]">
        <Reveal>
          <div className="capabilities-eyebrow mb-4">
            <p className="eyebrow">The platform</p>
            <span className="capabilities-rule" aria-hidden="true" />
          </div>
          <h2 className="display display-lg capabilities-headline mb-10 md:mb-14">
            Discovery starts with the right mass features.
          </h2>
        </Reveal>

        <Reveal>
          <AmplificationGraphic className="capabilities-hero" />
        </Reveal>

        <div className="capabilities-grid">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 90} className="capability">
              <h3 className="capability-title text-xl md:text-2xl">{cap.title}</h3>
              <p className="capability-body text-sm leading-relaxed">{cap.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
