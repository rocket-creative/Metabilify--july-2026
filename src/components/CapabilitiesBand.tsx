import { Reveal } from "./Reveal";

type Capability = {
  title: string;
  body: string;
  icon: React.ReactNode;
};

const DetectIcon = (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="32" cy="32" r="21" opacity="0.5" />
    <circle cx="32" cy="32" r="13.5" />
    <circle cx="32" cy="32" r="6" />
    <circle cx="32" cy="32" r="2" fill="currentColor" stroke="none" />
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
    title: "Detect",
    body: "Surface real mass features buried in noisy LC/MS data that legacy workflows leave behind.",
    icon: DetectIcon,
  },
  {
    title: "Amplify",
    body: "Put the law of large numbers to work, strengthening consistent signal and suppressing noise.",
    icon: AmplifyIcon,
  },
  {
    title: "Identify",
    body: "Resolve and align mass features across large sample sets for cleaner, quantifiable results.",
    icon: IdentifyIcon,
  },
];

export function CapabilitiesBand() {
  return (
    <section className="section-forest section-wide py-[clamp(4.5rem,10vw,7.5rem)]">
      <div className="mx-auto max-w-[80rem] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow mb-4">The platform</p>
          <h2 className="display display-lg mb-4 max-w-2xl">
            Built on the first principles of physics
          </h2>
          <p className="lead mb-14">
            Metablify organizes the chaos of large, noisy datasets to extract
            signal from noise and reveal mass features other workflows miss.
          </p>
        </Reveal>

        <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
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
