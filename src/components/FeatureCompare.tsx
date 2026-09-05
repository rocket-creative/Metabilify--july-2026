"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * The "Venn diagram" of Metablify, drawn the way the CEO drew it: one large
 * set of real mass features, a smaller legacy set that overhangs its edge, and
 * a leader line from each region out to the sentence that explains it.
 *
 * Geometry is in a 600x480 viewBox. The callout column beside the drawing is
 * the same height as the drawing, so a leader that leaves the right edge at
 * y=100 lands on a callout positioned at top: 100/480.
 */
const VB_W = 600;
const VB_H = 480;

const REAL = { cx: 232, cy: 240, r: 192 };
const LEGACY = { cx: 392, cy: 330, r: 96 };

type Callout = {
  key: string;
  /** Where the leader starts, inside the region it describes. */
  anchor: readonly [number, number];
  /** Y at which the leader leaves the right edge — also the callout's centre. */
  exitY: number;
  tone: "real" | "legacy";
  body: string;
};

const CALLOUTS: readonly Callout[] = [
  {
    key: "real",
    anchor: [318, 104],
    exitY: 92,
    tone: "real",
    body: "Metablify reveals a broader set of real mass features across LC/MS datasets.",
  },
  {
    key: "shared",
    anchor: [336, 306],
    exitY: 236,
    tone: "legacy",
    body: "Legacy workflows detect only a subset of real mass features.",
  },
  {
    key: "noise",
    anchor: [452, 372],
    exitY: 386,
    tone: "legacy",
    body: "A subset of mass features detected by legacy workflows are noise or artifacts.",
  },
];

/** Mulberry32 — deterministic so server and client paint the same dots. */
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

type Dot = readonly [number, number, number, number]; // x, y, r, opacity

function inCircle(x: number, y: number, c: { cx: number; cy: number; r: number }) {
  const dx = x - c.cx;
  const dy = y - c.cy;
  return dx * dx + dy * dy <= c.r * c.r;
}

/** Dense at the centre, thinning toward the rim, like a real feature cloud. */
function stipple(
  circle: { cx: number; cy: number; r: number },
  count: number,
  seed: number,
  exclude?: { cx: number; cy: number; r: number },
): Dot[] {
  const rand = seeded(seed);
  const dots: Dot[] = [];
  let guard = 0;
  while (dots.length < count && guard < count * 8) {
    guard += 1;
    const angle = rand() * Math.PI * 2;
    // Square-root would be uniform; the extra power pulls dots inward.
    const radius = Math.pow(rand(), 0.62) * (circle.r - 4);
    const x = circle.cx + Math.cos(angle) * radius;
    const y = circle.cy + Math.sin(angle) * radius;
    if (exclude && inCircle(x, y, exclude)) continue;
    // Larger and brighter toward the centre, so the cloud has a core.
    const core = 1 - radius / circle.r;
    const size = 0.7 + rand() * 1.4 + core * 1.2;
    const opacity = 0.25 + rand() * 0.4 + core * 0.3;
    dots.push([
      Math.round(x * 10) / 10,
      Math.round(y * 10) / 10,
      Math.round(size * 10) / 10,
      Math.round(opacity * 100) / 100,
    ]);
  }
  return dots;
}

const REAL_DOTS = stipple(REAL, 2600, 11, LEGACY);
const OVERLAP_DOTS = stipple(LEGACY, 700, 23).filter(([x, y]) =>
  inCircle(x, y, REAL),
);
const LEGACY_DOTS = stipple(LEGACY, 420, 37).filter(
  ([x, y]) => !inCircle(x, y, REAL),
);

function leaderPath({ anchor, exitY }: Callout) {
  const [x, y] = anchor;
  // Short diagonal off the anchor, then a straight run to the edge.
  const kneeX = x + 42;
  return `M${x} ${y} L${kneeX} ${exitY} L${VB_W} ${exitY}`;
}

