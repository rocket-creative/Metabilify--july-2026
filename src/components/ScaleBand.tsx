import { Reveal } from "./Reveal";

/**
 * "Built for scale" on the technology page. Copy is the CEO's from the 9/7
 * deck. The 3,800-vs-400 figures are the same ones the About page cites.
 */
const PILLARS = [
  {
    title: "Large Datasets",
    body: "Designed to work across large numbers of LC/MS samples as experiments scale.",
  },
  {
    title: "Complex Signal",
    body: "Built for datasets where real mass features can be difficult to distinguish from background noise and variation.",
  },
  {
    title: "Dataset-Wide Analysis",
    body: "Uses information across samples to create a clearer view of the experiment as a whole.",
  },
] as const;

function ScaleTrace() {
  return (
    <svg
      className="scale-trace"
      viewBox="0 0 240 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M24 16 V118 H224" opacity="0.4" />
      <g opacity="0.35">
        <path d="M32 118 v-5" />
        <path d="M62 118 v-4" />
        <path d="M88 118 v-6" />
        <path d="M110 118 v-4" />
        <path d="M136 118 v-5" />
        <path d="M162 118 v-4" />
        <path d="M192 118 v-6" />
        <path d="M216 118 v-4" />
      </g>
      <path d="M24 118 L40 118 C44 118 44 78 48 78 C52 78 52 118 56 118 L66 118 C70 118 70 44 74 44 C78 44 78 118 82 118 L88 118 C92 118 92 92 96 92 C100 92 100 118 104 118 L114 118 C118 118 118 30 122 30 C126 30 126 118 130 118 L140 118 C144 118 144 84 148 84 C152 84 152 118 156 118 L168 118 C172 118 172 60 176 60 C180 60 180 118 184 118 L194 118 C198 118 198 96 202 96 C206 96 206 118 210 118 L224 118" />
      <circle cx="48" cy="78" r="2" />
      <circle cx="74" cy="44" r="2" />
      <circle cx="122" cy="30" r="2" />
      <circle cx="176" cy="60" r="2" />
    </svg>
  );
}

export function ScaleBand() {
  return (
    <section className="section-wide band-y section-grey">
      <div className="gutter-x mx-auto max-w-[80rem]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-4">Built for scale</p>
              <h2 className="display display-lg mb-6 max-w-2xl">
                Built for Complex, Large-Scale LC/MS Data
              </h2>
              <p className="lead">
                LC/MS experiments are generating larger, noisier, and more
                complex datasets. Metablify was built to analyze these datasets
                as a whole, helping researchers work across more samples without
                losing sight of the signals that matter.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={80}>
              <div className="about-stats">
                <div>
                  <p className="about-stat-figure">~3,800</p>
                  <p className="about-stat-label">
                    Samples in one untargeted metabolomics experiment
                  </p>
                </div>
                <p className="about-stat-divider">versus</p>
                <div>
                  <p className="about-stat-figure about-stat-figure--muted">
                    ~400
                  </p>
                  <p className="about-stat-label">
                    Reported ceiling of existing software
                  </p>
                </div>
              </div>
              <ScaleTrace />
            </Reveal>
          </div>
        </div>

        <Reveal>
          <h3 className="display display-md mt-14 mb-8 md:mt-20 md:mb-10">
            Big Data Creates Bigger Analytical Challenges
          </h3>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="h-full">
              <div className="card flex h-full flex-col">
                <h4
                  className="mb-3 text-xl text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
