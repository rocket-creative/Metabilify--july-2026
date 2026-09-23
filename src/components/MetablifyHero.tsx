"use client";

import Link from "next/link";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useId, useMemo, useRef } from "react";

/**
 * Metablify above-the-fold hero. Copy on the left; on the right an autoplaying,
 * looping story: samples -> 96-well plate -> LC/MS -> raw mass feature
 * -> aligned feature + retention-time peak -> feature tables.
 * Large captions sit under the graphic, outside the SVG.
 *
 * Pass real photos via `images`. Without them, drawn icons are used.
 * Graph data below is PLACEHOLDER shaped like Louis's citrulline figure; swap in
 * real values from Louis's CSV (see buildScatter / buildRT / TABLES).
 */

type Props = {
  images?: { plant?: string; soil?: string; blood?: string };
  className?: string;
};

const C = {
  bg: "#12291f",
  card: "#1c3a2f",
  cardStroke: "rgba(200,245,96,0.25)",
  text: "#f2f6f3",
  muted: "#9fb8a8",
  accent: "#c8f560",
  wellEmpty: "#0e2219",
  wellStroke: "rgba(255,255,255,0.18)",
  soil: ["#a47a4f", "#8f6843", "#b48a5d"],
  axis: "rgba(255,255,255,0.35)",
  files: ["#c8f560", "#5ec8b8", "#7fb2ff", "#e58fc4", "#f2b35e"],
  noise: "rgba(229,143,196,0.55)",
  grade: { gold: "#c9a227", green: "#2e9d57", yellow: "#e8c94a", red: "#c8433a" },
};

/** One loop plays over LOOP_SECONDS, then holds on the tables for HOLD_MS. */
const LOOP_SECONDS = 32;
const HOLD_MS = 4500;

/** Timeline checkpoints (0 = loop start, 1 = end). */
const P = {
  cardsOut: [0.13, 0.18],
  soilMove: [0.14, 0.21],
  plateIn: [0.21, 0.26],
  wells: [0.26, 0.36],
  soilOut: [0.33, 0.37],
  instIn: [0.35, 0.4],
  plateToInst: [0.38, 0.45],
  plateOut: [0.44, 0.47],
  instTrace: [0.45, 0.52],
  instOut: [0.52, 0.56],
  scatterIn: [0.55, 0.59],
  points: [0.57, 0.64],
  align: [0.66, 0.75],
  panelShift: [0.76, 0.81],
  rtIn: [0.79, 0.83],
  rtReveal: [0.81, 0.9],
  tables: [0.9, 0.97],
} as const;

const CAPTIONS: { range: [number, number]; text: string }[] = [
  { range: [0, 0.155], text: "Start with any biological sample: plant tissue, soil, or blood." },
  { range: [0.145, 0.365], text: "Sample extracts are loaded into a 96-well plate." },
  { range: [0.355, 0.555], text: "Each well runs through LC/MS, producing millions of data points per file." },
  { range: [0.545, 0.665], text: "Raw data: every file reports the same mass feature at a slightly different mass." },
  { range: [0.655, 0.895], text: "Metablify aligns them into one feature and quantifies it per file." },
  { range: [0.885, 1], text: "Every feature lands in a table, graded by confidence." },
];

// ---------- geometry ----------
const VIEW = { w: 1000, h: 600 };
const CARDS = [
  { key: "plant", label: "Plant tissue", cx: 250 },
  { key: "soil", label: "Soil", cx: 500 },
  { key: "blood", label: "Blood", cx: 750 },
] as const;
const CARD = { w: 200, h: 250, cy: 300 };

const PLATE = { cx: 455, cy: 320, w: 480, h: 320, pitch: 36, r: 13 };
const INST = { cx: 880, cy: 320, w: 200 };
/** The plate slides toward the instrument and stops short of its left edge. */
const PLATE_APPROACH = { scale: 0.78, gap: 36 };