export function FeatureCompare() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const real = root.querySelector<SVGGElement>(".fc-set--real");
    const legacy = root.querySelector<SVGGElement>(".fc-set--legacy");
    const leaders = gsap.utils.toArray<SVGPathElement>(".fc-leader", root);
    const anchors = gsap.utils.toArray<SVGCircleElement>(".fc-anchor", root);
    const callouts = gsap.utils.toArray<HTMLElement>(".fc-callout", root);
    const labels = gsap.utils.toArray<SVGTextElement>(".fc-set-label", root);

    if (!real || !legacy) return;

    if (reduced) {
      gsap.set([real, legacy], { opacity: 1, scale: 1 });
      gsap.set([leaders, anchors, callouts, labels], { opacity: 1 });
      leaders.forEach((p) => p.style.removeProperty("stroke-dashoffset"));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(real, {
        scale: 0.78,
        opacity: 0,
        svgOrigin: `${REAL.cx} ${REAL.cy}`,
      });
      gsap.set(legacy, {
        scale: 0.5,
        opacity: 0,
        svgOrigin: `${LEGACY.cx} ${LEGACY.cy}`,
      });
      gsap.set([anchors, callouts, labels], { opacity: 0 });
      leaders.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 72%", once: true },
      });

      tl.to(real, { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" })
        .to(
          legacy,
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.3)" },
          "-=0.5",
        )
        .to(labels, { opacity: 1, duration: 0.4 }, "-=0.3")
        .to(
          anchors,
          { opacity: 1, duration: 0.3, stagger: 0.18 },
          "-=0.2",
        )
        .to(
          leaders,
          {
            strokeDashoffset: 0,
            duration: 0.7,
            ease: "power2.inOut",
            stagger: 0.18,
          },
          "<",
        )
        .to(
          callouts,
          { opacity: 1, duration: 0.5, stagger: 0.18, ease: "power2.out" },
          "-=0.6",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <Reveal>
      <div ref={rootRef} className="fc">
        <div className="fc-stage">
          {/* Decorative: the callouts beside it carry the meaning. */}
          <svg
            className="fc-svg"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="fc-real-fill" cx="42%" cy="40%" r="65%">
                <stop offset="0%" stopColor="var(--color-sky-soft)" stopOpacity="1" />
                <stop offset="70%" stopColor="var(--color-sky-soft)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--color-sky-soft)" stopOpacity="0.35" />
              </radialGradient>
              <radialGradient id="fc-legacy-fill" cx="55%" cy="55%" r="60%">
                <stop offset="0%" stopColor="var(--color-legacy-soft)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="var(--color-legacy-soft)" stopOpacity="0.55" />
              </radialGradient>
            </defs>

            <g className="fc-set fc-set--real">
              <circle
                cx={REAL.cx}
                cy={REAL.cy}
                r={REAL.r}
                fill="url(#fc-real-fill)"
                stroke="var(--color-sky)"
                strokeWidth="1.25"
              />
              <g fill="var(--color-sky)">
                {REAL_DOTS.map(([x, y, r, o], i) => (
                  <circle key={i} cx={x} cy={y} r={r} opacity={o} />
                ))}
              </g>
              <g fill="var(--color-sky)">
                {OVERLAP_DOTS.map(([x, y, r, o], i) => (
                  <circle key={i} cx={x} cy={y} r={r} opacity={o} />
                ))}
              </g>
              <text
                className="fc-set-label fc-set-label--real"
                x={REAL.cx - 60}
                y={REAL.cy - 130}
              >
                Metablify
              </text>
            </g>

            <g className="fc-set fc-set--legacy">
              <circle
                cx={LEGACY.cx}
                cy={LEGACY.cy}
                r={LEGACY.r}
                fill="url(#fc-legacy-fill)"
                stroke="var(--color-legacy)"
                strokeWidth="1.25"
              />
              <g fill="var(--color-legacy-ink)">
                {LEGACY_DOTS.map(([x, y, r, o], i) => (
                  <circle key={i} cx={x} cy={y} r={r} opacity={o} />
                ))}
              </g>
              <text
                className="fc-set-label fc-set-label--legacy"
                x={LEGACY.cx + 6}
                y={LEGACY.cy + 74}
                textAnchor="middle"
              >
                <tspan x={LEGACY.cx + 6}>Legacy</tspan>
                <tspan x={LEGACY.cx + 6} dy="14">
                  workflows
                </tspan>
              </text>
            </g>

            <g className="fc-leaders">
              {CALLOUTS.map((c) => (
                <g key={c.key} className={`fc-leader-group fc-leader-group--${c.tone}`}>
                  <path className="fc-leader" d={leaderPath(c)} />
                  <circle
                    className="fc-anchor"
                    cx={c.anchor[0]}
                    cy={c.anchor[1]}
                    r="4"
                  />
                </g>
              ))}
            </g>
          </svg>
        </div>

        <ol className="fc-callouts">
          {CALLOUTS.map((c) => (
            <li
              key={c.key}
              className={`fc-callout fc-callout--${c.tone}`}
              style={{ "--fc-y": `${(c.exitY / VB_H) * 100}%` } as React.CSSProperties}
            >
              <span className="fc-swatch" aria-hidden="true" />
              <p>{c.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
