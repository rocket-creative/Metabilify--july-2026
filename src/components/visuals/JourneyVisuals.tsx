/**
 * Line art for the sample-to-mass-feature journey on Work With Us. Every
 * panel is 480x280, stroke 1.75, colour from the parent (forest on white),
 * with lime reserved for the signal Metablify keeps. Nothing here is a
 * screenshot of a real readout; it is a diagram, and it says so in the
 * adjacent copy.
 */
const LIME = "var(--color-lime)";
const LIME_DEEP = "var(--color-lime-deep)";

const panel = {
  viewBox: "0 0 480 280",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/** Mulberry32 — deterministic so server and client draw identical noise. */
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

function bell(x: number, base: number, apex: number, w: number) {
  const h = base - apex;
  return `M${x - w} ${base} C${x - w * 0.45} ${base} ${x - w * 0.3} ${base - h} ${x} ${base - h} C${x + w * 0.3} ${base - h} ${x + w * 0.45} ${base} ${x + w} ${base}`;
}

/* ---------- 01 · Samples ---------- */

const SAMPLES: ReadonlyArray<{ label: readonly string[]; icon: React.ReactNode }> = [
  {
    label: ["Human", "health"],
    icon: (
      <g>
        <rect x="24" y="8" width="16" height="8" rx="2" />
        <path d="M27 16v30a5 5 0 0 0 10 0V16" />
        <path d="M27 30h10" />
        <path d="M27 30v16a5 5 0 0 0 10 0V30z" fill="currentColor" opacity="0.18" stroke="none" />
      </g>
    ),
  },
  {
    label: ["Drug", "discovery"],
    icon: (
      <g>
        <ellipse cx="32" cy="30" rx="22" ry="9" />
        <path d="M10 30v6c0 5 10 9 22 9s22-4 22-9v-6" />
        <circle cx="24" cy="29" r="2.5" />
        <circle cx="35" cy="26" r="2" />
        <circle cx="40" cy="32" r="2.5" />
        <circle cx="29" cy="34" r="1.5" />
      </g>
    ),
  },
  {
    label: ["Agriculture"],
    icon: (
      <g>
        <path d="M32 34V14" />
        <path d="M32 24c-8 0-14-5-14-13 8 0 14 5 14 13z" />
        <path d="M32 30c8 0 14-5 14-13-8 0-14 5-14 13z" />
        <path d="M32 34c-3 5-9 7-14 12" />
        <path d="M32 34c3 5 9 7 14 12" />
        <path d="M32 34v16" />
        <path d="M32 42c-2 3-6 4-8 8" />
        <path d="M32 42c2 3 6 4 8 8" />
      </g>
    ),
  },
  {
    label: ["Environmental"],
    icon: (
      <g>
        <path d="M32 12c6 8 10 13 10 18a10 10 0 0 1-20 0c0-5 4-10 10-18z" />
        <path d="M10 50c6-6 12-6 18-2s12 4 18-2 8-4 8-4" />
        <path d="M14 46c2-4 5-6 8-6" opacity="0.5" />
      </g>
    ),
  },
  {
    label: ["Biotechnology"],
    icon: (
      <g>
        <path d="M26 10h12" />
        <path d="M28 10v14L14 46a4 4 0 0 0 3 6h30a4 4 0 0 0 3-6L36 24V10" />
        <path d="M20 40h24" />
        <circle cx="30" cy="46" r="1.5" />
        <circle cx="36" cy="44" r="1.2" />
        <circle cx="26" cy="47" r="1" />
      </g>
    ),
  },
];

export function SamplesVisual() {
  const gap = 480 / SAMPLES.length;
  return (
    <svg {...panel}>
      {SAMPLES.map((s, i) => {
        const cx = gap * i + gap / 2;
        return (
          <g key={s.label.join(" ")}>
            <circle cx={cx} cy="92" r="40" stroke="currentColor" opacity="0.18" />
            <g transform={`translate(${cx - 32} 60)`}>{s.icon}</g>
            <text
              x={cx}
              y="156"
              textAnchor="middle"
              className="journey-svg-label"
              fill="currentColor"
              stroke="none"
            >
              {s.label.map((line, li) => (
                <tspan key={line} x={cx} dy={li === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>
            {/* Each sample feeds the plate below. */}
            <path
              d={`M${cx} 184 C${cx} 216 240 220 240 250`}
              opacity="0.35"
            />
          </g>
        );
      })}
      <circle cx="240" cy="254" r="4" fill={LIME} stroke="none" />
    </svg>
  );
}

/* ---------- 02 · 96-well plate ---------- */

const PLATE_HOT = new Set([14, 27, 41, 58, 66, 73, 89]);

export function WellPlateVisual() {
  const cols = 12;
  const rows = 8;
  const x0 = 82;
  const y0 = 62;
  const step = 27;
  return (
    <svg {...panel}>
      <rect x="56" y="36" width="368" height="208" rx="14" />
      <rect x="66" y="46" width="348" height="188" rx="10" opacity="0.35" />
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const idx = r * cols + c;
          const hot = PLATE_HOT.has(idx);
          return (
            <circle
              key={idx}
              cx={x0 + c * step + 13}
              cy={y0 + r * step - 6}
              r="9"
              fill={hot ? LIME : "none"}
              opacity={hot ? 1 : 0.6}
            />
          );
        }),
      )}
      <text x="72" y="262" className="journey-svg-label" fill="currentColor" stroke="none">
        96-well plate
      </text>
    </svg>
  );
}

/* ---------- 03 · LC/MS ---------- */

const ION_PATH = [214, 228, 242, 256, 270, 284];
const SPRAY: ReadonlyArray<readonly [number, number, number]> = [
  [300, 132, 0.9], [306, 140, 0.7], [304, 150, 0.8], [310, 158, 0.6], [298, 156, 0.7], [312, 146, 0.5],
];

export function LcmsVisual() {
  return (
    <svg {...panel}>
      {/* Solvent bottles feeding the pumps */}
      {[70, 94, 118].map((x) => (
        <g key={x}>
          <rect x={x - 6} y="30" width="12" height="7" rx="2" />
          <path d={`M${x - 9} 37v20a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V37`} />
          <rect x={x - 6} y="48" width="12" height="9" fill="currentColor" opacity="0.15" stroke="none" />
        </g>
      ))}
      <path d="M70 37v-8h48v8" opacity="0.45" />
      <line x1="94" y1="29" x2="94" y2="22" opacity="0.45" />

      {/* LC stack: degasser, binary pump, autosampler, column oven */}
      <rect x="44" y="68" width="112" height="150" rx="8" />
      {[68, 105, 142, 180].map((y, i) => (
        <g key={y}>
          {i > 0 ? <line x1="44" y1={y} x2="156" y2={y} opacity="0.5" /> : null}
          <rect x="56" y={y + 10} width="34" height="16" rx="3" opacity="0.55" />
          <circle cx="132" cy={y + 18} r="2.2" fill={LIME} stroke="none" />
          <line x1="100" y1={y + 18} x2="120" y2={y + 18} opacity="0.35" />
        </g>
      ))}
      {/* Autosampler vials in the third module */}
      {[62, 72, 82].map((x) => (
        <rect key={x} x={x} y="149" width="6" height="8" rx="1" opacity="0.8" />
      ))}
      <text x="44" y="238" className="journey-svg-label" fill="currentColor" stroke="none">
        Liquid chromatography
      </text>

      {/* Column with packed bed */}
      <line x1="156" y1="144" x2="176" y2="144" />
      <rect x="176" y="136" width="56" height="16" rx="8" />
      {[186, 196, 206, 216].map((x) => (
        <line key={x} x1={x} y1="139" x2={x} y2="149" opacity="0.4" />
      ))}
      <line x1="232" y1="144" x2="292" y2="144" />
      {ION_PATH.map((x, i) => (
        <circle
          key={x}
          cx={x + 8}
          cy="144"
          r="2.4"
          fill={i % 2 ? LIME : "currentColor"}
          stroke="none"
          opacity={i % 2 ? 1 : 0.5}
        />
      ))}

      {/* Electrospray at the inlet */}
      <path d="M292 140l10-4M292 148l10 4" opacity="0.5" />
      {SPRAY.map(([x, y, o]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill={LIME} stroke="none" opacity={o} />
      ))}

      {/* Mass spectrometer: inlet, quadrupole rods, detector */}
      <rect x="316" y="68" width="122" height="150" rx="8" />
      <path d="M316 132h14v24h-14" opacity="0.6" />
      <line x1="330" y1="144" x2="344" y2="144" opacity="0.6" />
      {[130, 138, 150, 158].map((y) => (
        <line key={y} x1="346" y1={y} x2="404" y2={y} strokeWidth="2.5" opacity={y === 130 || y === 158 ? 0.45 : 0.85} />
      ))}
      {[352, 364, 376, 388, 400].map((x, i) => (
        <circle key={x} cx={x} cy="144" r="2" fill={LIME} stroke="none" opacity={0.4 + i * 0.15} />
      ))}
      <path d="M408 136h16a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-16z" fill={LIME} fillOpacity="0.25" stroke={LIME} />
      <path d="M338 96h24M338 104h16" opacity="0.35" />
      <rect x="338" y="182" width="78" height="18" rx="3" opacity="0.45" />
      <text x="316" y="238" className="journey-svg-label" fill="currentColor" stroke="none">
        Mass spectrometer
      </text>
    </svg>
  );
}

/* ---------- 04 · Raw signal ---------- */

function noisyTrace(seed: number, base: number, amp: number, peaks: number[]) {
  const rand = seeded(seed);
  const pts: string[] = [];
  for (let x = 40; x <= 440; x += 4) {
    let y = base - rand() * amp;
    for (const p of peaks) {
      const d = Math.abs(x - p);
      if (d < 14) y -= (14 - d) * (2.2 + rand() * 1.4);
    }
    pts.push(`${x} ${Math.round(y * 10) / 10}`);
  }
  return `M${pts.join(" L")}`;
}

const RAW_TRACES = [
  noisyTrace(3, 232, 34, [96, 178, 262, 340, 398]),
  noisyTrace(5, 226, 40, [88, 184, 270, 332, 404]),
  noisyTrace(7, 220, 46, [102, 172, 256, 346, 392]),
  noisyTrace(9, 214, 52, [94, 190, 266, 336, 410]),
  noisyTrace(11, 208, 58, [90, 176, 274, 328, 400]),
  noisyTrace(13, 202, 64, [98, 182, 260, 342, 396]),
];

export function RawSignalVisual() {
  return (
    <svg {...panel}>
      <line x1="40" y1="240" x2="440" y2="240" opacity="0.5" />
      <line x1="40" y1="240" x2="40" y2="40" opacity="0.5" />
      {RAW_TRACES.map((d, i) => (
        <path key={i} d={d} opacity={0.22 + i * 0.09} strokeWidth="1.25" />
      ))}
      <text x="40" y="262" className="journey-svg-label" fill="currentColor" stroke="none">
        Raw LC/MS signal · every sample overlaid
      </text>
    </svg>
  );
}

/* ---------- 05 · Clean, aligned peaks ---------- */

const ALIGNED_X = [96, 178, 262, 340, 398];
const TRACE_BASES = [96, 128, 160, 192];

export function CleanPeaksVisual() {
  return (
    <svg {...panel}>
      {/* Alignment guides */}
      {ALIGNED_X.map((x) => (
        <line key={x} x1={x} y1="40" x2={x} y2="200" stroke={LIME} strokeDasharray="3 6" opacity="0.6" />
      ))}

      {/* One clean trace per sample, peaks aligned column by column */}
      {TRACE_BASES.map((base, ti) => (
        <g key={base}>
          <line x1="40" y1={base} x2="440" y2={base} opacity="0.25" />
          {ALIGNED_X.map((x, pi) => {
            const apex = base - 18 - ((pi * 7 + ti * 3) % 12);
            return (
              <g key={x}>
                <path d={bell(x, base, apex, 12)} stroke={LIME_DEEP} />
                <circle cx={x} cy={apex} r="2.2" fill={LIME_DEEP} stroke="none" />
              </g>
            );
          })}
        </g>
      ))}

      {/* Prioritized feature list beneath */}
      <line x1="40" y1="246" x2="440" y2="246" opacity="0.5" />
      {Array.from({ length: 40 }, (_, i) => {
        const x = 46 + i * 10;
        const near = ALIGNED_X.some((ax) => Math.abs(ax - x) < 6);
        const h = near ? 30 : 6 + ((i * 7) % 9);
        return (
          <line
            key={x}
            x1={x}
            y1="246"
            x2={x}
            y2={246 - h}
            stroke={near ? LIME_DEEP : "currentColor"}
            strokeWidth={near ? 2.5 : 1.25}
            opacity={near ? 1 : 0.3}
          />
        );
      })}
      <text x="40" y="268" className="journey-svg-label" fill="currentColor" stroke="none">
        Aligned mass features · prioritized
      </text>
    </svg>
  );
}
