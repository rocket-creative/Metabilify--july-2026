/**
 * A representative mass-feature heat map: samples down, features across,
 * intensity as fill opacity. Values are deterministic so server and client
 * paint the same cells. It is a diagram, not a real readout.
 */
const ROWS = 10;
const COLS = 22;

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

const rand = seeded(41);
/** A handful of columns read as strong, consistent features across samples. */
const STRONG = new Set([2, 5, 9, 13, 17, 20]);
const CELLS: number[][] = Array.from({ length: ROWS }, () =>
  Array.from({ length: COLS }, (_, c) =>
    STRONG.has(c) ? 0.6 + rand() * 0.4 : 0.05 + rand() * 0.28,
  ),
);

export function HeatmapVisual() {
  const cell = 18;
  const gap = 3;
  const x0 = 60;
  const y0 = 28;
  const w = x0 + COLS * (cell + gap) + 12;
  const h = y0 + ROWS * (cell + gap) + 40;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="heatmap"
      fill="none"
      aria-hidden="true"
    >
      {CELLS.map((row, r) =>
        row.map((v, c) => (
          <rect
            key={`${r}-${c}`}
            x={x0 + c * (cell + gap)}
            y={y0 + r * (cell + gap)}
            width={cell}
            height={cell}
            rx="3"
            fill={v > 0.55 ? "var(--color-lime)" : "currentColor"}
            opacity={v > 0.55 ? 0.55 + (v - 0.55) : v}
          />
        )),
      )}
      {Array.from({ length: ROWS }, (_, r) => (
        <text
          key={r}
          x={x0 - 10}
          y={y0 + r * (cell + gap) + cell * 0.72}
          textAnchor="end"
          className="heatmap-label"
          fill="currentColor"
        >
          S{String(r + 1).padStart(2, "0")}
        </text>
      ))}
      <text x={x0} y={h - 12} className="heatmap-label" fill="currentColor">
        Samples × mass features · intensity
      </text>
    </svg>
  );
}
