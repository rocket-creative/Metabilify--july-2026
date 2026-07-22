import { Reveal } from "./Reveal";

type Capability = {
  title: string;
  body: string;
  icon: React.ReactNode;
};

const NoiseIcon = (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="32" cy="32" r="22" opacity="0.35" />
    <circle cx="32" cy="32" r="12" opacity="0.55" />
    <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" stroke="none" opacity="0.5" />
    <circle cx="46" cy="18" r="1.5" fill="currentColor" stroke="none" opacity="0.4" />
    <circle cx="48" cy="42" r="1.5" fill="currentColor" stroke="none" opacity="0.5" />
    <circle cx="16" cy="44" r="1.5" fill="currentColor" stroke="none" opacity="0.4" />
  </svg>
);

const AmplifyIcon = (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="16" cy="32" r="2.5" fill="currentColor" stroke="none" />
    <path d="M24 20 A16 16 0 0 1 24 44" />
    <path d="M32 13 A24 24 0 0 1 32 51" opacity="0.75" />
    <path d="M40 7 A32 32 0 0 1 40 57" opacity="0.5" />
  </svg>
);

const IdentifyIcon = (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <polygon points="32,9 51,20 51,42 32,53 13,42 13,20" opacity="0.6" />
    <line x1="32" y1="9" x2="32" y2="31" opacity="0.5" />
    <line x1="32" y1="31" x2="13" y2="42" opacity="0.5" />
    <line x1="32" y1="31" x2="51" y2="42" opacity="0.5" />
    <circle cx="32" cy="9" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="13" cy="42" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="51" cy="42" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="32" cy="31" r="4" fill="currentColor" stroke="none" />
  </svg>
);

const CAPABILITIES: Capability[] = [
  {
    title: "Real Mass Features Get Lost in the Noise",
    body: "Large LC/MS datasets are noisy, complex, and difficult to align across samples. Real mass features can be missed, split, or buried in background signal. Metablify organizes the chaos of large, noisy datasets to extract the signal from the noise and identify mass features other workflows miss.",
    icon: NoiseIcon,
  },
  {
    title: "Metablify Amplifies What is Real",
    body: "Cleaner, higher-confidence mass-feature data reduces manual review and provides a stronger foundation for downstream metabolomics, proteomics, and discovery.",
    icon: AmplifyIcon,
  },
  {
    title: "Get More From Every Experiment",
    body: "Don’t leave real mass features in the noise. Legacy workflows may recover only a subset of detectable mass features. Metablify reveals a broader set of real mass features across LC/MS datasets.",
    icon: IdentifyIcon,
  },
];

export function CapabilitiesBand() {
  return (
    <section className="section-forest section-wide band-y">
      <div className="gutter-x mx-auto max-w-[80rem]">
        <Reveal>
          <p className="eyebrow mb-4">The platform</p>
          <h2 className="display display-lg mb-8 max-w-2xl md:mb-14">
            Discovery starts with the right mass features.
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 90}>
              <div className="capability">
                <div className="capability-icon mb-6">{cap.icon}</div>
                <h3 className="capability-title mb-3 text-xl md:text-2xl">
                  {cap.title}
                </h3>
                <p className="capability-body text-sm leading-relaxed md:text-base">
                  {cap.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
