"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

/**
 * Legacy Workflows -> Metablify dot-fill animation (Louis notes, p.1).
 * Sequence: big circle + sparse gray dots -> arrow + "Metablify" -> green dots fill
 * -> dotted legacy circle -> leader-line labels. Plays once when scrolled into view.
 */

const COLORS = {
  circleStroke: "#2f5d46",
  circleFill: "#eef4ec",
  greenDark: "#1f4d37",
  greenLight: "#8fb58a",
  gray: "#8a8f8c",
  anchor: "#14231c",
  text: "#14231c",
  line: "#6b7a72",
  heading: "#2f7a4f",
};

const VIEW = { w: 960, h: 470 };
const BIG = { cx: 230, cy: 235, r: 185 };
const LEGACY = { cx: 338, cy: 322, r: 80 };

const GRAY_COUNT = 44;
const GREEN_COUNT = 720;

// Timeline in ms from the moment the figure enters the viewport.
const T = { arrow: 1300, fill: 2100, legacyRing: 4700, labels: 5400 };

const LABELS = [
  {
    anchor: { x: 252, y: 172 },
    y: 150,
    lines: ["Metablify reveals a broader set of real mass", "features across LC/MS datasets."],
  },
  {
    anchor: { x: 318, y: 305 },
    y: 268,
    lines: ["Legacy workflows detect only a subset of real", "mass features."],
  },
  {
    anchor: { x: 384, y: 356 },
    y: 372,
    lines: [
      "A subset of signals reported by legacy",
      "workflows as mass features may be noise or",
      "artifacts.",
    ],
  },
];

type Dot = { x: number; y: number; r: number; o: number; fill: string; delay: number };

// Node and the browser stringify the last bits of a float differently, which
// breaks hydration. Round before the values ever reach an attribute.
const round = (n: number, places: number) => {
  const f = 10 ** places;
  return Math.round(n * f) / f;
};

// Seeded PRNG so server and client render identical dots (no hydration mismatch).
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildDots() {
  const rand = mulberry32(20260918);

  const gray: Dot[] = [];
  for (let i = 0; i < GRAY_COUNT; i++) {
    const a = rand() * Math.PI * 2;
    const rr = LEGACY.r * 0.92 * Math.sqrt(rand());
    gray.push({
      x: round(LEGACY.cx + Math.cos(a) * rr, 1),
      y: round(LEGACY.cy + Math.sin(a) * rr, 1),
      r: round(2.2 + rand() * 1.2, 2),
      o: round(0.55 + rand() * 0.35, 2),
      fill: COLORS.gray,
      delay: round(rand() * 0.6, 2),
    });
  }

  const green: Dot[] = [];
  let guard = 0;
  while (green.length < GREEN_COUNT && guard++ < 20000) {
    const a = rand() * Math.PI * 2;
    const norm = Math.pow(rand(), 0.72); // denser toward the center
    const rr = BIG.r * 0.97 * norm;
    const x = BIG.cx + Math.cos(a) * rr;
    const y = BIG.cy + Math.sin(a) * rr;
    if (gray.some((g) => Math.hypot(g.x - x, g.y - y) < 5)) continue;
    const centerWeight = 1 - norm;
    green.push({
      x: round(x, 1),
      y: round(y, 1),
      r: round(1.3 + rand() * 1.5, 2),
      o: round(0.3 + 0.65 * Math.min(1, centerWeight + rand() * 0.5), 2),
      fill: rand() < centerWeight + 0.2 ? COLORS.greenDark : COLORS.greenLight,
      delay: round(norm * 1.1 + rand() * 0.9, 2),
    });
  }

  return { gray, green };
}

