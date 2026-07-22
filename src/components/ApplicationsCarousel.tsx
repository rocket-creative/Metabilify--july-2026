import Link from "next/link";
import { Reveal } from "./Reveal";

type Application = {
  index: string;
  href: string;
  name: string;
  body: string;
  points: string[];
  link: string;
  visual: React.ReactNode;
};

const APPLICATIONS: Application[] = [
  {
    index: "01",
    href: "/applications/metabolomics",
    name: "Metabolomics",
    body: "Turn complex untargeted LC/MS datasets into cleaner, aligned, and quantified mass feature results.",
    points: [
      "Recover low abundance features",
      "Align features across large cohorts",
      "Quantify with higher confidence",
    ],
    link: "Explore Metabolomics",
    visual: <MetaboliteField />,
  },
  {
    index: "02",
    href: "/applications/proteomics",
    name: "Proteomics",
    body: "Reveal and quantify peptide mass features across complex LC/MS datasets, with a workflow built for scale, alignment, and signal clarity.",
    points: [
      "Surface peptide mass features",
      "Stabilize alignment at scale",
      "Sharpen signal from the noise",
    ],
    link: "Explore Proteomics",
    visual: <PeptideChain />,
  },
];

export function ApplicationsCarousel() {
  return (
    <section className="wash-botanical section-wide band-y">
      <div className="gutter-x mx-auto max-w-[80rem]">
        <Reveal>
          <div className="mb-10 max-w-2xl md:mb-14">
            <p className="eyebrow mb-4">Applications</p>
            <h2 className="display display-lg mb-6">
              One Metablify platform. Multiple omics.
            </h2>
            <p className="lead">
              Metablify analyzes the mass feature layer shared across LC/MS
              workflows, with leading applications in metabolomics and
              proteomics.
            </p>
          </div>
        </Reveal>

        <div className="applications-grid">
          {APPLICATIONS.map((app, i) => (
            <Reveal key={app.href} delay={i * 120} className="h-full">
              <Link href={app.href} className="card card-link app-card group">
                <div className="app-card-media">{app.visual}</div>
                <div className="app-card-body">
                  <span className="app-card-index">{app.index}</span>
                  <h3
                    className="mb-4 text-2xl text-ink md:text-3xl"
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {app.name}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-muted">
                    {app.body}
                  </p>
                  <ul className="app-card-points">
                    {app.points.map((point) => (
                      <li key={point} className="app-card-point">
                        <span className="dot" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="arrow-link mt-auto">
                    {app.link} <span className="arrow-ne">↗</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetaboliteField() {
  const points: [number, number, number, "f" | "i" | "l"][] = [
    [40, 60, 3, "f"],
    [70, 120, 4, "f"],
    [95, 45, 2.5, "f"],
    [120, 150, 3, "f"],
    [150, 90, 5, "i"],
    [175, 135, 3, "f"],
    [190, 55, 3.5, "f"],
    [210, 110, 4.5, "l"],
    [240, 75, 3, "f"],
    [255, 160, 2.5, "f"],
    [275, 100, 5, "i"],
    [300, 140, 3, "f"],
    [320, 60, 3.5, "f"],
    [345, 120, 4.5, "l"],
    [360, 92, 3, "f"],
    [130, 38, 2.5, "f"],
    [205, 178, 3, "f"],
    [285, 44, 3, "f"],
    [58, 176, 2.5, "f"],
    [332, 178, 3, "f"],
    [158, 52, 3, "i"],
    [95, 96, 3, "f"],
  ];

  const fill = (tone: "f" | "i" | "l") =>
    tone === "i"
      ? "var(--color-ink)"
      : tone === "l"
        ? "var(--color-lime)"
        : "#b6b6b6";

  return (
    <svg
      viewBox="0 0 400 225"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
    >
      {points.map(([x, y, r, tone], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill={fill(tone)}
          opacity={tone === "f" ? 0.65 : 1}
        />
      ))}
      <text
        x="24"
        y="30"
        fill="var(--color-faint)"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="2"
      >
        MASS FEATURES
      </text>
    </svg>
  );
}

function PeptideChain() {
  const chain: [number, number][] = [
    [36, 150],
    [76, 108],
    [116, 142],
    [156, 96],
    [196, 132],
    [236, 88],
    [276, 126],
    [316, 84],
    [360, 118],
  ];
  const ghost: [number, number][] = chain.map(([x, y]) => [x + 6, y + 40]);
  const highlight = new Set([3, 6]);
  const toPoints = (pts: [number, number][]) =>
    pts.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <svg
      viewBox="0 0 400 225"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
    >
      <polyline
        points={toPoints(ghost)}
        fill="none"
        stroke="#c4c4c4"
        strokeWidth="2"
        strokeOpacity="0.55"
      />
      {ghost.map(([x, y], i) => (
        <circle key={`g-${i}`} cx={x} cy={y} r={3.5} fill="#c4c4c4" />
      ))}

      <polyline
        points={toPoints(chain)}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2"
        strokeOpacity="0.4"
      />
      {chain.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={highlight.has(i) ? 7 : 5}
          fill={highlight.has(i) ? "var(--color-lime)" : "#ffffff"}
          stroke="var(--color-ink)"
          strokeWidth="2"
        />
      ))}
      <text
        x="24"
        y="30"
        fill="var(--color-faint)"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="2"
      >
        PEPTIDE FEATURES
      </text>
    </svg>
  );
}
