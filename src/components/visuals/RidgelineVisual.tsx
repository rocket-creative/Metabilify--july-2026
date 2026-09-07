/**
 * The applications hero art: stacked chromatogram traces receding into the
 * distance, one tall lime peak in the middle. Deterministic geometry, so the
 * server and client draw the same thing.
 */
const LIME = "var(--color-lime-deep)";

function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Trace = { d: string; opacity: number; width: number };

function buildTraces(): Trace[] {
  const rand = seeded(77);
  const traces: Trace[] = [];
  const rows = 9;
  for (let r = 0; r < rows; r++) {
    // Back rows sit higher and are shifted right, like a ridgeline plot.
    const depth = r / (rows - 1);
    const base = 300 - depth * 150;
    const shift = depth * 90;
    const peaks: Array<[number, number, number]> = [];
    const count = 5 + Math.floor(rand() * 3);
    for (let i = 0; i < count; i++) {
      const x = 40 + rand() * 440;
      const h = 14 + rand() * 40;
      const w = 12 + rand() * 14;
      peaks.push([x, h, w]);
    }
    // The signature peak, same x on every row so it reads as one feature.
    peaks.push([300, 60 + (1 - depth) * 110, 16]);
    const pts: string[] = [];
    for (let x = 0; x <= 520; x += 3) {
      let y = base;
      for (const [px, ph, pw] of peaks) {
        const d = (x - px) / pw;
        y -= ph * Math.exp(-d * d);
      }
      pts.push(`${x + shift} ${y.toFixed(1)}`);
    }
    traces.push({
      d: `M${pts.join(" L")}`,
      opacity: 0.22 + (1 - depth) * 0.6,
      width: 1.25 + (1 - depth) * 1.5,
    });
  }
  return traces;
}

const TRACES = buildTraces();

export function RidgelineVisual() {
  return (
    <svg
      className="ridgeline"
      viewBox="0 0 640 320"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ridge-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="var(--color-white)" stopOpacity="1" />
          <stop offset="0.25" stopColor="var(--color-white)" stopOpacity="0" />
        </linearGradient>
        <filter id="ridge-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {TRACES.slice()
        .reverse()
        .map((t, i) => (
          <path
            key={i}
            d={t.d}
            stroke={i === TRACES.length - 1 ? LIME : "currentColor"}
            strokeWidth={t.width}
            opacity={t.opacity}
            filter={i === TRACES.length - 1 ? "url(#ridge-glow)" : undefined}
          />
        ))}
      <rect x="0" y="0" width="640" height="320" fill="url(#ridge-fade)" />
    </svg>
  );
}