export default function MassFeatureCircle({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(0); // 0 hidden, 1 legacy, 2 arrow, 3 fill, 4 ring, 5 labels
  const { gray, green } = useMemo(buildDots, []);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setPhase(5);
      return;
    }
    setPhase(1);
    const timers = [
      setTimeout(() => setPhase(2), T.arrow),
      setTimeout(() => setPhase(3), T.fill),
      setTimeout(() => setPhase(4), T.legacyRing),
      setTimeout(() => setPhase(5), T.labels),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView, reduceMotion]);

  const dotStyle = (d: Dot, visible: boolean): CSSProperties => ({
    opacity: visible ? d.o : 0,
    transform: visible ? "scale(1)" : "scale(0)",
    transformBox: "fill-box",
    transformOrigin: "center",
    transition: reduceMotion
      ? "none"
      : `opacity 0.5s ease ${d.delay}s, transform 0.5s cubic-bezier(.2,.8,.2,1) ${d.delay}s`,
  });

  const fade = (show: boolean, delay = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: show ? 1 : 0 },
    transition: { duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : delay },
  });

  return (
    <div ref={ref} className={className}>
      <div
        className="mb-2 flex items-baseline gap-3 text-xl font-semibold"
        style={{ color: COLORS.text }}
      >
        <motion.span {...fade(phase >= 1)}>Legacy Workflows</motion.span>
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, x: phase >= 2 ? 0 : -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
          aria-hidden
        >
          →
        </motion.span>
        <motion.span
          style={{ color: COLORS.heading }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, x: phase >= 2 ? 0 : -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.2 }}
        >
          Metablify
        </motion.span>
      </div>

      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        className="h-auto w-full"
        role="img"
        aria-label="Legacy workflows detect a small subset of mass features, some of them noise. Metablify reveals a broader set of real mass features across LC/MS datasets."
      >
        <motion.circle
          cx={BIG.cx}
          cy={BIG.cy}
          r={BIG.r}
          fill={COLORS.circleFill}
          stroke={COLORS.circleStroke}
          strokeWidth={1.5}
          {...fade(phase >= 1)}
        />

        <g>
          {green.map((d, i) => (
            <circle key={`g${i}`} cx={d.x} cy={d.y} r={d.r} fill={d.fill} style={dotStyle(d, phase >= 3)} />
          ))}
        </g>

        <g>
          {gray.map((d, i) => (
            <circle key={`x${i}`} cx={d.x} cy={d.y} r={d.r} fill={d.fill} style={dotStyle(d, phase >= 1)} />
          ))}
        </g>

        <motion.g
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: phase >= 4 ? 1 : 0, scale: phase >= 4 ? 1 : 0.85 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle
            cx={LEGACY.cx}
            cy={LEGACY.cy}
            r={LEGACY.r}
            fill="rgba(255,255,255,0.35)"
            stroke={COLORS.line}
            strokeWidth={1.2}
            strokeDasharray="3 4"
          />
          <text
            x={LEGACY.cx}
            y={LEGACY.cy + LEGACY.r + 22}
            textAnchor="middle"
            fontSize={10}
            letterSpacing={2.5}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill={COLORS.line}
          >
            LEGACY WORKFLOWS
          </text>
        </motion.g>

        {LABELS.map((l, i) => {
          const show = phase >= 5;
          const delay = reduceMotion ? 0 : i * 0.35;
          const lineEnd = { x: 585, y: l.y - 5 };
          return (
            <g key={i}>
              <motion.line
                x1={l.anchor.x}
                y1={l.anchor.y}
                x2={lineEnd.x}
                y2={lineEnd.y}
                stroke={COLORS.line}
                strokeWidth={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, delay }}
              />
              <motion.circle
                cx={l.anchor.x}
                cy={l.anchor.y}
                r={3.5}
                fill={COLORS.anchor}
                initial={{ opacity: 0 }}
                animate={{ opacity: show ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, delay }}
              />
              <motion.g
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: show ? 1 : 0, x: show ? 0 : 8 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, delay: delay + (reduceMotion ? 0 : 0.35) }}
              >
                <text x={600} y={l.y} fontSize={15} fill={COLORS.text}>
                  {l.lines.map((line, j) => (
                    <tspan key={j} x={600} dy={j === 0 ? 0 : 20}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </motion.g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
