"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useId, useMemo, useRef } from "react";

/**
 * "Metablify Amplifies What is Real" graphic (Louis notes, p.2-3).
 * Three stacked sample chromatograms, each with a slightly different peak
 * distribution, align into one consensus trace. Peaks seen in more files come out
 * taller (middle > left > right). The 4th hump, present in one file only, is dropped.
 * Sized for the dark green card; place it above the card's heading.
 */

const COLORS = {
  trace: "#9fb8a8",
  noiseDot: "#7f9a8a",
  guide: "#c8f560",
  rejected: "#e0806b",
  peak: "#c8f560",
  arrow: "#c8f560",
};

const VIEW = { w: 560, h: 270 };
const LEFT = { x0: 16, x1: 226, amp: 52, baselines: [78, 160, 242] };
const RIGHT = { x0: 322, x1: 544, base: 242, height: 200 };
const ARROW = { x0: 246, x1: 300, y: 160 };

type Peak = { mu: number; sigma: number; a: number };

// Peak positions (normalized x): A = left, B = middle, C = right, D = one-file-only hump.
const POS = { A: 0.22, B: 0.42, C: 0.64, D: 0.86 };

// Modeled on Louis's red / blue / purple sketch.
const FILES: Peak[][] = [
  [
    { mu: POS.A, sigma: 0.032, a: 0.45 },
    { mu: POS.B, sigma: 0.038, a: 1 },
    { mu: POS.C, sigma: 0.035, a: 0.5 },
    { mu: POS.D, sigma: 0.04, a: 0.32 },
  ],
  [
    { mu: POS.A, sigma: 0.045, a: 0.85 },
    { mu: POS.B, sigma: 0.045, a: 0.9 },
    { mu: POS.C, sigma: 0.04, a: 0.14 },
  ],
  [
    { mu: 0.31, sigma: 0.085, a: 0.62 },
    { mu: POS.C, sigma: 0.03, a: 0.6 },
  ],
];

// Consensus output: middle tallest, left second, right smallest, D absent.
const CONSENSUS: Peak[] = [
  { mu: POS.B, sigma: 0.026, a: 1 },
  { mu: POS.A, sigma: 0.024, a: 0.58 },
  { mu: POS.C, sigma: 0.022, a: 0.3 },
];

const gauss = (x: number, p: Peak) => p.a * Math.exp(-((x - p.mu) ** 2) / (2 * p.sigma ** 2));

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const lx = (n: number) => LEFT.x0 + n * (LEFT.x1 - LEFT.x0);
const rx = (n: number) => RIGHT.x0 + n * (RIGHT.x1 - RIGHT.x0);

function buildGeometry() {
  const rand = mulberry32(918);
  const STEPS = 140;

  const traces = FILES.map((peaks, f) => {
    const base = LEFT.baselines[f];
    let d = "";
    for (let i = 0; i <= STEPS; i++) {
      const n = i / STEPS;
      const noise = 0.035 * Math.sin(n * 57 + f * 2.1) + 0.025 * Math.sin(n * 139 + f * 4.7);
      const v = peaks.reduce((s, p) => s + gauss(n, p), 0.06) + noise;
      d += `${i === 0 ? "M" : "L"}${lx(n).toFixed(1)},${(base - LEFT.amp * v).toFixed(1)}`;
    }
    const dots = Array.from({ length: 7 }, () => ({
      x: lx(0.04 + rand() * 0.92),
      y: base - LEFT.amp * (0.1 + rand() * 0.9),
    }));
    return { d, dots };
  });

  const peaks = CONSENSUS.map((p) => {
    const from = p.mu - p.sigma * 4.5;
    const to = p.mu + p.sigma * 4.5;
    let d = "";
    for (let i = 0; i <= 60; i++) {
      const n = from + ((to - from) * i) / 60;
      const y = RIGHT.base - RIGHT.height * gauss(n, p);
      d += `${i === 0 ? "M" : "L"}${rx(n).toFixed(1)},${y.toFixed(1)}`;
    }
    return { d, mu: p.mu };
  });

  return { traces, peaks };
}

