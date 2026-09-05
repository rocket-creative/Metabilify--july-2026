/**
 * The three platform diagrams, redrawn to the CEO's reference icons: a lime
 * peak circled in a field of noise, a grey waveform resolving into glowing
 * peaks, and a row of recovered peaks feeding a feature matrix. Glow is an SVG
 * blur behind a lime stroke, so it prints and scales like everything else.
 */
const LIME = "var(--color-lime)";

const panel = {
  viewBox: "0 0 240 140",
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function Glow({ id }: { id: string }) {
  return (
    <defs>
      <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

/** Smooth bell-shaped peak so the line art reads as a chromatogram, not a tent. */
function peak(x: number, base: number, apex: number, halfWidth: number) {
  const h = base - apex;
  const w = halfWidth;
  return `M${x - w} ${base} C${x - w * 0.45} ${base} ${x - w * 0.3} ${base - h} ${x} ${base - h} C${x + w * 0.3} ${base - h} ${x + w * 0.45} ${base} ${x + w} ${base}`;
}

/** Deterministic scatter — random positions would desync server and client render. */
const SCATTER_NOISE: ReadonlyArray<readonly [number, number, number]> = [
  [28, 66, 0.3], [36, 92, 0.34], [44, 50, 0.32], [50, 104, 0.28], [58, 76, 0.36],
  [62, 40, 0.3], [70, 96, 0.3], [76, 58, 0.34], [84, 84, 0.3], [90, 34, 0.32],
  [96, 70, 0.36], [102, 100, 0.3], [110, 52, 0.3], [140, 62, 0.34], [146, 96, 0.3],
  [154, 44, 0.32], [160, 80, 0.36], [168, 104, 0.3], [176, 58, 0.3], [184, 90, 0.34],
  [190, 38, 0.32], [198, 70, 0.3], [206, 98, 0.36], [214, 54, 0.3], [220, 82, 0.32],
  [124, 18, 0.28], [136, 30, 0.3], [116, 90, 0.34],
];

/** Real mass features get lost in the noise. */
export function NoiseDiagram() {
  return (
    <svg {...panel}>
      <Glow id="mfd-glow-noise" />

      {/* Axes */}
      <line x1="20" y1="120" x2="20" y2="18" stroke={LIME} />
      <path d="M15 24 L20 16 L25 24" stroke={LIME} />
      <line x1="20" y1="120" x2="226" y2="120" stroke={LIME} />
      <path d="M220 115 L228 120 L220 125" stroke={LIME} />

      {/* Background scatter */}
      {SCATTER_NOISE.map(([x, y, o]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="currentColor" stroke="none" opacity={o} />
      ))}

      {/* Small grey peaks */}
      <path d={peak(44, 120, 90, 7)} stroke="currentColor" opacity="0.38" />
      <path d={peak(66, 120, 102, 6)} stroke="currentColor" opacity="0.3" />
      <path d={peak(90, 120, 84, 7)} stroke="currentColor" opacity="0.42" />
      <path d={peak(158, 120, 96, 7)} stroke="currentColor" opacity="0.34" />
      <path d={peak(186, 120, 78, 8)} stroke="currentColor" opacity="0.4" />
      <path d={peak(212, 120, 104, 6)} stroke="currentColor" opacity="0.3" />

      {/* The real feature */}
      <path d={peak(124, 120, 36, 11)} stroke={LIME} filter="url(#mfd-glow-noise)" />
      <circle cx="124" cy="44" r="17" stroke={LIME} strokeDasharray="4 5" opacity="0.9" />
    </svg>
  );
}

const WAVEFORM_NOISE: ReadonlyArray<readonly [number, number, number]> = [
  [18, 64, 0.3], [26, 96, 0.28], [34, 52, 0.34], [42, 104, 0.3], [50, 70, 0.32],
  [58, 42, 0.3], [66, 98, 0.34], [74, 60, 0.3], [82, 106, 0.32], [90, 48, 0.3],
  [98, 84, 0.34], [30, 78, 0.3], [70, 80, 0.3],
];

/** Metablify amplifies what is real. */
export function AmplifyDiagram() {
  return (
    <svg {...panel}>
      <Glow id="mfd-glow-amp" />

      {/* Noisy waveform, grey */}
      <path
        d="M12 86 C18 86 20 60 26 60 S32 100 38 100 S44 46 50 46 S56 96 62 96 S68 58 74 58 S80 104 86 104 S92 70 98 70 S102 90 106 88"
        stroke="currentColor"
        opacity="0.55"
      />
      {WAVEFORM_NOISE.map(([x, y, o]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="currentColor" stroke="none" opacity={o} />
      ))}

      {/* Arrow */}
      <line x1="114" y1="76" x2="140" y2="76" stroke={LIME} opacity="0.9" />
      <path d="M134 70 L141 76 L134 82" stroke={LIME} />

      {/* Resolved peaks, glowing */}
      <line x1="150" y1="120" x2="228" y2="120" stroke={LIME} opacity="0.4" />
      <g filter="url(#mfd-glow-amp)">
        <path d={peak(162, 120, 82, 8)} stroke={LIME} />
        <path d={peak(190, 120, 24, 13)} stroke={LIME} />
        <path d={peak(216, 120, 92, 7)} stroke={LIME} />
      </g>
    </svg>
  );
}

const RECOVERED_PEAKS: ReadonlyArray<readonly [number, number, number, boolean]> = [
  // x, apex y, half width, lime apex dot
  [30, 40, 8, false],
  [58, 26, 9, true],
  [86, 46, 7, false],
  [118, 12, 11, true],
  [150, 34, 8, false],
  [180, 22, 9, true],
  [210, 44, 7, false],
];

const MATRIX_COLUMNS = [92, 106, 120, 134, 148];
const MATRIX_ROWS = [108, 118, 128];
/** Which cells read as "prioritized" — a deterministic pattern, not a random one. */
const MATRIX_HOT = new Set(["106-108", "134-108", "92-118", "120-118", "148-118", "106-128", "134-128"]);

/** Get more from every experiment. */
export function RecoveryDiagram() {
  return (
    <svg {...panel}>
      <Glow id="mfd-glow-rec" />

      <line x1="14" y1="64" x2="226" y2="64" stroke={LIME} opacity="0.4" />
      <g filter="url(#mfd-glow-rec)">
        {RECOVERED_PEAKS.map(([x, apex, w, hot]) => (
          <g key={x}>
            <path d={peak(x, 64, apex, w)} stroke={LIME} />
            <circle
              cx={x}
              cy={apex}
              r="2.6"
              fill={hot ? LIME : "currentColor"}
              stroke="none"
              opacity={hot ? 1 : 0.75}
            />
          </g>
        ))}
      </g>

      {/* Bracket and arrow into the matrix */}
      <path d="M18 72 L18 78 L222 78 L222 72" stroke={LIME} opacity="0.7" />
      <line x1="120" y1="80" x2="120" y2="92" stroke={LIME} />
      <path d="M115 88 L120 94 L125 88" stroke={LIME} />

      {/* Feature matrix */}
      <rect x="78" y="99" width="84" height="38" rx="5" stroke={LIME} opacity="0.6" />
      {MATRIX_ROWS.map((y) =>
        MATRIX_COLUMNS.map((x) => {
          const hot = MATRIX_HOT.has(`${x}-${y}`);
          return (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="2.4"
              fill={hot ? LIME : "currentColor"}
              stroke="none"
              opacity={hot ? 1 : 0.35}
            />
          );
        }),
      )}
    </svg>
  );
}