// Card frame is x0/y0/w/h. The axes (left/right/top/bottom) sit inside it
// so the larger labels have a gutter and still stay on the card.
const A = { x0: 28, y0: 40, w: 440, h: 356, left: 108, right: 444, top: 88, bottom: 332 };
const RT = { x0: 492, y0: 40, w: 480, h: 356, left: 572, right: 948, top: 88, bottom: 332 };
const MZ = { min: 176.101, max: 176.106 };
const RTR = { min: 8.0, max: 8.6 };
const LOGI = { min: 3, max: 8 };

const mzX = (mz: number) => A.left + ((mz - MZ.min) / (MZ.max - MZ.min)) * (A.right - A.left);
const aY = (v: number) => A.bottom - ((v - LOGI.min) / (LOGI.max - LOGI.min)) * (A.bottom - A.top);
const rtX = (rt: number) => RT.left + ((rt - RTR.min) / (RTR.max - RTR.min)) * (RT.right - RT.left);
const rtY = (v: number) => RT.bottom - ((v - LOGI.min) / (LOGI.max - LOGI.min)) * (RT.bottom - RT.top);

// Seeded PRNG so SSR and client output match.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- placeholder data ----------
type ScatterPt = { x0: number; x1: number; y: number; color: string; file: number };

function buildScatter(): ScatterPt[] {
  const rand = mulberry32(4401);
  const center = 176.1028;
  const offsets = [-0.0011, -0.0004, 0.0003, 0.0009, 0.0016];
  const pts: ScatterPt[] = [];
  offsets.forEach((off, f) => {
    for (let i = 0; i < 48; i++) {
      const v = 3.5 + 4 * Math.pow(rand(), 0.8);
      const spread = 0.00035 * (1 + (7.5 - v) / 4);
      const j = (rand() - 0.5) * spread;
      pts.push({ x0: mzX(center + off + j), x1: mzX(center + j * 0.55), y: aY(v), color: C.files[f], file: f });
    }
  });
  for (let i = 0; i < 36; i++) {
    const x = mzX(176.1013 + rand() * 0.0034);
    pts.push({ x0: x, x1: x, y: aY(3.8 + rand()), color: C.noise, file: -1 });
  }
  return pts;
}

function buildRT() {
  const rand = mulberry32(7702);
  return C.files.map((color, f) => {
    const pts: { x: number; y: number }[] = [];
    const mu = 8.28 + f * 0.004;
    const h = 7.3 - f * 0.18;
    for (let rt = 8.03; rt <= 8.58; rt += 0.009) {
      const sigma = rt < mu ? 0.06 : 0.1; // tailing peak
      const v = 4.6 + (h - 4.6) * Math.exp(-((rt - mu) ** 2) / (2 * sigma ** 2)) + (rand() - 0.5) * 0.24;
      pts.push({ x: rtX(rt), y: rtY(v) });
    }
    return { color, pts };
  });
}

type Grade = keyof typeof C.grade;
const TABLES = {
  meta: {
    head: ["feature", "Δ mass", "replicability", "S/N", "grade"],
    rows: [
      ["peak 1", "0.24", "512 / 599", "180×", "gold"],
      ["peak 2", "0.10", "311 / 599", "22×", "green"],
      ["peak 3", "0.41", "142 / 599", "7×", "yellow"],
      ["peak 4", "1.88", "80 / 599", "3×", "red"],
    ],
  },
  feature: {
    head: ["feature", "sample 1", "sample 2", "sample 3", "…", "grade"],
    rows: [
      ["peak 1", "8.6e7", "9.2e7", "7.9e7", "…", "gold"],
      ["peak 2", "2.6e6", "1.4e6", "3.1e6", "…", "green"],
      ["peak 3", "4.5e5", "0", "6.1e5", "…", "yellow"],
      ["peak 4", "1.1e5", "0", "9.4e4", "…", "red"],
    ],
  },
};

const lerp = (v: number, [a, b]: readonly [number, number], from: number, to: number) =>
  from + (to - from) * Math.min(1, Math.max(0, (v - a) / (b - a)));