export default function AmplificationGraphic({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const glowId = `glow-${useId().replace(/:/g, "")}`;
  const { traces, peaks } = useMemo(buildGeometry, []);

  const t = (duration: number, delay: number) =>
    reduce ? { duration: 0 } : { duration, delay, ease: "easeInOut" as const };
  const on = inView;

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        className="h-auto w-full"
        role="img"
        aria-label="Three noisy sample chromatograms align into one clean trace. Peaks found in more samples come out taller; a peak found in only one sample is dropped."
      >
        <defs>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Sample traces draw in, one after another */}
        {traces.map((tr, i) => (
          <g key={i}>
            <motion.path
              d={tr.d}
              fill="none"
              stroke={COLORS.trace}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={on ? { pathLength: 1, opacity: 1 } : {}}
              transition={t(1.1, i * 0.25)}
            />
            {tr.dots.map((d, j) => (
              <motion.circle
                key={j}
                cx={d.x}
                cy={d.y}
                r={1.8}
                fill={COLORS.noiseDot}
                initial={{ opacity: 0 }}
                animate={on ? { opacity: 0.8 } : {}}
                transition={t(0.4, 0.6 + i * 0.25 + j * 0.05)}
              />
            ))}
          </g>
        ))}

        {/* 2. Alignment guides light up where peaks line up across files */}
        {[POS.A, POS.B, POS.C].map((n, i) => (
          <motion.line
            key={n}
            x1={lx(n)}
            x2={lx(n)}
            y1={12}
            y2={250}
            stroke={COLORS.guide}
            strokeWidth={1}
            strokeDasharray="2 4"
            initial={{ opacity: 0 }}
            animate={on ? { opacity: 0.45 } : {}}
            transition={t(0.5, 1.9 + i * 0.12)}
          />
        ))}
        {/* The one-file-only hump: flagged, then dropped */}
        <motion.line
          x1={lx(POS.D)}
          x2={lx(POS.D)}
          y1={12}
          y2={250}
          stroke={COLORS.rejected}
          strokeWidth={1}
          strokeDasharray="2 4"
          initial={{ opacity: 0 }}
          animate={on ? { opacity: reduce ? 0 : [0, 0.6, 0.6, 0] } : {}}
          transition={reduce ? { duration: 0 } : { duration: 1.4, delay: 2.2, times: [0, 0.2, 0.6, 1] }}
        />

        {/* 3. Arrow */}
        <motion.path
          d={`M${ARROW.x0},${ARROW.y} L${ARROW.x1},${ARROW.y} M${ARROW.x1 - 10},${ARROW.y - 9} L${ARROW.x1},${ARROW.y} L${ARROW.x1 - 10},${ARROW.y + 9}`}
          fill="none"
          stroke={COLORS.arrow}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={on ? { pathLength: 1, opacity: 1 } : {}}
          transition={t(0.6, 2.7)}
        />

        {/* 4. Consensus trace: baseline, then peaks rise in order of confidence */}
        <motion.line
          x1={RIGHT.x0}
          x2={RIGHT.x1}
          y1={RIGHT.base}
          y2={RIGHT.base}
          stroke={COLORS.peak}
          strokeWidth={2}
          strokeLinecap="round"
          filter={`url(#${glowId})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={on ? { pathLength: 1, opacity: 1 } : {}}
          transition={t(0.6, 3.1)}
        />
        {peaks.map((p, i) => (
          <motion.path
            key={p.mu}
            d={p.d}
            fill="none"
            stroke={COLORS.peak}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${glowId})`}
            style={{ transformBox: "fill-box", originY: 1 }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={on ? { scaleY: 1, opacity: 1 } : {}}
            transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 3.5 + i * 0.3, ease: [0.2, 0.9, 0.3, 1.2] }}
          />
        ))}
      </svg>
    </div>
  );
}
