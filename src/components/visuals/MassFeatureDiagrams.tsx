const LIME = "var(--color-lime)";

const panel = {
  viewBox: "0 0 240 140",
  fill: "none",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/** Deterministic scatter — random positions would desync server and client render. */
const SCATTER_NOISE: ReadonlyArray<readonly [number, number, number]> = [
  [30, 70, 0.34],
  [44, 52, 0.36],
  [56, 78, 0.3],
  [58, 40, 0.3],
  [70, 60, 0.34],
  [78, 96, 0.3],
  [88, 34, 0.3],
  [96, 66, 0.38],
  [104, 44, 0.32],
  [104, 96, 0.3],
  [140, 58, 0.3],
  [148, 78, 0.36],
  [164, 46, 0.3],
  [172, 100, 0.34],
  [186, 34, 0.32],
  [192, 60, 0.3],
  [200, 86, 0.36],
  [212, 44, 0.3],
  [216, 66, 0.32],
];

const WAVEFORM_NOISE: ReadonlyArray<readonly [number, number, number]> = [
  [22, 92, 0.3],
  [28, 108, 0.3],
  [34, 74, 0.34],
  [40, 88, 0.3],
  [46, 100, 0.32],
  [56, 70, 0.3],
  [62, 92, 0.34],
  [70, 82, 0.3],
  [76, 106, 0.32],
  [84, 74, 0.3],
  [90, 98, 0.34],
];

/** Real mass features get lost in the noise. */
export function NoiseDiagram() {
  return (
    <svg {...panel}>
      <line x1="18" y1="118" x2="18" y2="16" stroke={LIME} />
      <path d="M13 22 L18 14 L23 22" stroke={LIME} />
      <line x1="18" y1="118" x2="226" y2="118" stroke={LIME} />
      <path d="M220 113 L228 118 L220 123" stroke={LIME} />

      {SCATTER_NOISE.map(([x, y, o]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.4" fill="currentColor" stroke="none" opacity={o} />
      ))}

      <path d="M30 118 L38 88 L46 118" stroke="currentColor" opacity="0.42" />
      <path d="M55 118 L62 98 L69 118" stroke="currentColor" opacity="0.36" />
      <path d="M79 118 L86 82 L93 118" stroke="currentColor" opacity="0.48" />
      <path d="M149 118 L156 94 L163 118" stroke="currentColor" opacity="0.38" />
      <path d="M173 118 L180 76 L187 118" stroke="currentColor" opacity="0.46" />
      <path d="M199 118 L206 100 L213 118" stroke="currentColor" opacity="0.34" />

      <path d="M114 118 L124 38 L134 118" stroke={LIME} />
      <circle cx="124" cy="38" r="13" stroke={LIME} strokeDasharray="3 4" opacity="0.85" />
    </svg>
  );
}

/** Metablify amplifies what is real. */
export function AmplifyDiagram() {
  return (
    <svg {...panel}>
      <line x1="14" y1="118" x2="96" y2="118" stroke="currentColor" opacity="0.2" />
      <path
        d="M14 114 L20 102 L25 112 L31 90 L36 108 L42 97 L48 113 L53 86 L59 109 L65 99 L71 113 L77 93 L83 108 L89 101 L96 115"
        stroke="currentColor"
        opacity="0.32"
      />
      {WAVEFORM_NOISE.map(([x, y, o]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.4" fill="currentColor" stroke="none" opacity={o} />
      ))}

      <line x1="106" y1="90" x2="130" y2="90" stroke={LIME} />
      <path d="M124 84 L131 90 L124 96" stroke={LIME} />

      <line x1="144" y1="118" x2="226" y2="118" stroke={LIME} opacity="0.45" />
      <path d="M148 118 L156 78 L164 118" stroke={LIME} />
      <path d="M172 118 L184 34 L196 118" stroke={LIME} />
      <path d="M204 118 L212 84 L220 118" stroke={LIME} />
    </svg>
  );
}

const RECOVERED_PEAKS: ReadonlyArray<readonly [number, number]> = [
  [28, 24],
  [59, 12],
  [90, 32],
  [121, 16],
  [152, 28],
  [183, 20],
  [214, 34],
];

const MATRIX_COLUMNS = [84, 102, 120, 138, 156];
const MATRIX_ROWS = [103, 113, 123];
const FEED_ARROWS = [100, 120, 140];

/** Get more from every experiment. */
export function RecoveryDiagram() {
  return (
    <svg {...panel}>
      <line x1="16" y1="56" x2="224" y2="56" stroke={LIME} opacity="0.5" />
      {RECOVERED_PEAKS.map(([x, apex]) => (
        <g key={x}>
          <path d={`M${x - 9} 56 L${x} ${apex} L${x + 9} 56`} stroke={LIME} />
          <circle cx={x} cy={apex} r="2" fill={LIME} stroke="none" />
        </g>
      ))}

      <path d="M18 64 L18 70 L222 70 L222 64" stroke={LIME} opacity="0.7" />

      {FEED_ARROWS.map((x) => (
        <g key={x}>
          <line x1={x} y1="76" x2={x} y2="84" stroke={LIME} />
          <path d={`M${x - 4} 81 L${x} 87 L${x + 4} 81`} stroke={LIME} />
        </g>
      ))}

      <rect x="68" y="92" width="104" height="42" rx="6" stroke={LIME} opacity="0.55" />
      {MATRIX_ROWS.map((y) =>
        MATRIX_COLUMNS.map((x) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill={LIME} stroke="none" />
        )),
      )}
    </svg>
  );
}