/** Writes an SVG transform attribute from scroll progress (exact, no CSS transform-origin quirks). */
function useAttrTransform(p: MotionValue<number>, fn: (v: number) => string) {
  const ref = useRef<SVGGElement>(null);
  useMotionValueEvent(p, "change", (v) => ref.current?.setAttribute("transform", fn(v)));
  useEffect(() => {
    ref.current?.setAttribute("transform", fn(p.get()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

// Scale around (cx, cy), then move by (dx, dy).
const moveScale = (cx: number, cy: number, dx: number, dy: number, s: number) =>
  `translate(${cx + dx} ${cy + dy}) scale(${s}) translate(${-cx} ${-cy})`;

// ---------- small animated pieces (each owns its hooks) ----------
function Well({ p, cx, cy, start, color }: { p: MotionValue<number>; cx: number; cy: number; start: number; color: string }) {
  const t = useTransform(p, [start, start + 0.012], [0, 1]);
  return (
    <g>
      <circle cx={cx} cy={cy} r={PLATE.r} fill={C.wellEmpty} stroke={C.wellStroke} />
      <motion.circle cx={cx} cy={cy} r={PLATE.r - 2} fill={color} style={{ opacity: t, scale: t }} />
    </g>
  );
}

function ScatterDot({ p, pt, appear }: { p: MotionValue<number>; pt: ScatterPt; appear: number }) {
  const cx = useTransform(p, [P.align[0], P.align[1]], [pt.x0, pt.x1]);
  const opacity = useTransform(p, [appear, appear + 0.015], [0, 0.85]);
  return <motion.circle cx={cx} cy={pt.y} r={2.4} fill={pt.color} style={{ opacity }} />;
}

function Caption({ p, range, text }: { p: MotionValue<number>; range: [number, number]; text: string }) {
  const [a, b] = range;
  const opacity = useTransform(p, [a, a + 0.02, b - 0.02, b], [a === 0 ? 1 : 0, 1, 1, b === 1 ? 1 : 0]);
  const y = useTransform(p, [a, a + 0.02], [a === 0 ? 0 : 10, 0]);
  return (
    <motion.p
      style={{
        opacity,
        y,
        x: "-50%",
        position: "absolute",
        left: "50%",
        margin: 0,
        textAlign: "center",
      }}
      className="mh-cap"
    >
      {text}
    </motion.p>
  );
}

function Table({ x, y, w, data }: { x: number; y: number; w: number; data: { head: string[]; rows: string[][] } }) {
  const cols = data.head.length;
  const cw = w / cols;
  const rh = 28;
  return (
    <g fontSize={11} fill={C.text} fontFamily="var(--font-mono)">
      <rect x={x} y={y} width={w} height={rh * (data.rows.length + 1)} rx={8} fill={C.card} stroke={C.cardStroke} />
      {data.head.map((h, i) => (
        <text key={h} x={x + i * cw + 10} y={y + 18} fill={C.muted}>
          {h}
        </text>
      ))}
      {data.rows.map((row, r) =>
        row.map((cell, i) => {
          const cy = y + rh * (r + 1);
          if (i === cols - 1) {
            return (
              <g key={`${r}-${i}`}>
                <rect x={x + i * cw + 6} y={cy + 5} width={cw - 12} height={18} rx={4} fill={C.grade[cell as Grade]} />
                <text x={x + i * cw + cw / 2} y={cy + 18} textAnchor="middle" fill="#10201a" fontWeight={600}>
                  {cell}
                </text>
              </g>
            );
          }
          return (
            <text key={`${r}-${i}`} x={x + i * cw + 10} y={cy + 18}>
              {cell}
            </text>
          );
        }),
      )}
    </g>
  );
}

function SampleIcon({ kind, cx, cy }: { kind: string; cx: number; cy: number }) {
  if (kind === "plant")
    return (
      <g stroke={C.accent} strokeWidth={2.5} fill="none" strokeLinecap="round">
        <path d={`M${cx},${cy + 50} L${cx},${cy - 10}`} />
        <path d={`M${cx},${cy + 5} C${cx - 45},${cy} ${cx - 50},${cy - 40} ${cx - 45},${cy - 55} C${cx - 10},${cy - 50} ${cx},${cy - 25} ${cx},${cy + 5}`} fill="rgba(200,245,96,0.15)" />
        <path d={`M${cx},${cy + 20} C${cx + 40},${cy + 15} ${cx + 48},${cy - 20} ${cx + 42},${cy - 35} C${cx + 10},${cy - 30} ${cx},${cy - 5} ${cx},${cy + 20}`} fill="rgba(200,245,96,0.15)" />
      </g>
    );
  if (kind === "soil")
    return (
      <g>
        <path d={`M${cx - 60},${cy + 40} Q${cx - 30},${cy - 30} ${cx},${cy - 35} Q${cx + 35},${cy - 30} ${cx + 60},${cy + 40} Z`} fill={C.soil[0]} />
        {[[-20, 10], [10, -5], [25, 20], [-35, 30], [0, 25], [-8, -18]].map(([dx, dy], i) => (
          <circle key={i} cx={cx + dx} cy={cy + dy} r={3} fill={C.soil[1]} />
        ))}
      </g>
    );
  return (
    <path
      d={`M${cx},${cy - 55} C${cx + 10},${cy - 30} ${cx + 45},${cy} ${cx + 40},${cy + 22} C${cx + 36},${cy + 50} ${cx - 36},${cy + 50} ${cx - 40},${cy + 22} C${cx - 45},${cy} ${cx - 10},${cy - 30} ${cx},${cy - 55} Z`}
      fill="#b8323a"
    />
  );
}

// ---------- hero layout ----------
// Background: shades and tints of the base green #12291f only (same hue/saturation,
// lightness varied), layered as soft light pools.
// Tints:  #19392b  #214a38  #2a6048  #35785b   Shades: #0c1c15  #08120d
const HERO_BG = [
  "radial-gradient(ellipse 55% 60% at 80% 18%, #2a6048cc 0%, #214a3866 40%, transparent 72%)",
  "radial-gradient(ellipse 40% 45% at 62% 55%, #35785b40 0%, transparent 70%)",
  "radial-gradient(ellipse 50% 55% at 8% 88%, #214a38b3 0%, transparent 70%)",
  "radial-gradient(ellipse 35% 40% at 28% 8%, #19392bcc 0%, transparent 70%)",
  "radial-gradient(ellipse 60% 40% at 50% 110%, #35785b55 0%, transparent 70%)",
  "radial-gradient(ellipse 45% 50% at 100% 100%, #08120dcc 0%, transparent 70%)",
  "linear-gradient(160deg, #12291f 0%, #0c1c15 55%, #08120d 100%)",
].join(",");

/* The site header is sticky and sits above this section, so this is breathing
   room, not clearance for an overlay. */
const NAV_OFFSET = "clamp(24px, 4vh, 48px)";
const HERO_CSS = `
.mh{box-sizing:border-box;height:100svh;min-height:560px;overflow:hidden;background-color:${C.bg};background-image:${HERO_BG};color:${C.text};
  font-family:var(--font-body);
  display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);grid-template-rows:minmax(0,1fr);
  gap:clamp(24px,4vw,64px);align-items:center;
  padding:${NAV_OFFSET} clamp(16px,5vw,80px) clamp(24px,5vh,56px)}
.mh-copy h1{font-family:var(--font-display);font-size:clamp(2.5rem,5.5vw,4.25rem);line-height:1.1;letter-spacing:-0.02em;font-weight:700;margin:0 0 clamp(12px,2vh,20px)}
.mh-lead{font-family:var(--font-body);font-size:clamp(1.05rem,1.4vw,1.25rem);line-height:1.65;font-weight:400;color:${C.muted};margin:0 0 clamp(16px,3vh,28px);max-width:34ch}
.mh-cta{display:inline-flex;gap:0.75rem;align-items:center;background:${C.accent};color:#10201a;font-family:var(--font-body);font-weight:600;
  letter-spacing:0.06em;text-transform:uppercase;
  padding:1rem 1.5rem;border-radius:999px;text-decoration:none;font-size:0.8rem}
.mh-cta:hover{filter:brightness(1.08)}
.mh-meta{list-style:none;padding:0;margin:clamp(16px,3.5vh,32px) 0 0;display:grid;gap:0.5rem;font-family:var(--font-mono);font-size:0.68rem;line-height:1.6;letter-spacing:0.12em;text-transform:uppercase;font-weight:500;color:${C.muted};max-width:48ch}
.mh-visual{height:100%;min-height:0;display:flex;flex-direction:column;justify-content:center}
.mh-visual svg{display:block;width:100%;height:auto;flex:0 1 auto;min-height:0;font-family:var(--font-mono)}
.mh-ui{font-family:var(--font-body)}
.mh-caption{position:relative;flex:0 0 auto;min-height:2.8em;margin-top:clamp(8px,2vh,20px);font-family:var(--font-display);font-size:clamp(1.125rem,1.9vw,1.75rem);text-align:center}
.mh-cap{position:absolute;left:50%;top:0;width:max-content;max-width:min(36ch,100%);margin:0;line-height:1.3;font-weight:500;letter-spacing:-0.015em;color:${C.text};text-align:center}
@media (max-width:900px){
  .mh{grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);align-items:start;gap:clamp(12px,2.5vh,24px)}
  .mh-caption{min-height:2.7em}
}
`;

// ---------- main ----------
export default function MetablifyHero({ images, className }: Props) {
  const p = useMotionValue(0);
  const stageOpacity = useMotionValue(1);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      p.set(1);
      return;
    }
    let alive = true;
    (async () => {
      while (alive) {
        p.set(0);
        await animate(stageOpacity, 1, { duration: 0.5 });
        if (!alive) break;
        await animate(p, 1, { duration: LOOP_SECONDS, ease: "linear" });
        if (!alive) break;
        await new Promise((r) => setTimeout(r, HOLD_MS));
        if (!alive) break;
        await animate(stageOpacity, 0, { duration: 0.5 });
      }
    })();
    return () => {
      alive = false;
      p.stop();
      stageOpacity.stop();
    };
  }, [reduce, p, stageOpacity]);
  const uid = useId().replace(/:/g, "");
  const scatter = useMemo(buildScatter, []);
  const rt = useMemo(buildRT, []);
  const wellColors = useMemo(() => {
    const rand = mulberry32(96);
    return Array.from({ length: 96 }, () => C.soil[Math.floor(rand() * C.soil.length)]);
  }, []);

  // Scene 1-2: the soil card slides left and stops beside the plate.
  const sideOut = useTransform(p, [...P.cardsOut], [1, 0]);
  const soilCx = CARDS.find((c) => c.key === "soil")!.cx;
  const soilScale = 0.72;
  const soilDx =
    PLATE.cx - PLATE.w / 2 - 28 - (CARD.w / 2) * soilScale - soilCx;
  const soilRef = useAttrTransform(p, (v) =>
    moveScale(soilCx, CARD.cy, lerp(v, P.soilMove, 0, soilDx), 0, lerp(v, P.soilMove, 1, soilScale)),
  );
  const soilOpacity = useTransform(p, [...P.soilOut], [1, 0]);

  // Scene 2-3: plate. It approaches the instrument, then holds beside it.
  const plateOpacity = useTransform(p, [P.plateIn[0], P.plateIn[1], P.plateOut[0], P.plateOut[1]], [0, 1, 1, 0]);
  const plateApproachDx =
    INST.cx -
    INST.w / 2 -
    PLATE_APPROACH.gap -
    (PLATE.w / 2) * PLATE_APPROACH.scale -
    PLATE.cx;
  const plateRef = useAttrTransform(p, (v) =>
    moveScale(
      PLATE.cx,
      PLATE.cy,
      lerp(v, P.plateToInst, 0, plateApproachDx),
      0,
      lerp(v, P.plateToInst, 1, PLATE_APPROACH.scale),
    ),
  );

  // Scene 3: instrument
  const instOpacity = useTransform(p, [P.instIn[0], P.instIn[1], P.instOut[0], P.instOut[1]], [0, 1, 1, 0]);
  const instTrace = useTransform(p, [...P.instTrace], [0, 1]);

  // Scene 4-5: graphs
  const panelA = useTransform(p, [...P.scatterIn], [0, 1]);
  // Panel A starts large and centered, then shrinks into the left slot as panel C arrives.
  const panelARef = useAttrTransform(p, (v) =>
    moveScale(
      A.x0 + A.w / 2,
      A.y0 + A.h / 2,
      lerp(v, P.panelShift, VIEW.w / 2 - (A.x0 + A.w / 2), 0),
      lerp(v, P.panelShift, VIEW.h / 2 - (A.y0 + A.h / 2), 0),
      lerp(v, P.panelShift, 1.45, 1),
    ),
  );
  const titleBefore = useTransform(p, [P.align[0], P.align[0] + 0.03], [1, 0]);
  const titleAfter = useTransform(p, [P.align[1] - 0.03, P.align[1]], [0, 1]);
  const rtOpacity = useTransform(p, [...P.rtIn], [0, 1]);
  const rtClip = useTransform(p, [...P.rtReveal], [0, RT.right - RT.left + 10]);
  const tablesOpacity = useTransform(p, [...P.tables], [0, 1]);
  const tablesY = useTransform(p, [...P.tables], [30, 0]);

  const plateLeft = PLATE.cx - PLATE.w / 2;
  const plateTop = PLATE.cy - PLATE.h / 2;
  const wellX0 = plateLeft + 42;
  const wellY0 = plateTop + 42;

  return (
    <section className={`mh ${className ?? ""}`}>
      <style>{HERO_CSS}</style>
      <div className="mh-copy">
        <h1>See more in your LC/MS data.</h1>
        <p className="mh-lead">Metablify is an LC/MS platform built on the first principles of physics.</p>
        <Link href="/technology" className="mh-cta">
          Explore Metablify <span aria-hidden>→</span>
        </Link>
        <ul className="mh-meta">
          <li>A Danforth Technology Company spinout · Developed at the Donald Danforth Plant Science Center</li>
          <li>Metabolomics · Proteomics · Multi-omics</li>
        </ul>
      </div>

      <motion.div className="mh-visual" style={{ opacity: stageOpacity }}>
        <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} role="img" aria-label="Plant, soil and blood samples are loaded into a 96-well plate, run through LC/MS, and Metablify aligns the raw data into quantified, confidence-graded mass features.">
          <defs>
            {CARDS.map((c) => (
              <clipPath key={c.key} id={`${uid}-${c.key}`}>
                <rect x={c.cx - CARD.w / 2 + 12} y={CARD.cy - CARD.h / 2 + 12} width={CARD.w - 24} height={170} rx={12} />
              </clipPath>
            ))}
            <clipPath id={`${uid}-rt`}>
              <motion.rect x={RT.left - 5} y={RT.top - 22} height={RT.bottom - RT.top + 32} style={{ width: rtClip }} />
            </clipPath>
          </defs>

          {/* Scene 1: sample cards */}
          {CARDS.map((c) => {
            const isSoil = c.key === "soil";
            const img = images?.[c.key];
            const top = CARD.cy - CARD.h / 2;
            return (
              <motion.g key={c.key} ref={isSoil ? soilRef : undefined} style={{ opacity: isSoil ? soilOpacity : sideOut }}>
                <rect x={c.cx - CARD.w / 2} y={top} width={CARD.w} height={CARD.h} rx={18} fill={C.card} stroke={C.cardStroke} />
                {img ? (
                  <image href={img} x={c.cx - CARD.w / 2 + 12} y={top + 12} width={CARD.w - 24} height={170} preserveAspectRatio="xMidYMid slice" clipPath={`url(#${uid}-${c.key})`} />
                ) : (
                  <SampleIcon kind={c.key} cx={c.cx} cy={top + 97} />
                )}
                <text className="mh-ui" x={c.cx} y={top + CARD.h - 28} textAnchor="middle" fontSize={17} fill={C.text}>
                  {c.label}
                </text>
              </motion.g>
            );
          })}

          {/* Scene 2: 96-well plate */}
          <motion.g ref={plateRef} style={{ opacity: plateOpacity }}>
            <rect x={plateLeft} y={plateTop} width={PLATE.w} height={PLATE.h} rx={16} fill="#e9efe9" opacity={0.08} stroke={C.muted} />
            {"ABCDEFGH".split("").map((row, r) => (
              <text key={row} x={plateLeft + 20} y={wellY0 + r * PLATE.pitch + 4} fontSize={10} fill={C.muted} textAnchor="middle">
                {row}
              </text>
            ))}
            {Array.from({ length: 12 }, (_, c) => (
              <text key={c} x={wellX0 + c * PLATE.pitch} y={plateTop + 20} fontSize={10} fill={C.muted} textAnchor="middle">
                {c + 1}
              </text>
            ))}
            {Array.from({ length: 96 }, (_, k) => {
              const r = Math.floor(k / 12);
              const c = k % 12;
              const start = P.wells[0] + (k / 96) * (P.wells[1] - P.wells[0] - 0.012);
              return <Well key={k} p={p} cx={wellX0 + c * PLATE.pitch} cy={wellY0 + r * PLATE.pitch} start={start} color={wellColors[k]} />;
            })}
          </motion.g>

          {/* Scene 3: LC/MS instrument */}
          <motion.g style={{ opacity: instOpacity }}>
            <rect x={INST.cx - 100} y={INST.cy - 150} width={200} height={300} rx={16} fill={C.card} stroke="#3d6b56" />
            <rect x={INST.cx - 80} y={INST.cy - 125} width={160} height={95} rx={8} fill="#0b1a13" />
            <motion.path
              d={`M${INST.cx - 70},${INST.cy - 45} L${INST.cx - 45},${INST.cy - 47} Q${INST.cx - 35},${INST.cy - 90} ${INST.cx - 25},${INST.cy - 47} L${INST.cx - 5},${INST.cy - 48} Q${INST.cx + 5},${INST.cy - 115} ${INST.cx + 15},${INST.cy - 48} L${INST.cx + 35},${INST.cy - 47} Q${INST.cx + 43},${INST.cy - 75} ${INST.cx + 51},${INST.cy - 47} L${INST.cx + 70},${INST.cy - 46}`}
              fill="none"
              stroke={C.accent}
              strokeWidth={2}
              style={{ pathLength: instTrace }}
            />
            <rect x={INST.cx - 62} y={INST.cy + 70} width={124} height={12} rx={3} fill="#0b1a13" />
            <text x={INST.cx} y={INST.cy + 125} textAnchor="middle" fontSize={16} fill={C.muted} letterSpacing={3}>
              LC/MS
            </text>
          </motion.g>

          {/* Scene 4-5: panel A, mass before/after alignment */}
          <motion.g ref={panelARef} style={{ opacity: panelA }}>
            <rect x={A.x0} y={A.y0} width={A.w} height={A.h} rx={12} fill={C.card} stroke={C.cardStroke} />
            <motion.text className="mh-ui" x={A.x0} y={A.y0 - 14} fontSize={16} fill={C.text} style={{ opacity: titleBefore }}>
              Before mass adjustment
            </motion.text>
            <motion.text className="mh-ui" x={A.x0} y={A.y0 - 14} fontSize={16} fill={C.accent} style={{ opacity: titleAfter }}>
              After mass adjustment
            </motion.text>
            <line x1={A.left} y1={A.bottom} x2={A.right} y2={A.bottom} stroke={C.axis} />
            <line x1={A.left} y1={A.top} x2={A.left} y2={A.bottom} stroke={C.axis} />
            {[
              { m: 176.101, anchor: "start" as const },
              { m: 176.103, anchor: "middle" as const },
              { m: 176.106, anchor: "end" as const },
            ].map(({ m, anchor }) => (
              <text key={m} x={mzX(m)} y={A.bottom + 22} fontSize={13} fill={C.muted} textAnchor={anchor}>
                {m.toFixed(3)}
              </text>
            ))}
            {[3, 4, 5, 6, 7, 8].map((v) => (
              <text key={v} x={A.left - 12} y={aY(v) + 4} fontSize={13} fill={C.muted} textAnchor="end">
                {v}
              </text>
            ))}
            <text className="mh-ui" x={(A.left + A.right) / 2} y={A.bottom + 44} fontSize={15} fill={C.muted} textAnchor="middle">
              m/z
            </text>
            <text
              className="mh-ui"
              x={A.x0 + 26}
              y={(A.top + A.bottom) / 2}
              fontSize={14}
              fill={C.muted}
              textAnchor="middle"
              transform={`rotate(-90 ${A.x0 + 26} ${(A.top + A.bottom) / 2})`}
            >
              log10(intensity)
            </text>
            {scatter.map((pt, i) => {
              const appear = pt.file < 0 ? P.points[0] : P.points[0] + (pt.file / 5) * (P.points[1] - P.points[0] - 0.015);
              return <ScatterDot key={i} p={p} pt={pt} appear={appear} />;
            })}
          </motion.g>

          {/* Scene 5: panel C, retention-time peak */}
          <motion.g style={{ opacity: rtOpacity }}>
            <rect x={RT.x0} y={RT.y0} width={RT.w} height={RT.h} rx={12} fill={C.card} stroke={C.cardStroke} />
            <text className="mh-ui" x={RT.x0} y={RT.y0 - 14} fontSize={16} fill={C.text}>
              Retention-time peak with consensus center
            </text>
            <line x1={RT.left} y1={RT.bottom} x2={RT.right} y2={RT.bottom} stroke={C.axis} />
            <line x1={RT.left} y1={RT.top} x2={RT.left} y2={RT.bottom} stroke={C.axis} />
            {[
              { r: 8.0, anchor: "start" as const },
              { r: 8.2, anchor: "middle" as const },
              { r: 8.4, anchor: "middle" as const },
              { r: 8.6, anchor: "end" as const },
            ].map(({ r, anchor }) => (
              <text key={r} x={rtX(r)} y={RT.bottom + 22} fontSize={13} fill={C.muted} textAnchor={anchor}>
                {r.toFixed(1)}
              </text>
            ))}
            {[3, 4, 5, 6, 7, 8].map((v) => (
              <text key={v} x={RT.left - 12} y={rtY(v) + 4} fontSize={13} fill={C.muted} textAnchor="end">
                {v}
              </text>
            ))}
            <text className="mh-ui" x={(RT.left + RT.right) / 2} y={RT.bottom + 44} fontSize={15} fill={C.muted} textAnchor="middle">
              retention time (min)
            </text>
            <text
              className="mh-ui"
              x={RT.x0 + 26}
              y={(RT.top + RT.bottom) / 2}
              fontSize={14}
              fill={C.muted}
              textAnchor="middle"
              transform={`rotate(-90 ${RT.x0 + 26} ${(RT.top + RT.bottom) / 2})`}
            >
              log10(intensity)
            </text>
            <text x={rtX(8.28)} y={RT.top - 12} fontSize={13} fill={C.text} textAnchor="middle">
              8.28
            </text>
            <g clipPath={`url(#${uid}-rt)`}>
              {rt.map((f, i) => (
                <g key={i}>
                  {f.pts.map((pt, j) => (
                    <circle key={j} cx={pt.x} cy={pt.y} r={2.2} fill={f.color} opacity={0.8} />
                  ))}
                </g>
              ))}
              <line x1={rtX(8.28)} x2={rtX(8.28)} y1={RT.top} y2={RT.bottom} stroke={C.text} strokeDasharray="3 3" opacity={0.7} />
            </g>
          </motion.g>

          {/* Scene 6: tables */}
          <motion.g style={{ opacity: tablesOpacity, y: tablesY }}>
            <Table x={A.x0} y={410} w={A.w} data={TABLES.meta} />
            <Table x={RT.x0} y={410} w={RT.w} data={TABLES.feature} />
          </motion.g>
        </svg>

        <div className="mh-caption" aria-live="off">
          {CAPTIONS.map((c) => (
            <Caption key={c.text} p={p} range={c.range} text={c.text} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
