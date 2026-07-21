"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const ANCHOR = "We make scale possible";

const SUPPORTING = [
  "aligned across samples",
  "signal from the noise",
  "the law of large numbers",
  "cleaner, aligned, and quantified mass-feature results",
];

// One full ribbon sequence: the anchor recurs between each supporting phrase.
const SEQUENCE: { text: string; anchor: boolean }[] = SUPPORTING.flatMap(
  (phrase) => [
    { text: ANCHOR, anchor: true },
    { text: phrase, anchor: false },
  ],
);

// --- Wave field geometry (SVG user units; stretched to full width/height) ---
// The field spans the whole band; lines are distributed both ABOVE and BELOW
// the centered marquee bar so it reads as floating in front of them.
const WAVE_VIEW_W = 1200;
const WAVE_VIEW_H = 200;
const WAVE_PATH_W = 2400; // 2x the viewBox so a one-wavelength shift never bares an edge

type WaveLine = {
  amp: number;
  wavelength: number;
  yMid: number;
  opacity: number;
  width: number;
  duration: number;
  startX: number;
  bob: number;
  bobDur: number;
};

// yMid values alternate above/below center (100). The middle ones sit behind
// the white bar (occluded); the outer ones peek above and below it.
const WAVE_LINES: WaveLine[] = [
  { amp: 14, wavelength: 400, yMid: 30, opacity: 0.9, width: 2, duration: 8, startX: 0, bob: 5, bobDur: 5 },
  { amp: 20, wavelength: 560, yMid: 170, opacity: 0.85, width: 2, duration: 13, startX: -120, bob: 6, bobDur: 7 },
  { amp: 22, wavelength: 520, yMid: 66, opacity: 0.45, width: 1.5, duration: 11, startX: -200, bob: 7, bobDur: 8 },
  { amp: 18, wavelength: 460, yMid: 134, opacity: 0.45, width: 1.5, duration: 9.5, startX: -300, bob: 5, bobDur: 6 },
  { amp: 28, wavelength: 640, yMid: 100, opacity: 0.22, width: 1.25, duration: 16, startX: -60, bob: 8, bobDur: 9 },
];

function wavePath(amp: number, wavelength: number, yMid: number): string {
  let d = `M 0 ${yMid.toFixed(2)}`;
  for (let x = 0; x <= WAVE_PATH_W; x += 8) {
    const y = yMid + amp * Math.sin((x / wavelength) * Math.PI * 2);
    d += ` L ${x} ${y.toFixed(2)}`;
  }
  return d;
}

function Dot() {
  return (
    <span className="mr-dot" aria-hidden="true">
      <svg width="6" height="6" viewBox="0 0 6 6" role="presentation">
        <circle cx="3" cy="3" r="3" fill="currentColor" />
      </svg>
    </span>
  );
}

function Track({ ariaHidden }: { ariaHidden: boolean }) {
  return (
    <div className="mr-track" aria-hidden={ariaHidden ? "true" : undefined}>
      {SEQUENCE.map((item, i) => (
        <span className="mr-item" key={`${item.text}-${i}`}>
          <span className={item.anchor ? "mr-anchor" : "mr-support"}>
            {item.text}
          </span>
          <Dot />
        </span>
      ))}
    </div>
  );
}

export function MarqueeRibbon() {
  const rootRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const scroller = scrollerRef.current;
    if (!root || !scroller) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const tweens: gsap.core.Tween[] = [];

    // --- Ticker: scroller holds two identical tracks, so xPercent -50 moves it
    // by exactly one track-width with no rounding -> a seamless loop. ---
    const firstTrack = scroller.querySelector<HTMLElement>(".mr-track");
    let tickerTween: gsap.core.Tween | null = null;

    const buildTicker = () => {
      tickerTween?.kill();
      const distance = firstTrack?.scrollWidth ?? 0;
      if (!distance) return;
      gsap.set(scroller, { xPercent: 0, x: 0 });
      tickerTween = gsap.to(scroller, {
        xPercent: -50,
        duration: distance / 85, // ~85px/sec
        ease: "none",
        repeat: -1,
      });
    };
    buildTicker();

    const onEnter = () => tickerTween?.pause();
    const onLeave = () => tickerTween?.resume();
    scroller.addEventListener("mouseenter", onEnter);
    scroller.addEventListener("mouseleave", onLeave);

    // --- Waves: each line drifts by exactly one wavelength (periodic -> seamless)
    // with an optional gentle vertical bob for an oceanic feel. ---
    const groups = gsap.utils.toArray<SVGGElement>(".mr-wave-group", root);
    groups.forEach((g, i) => {
      const cfg = WAVE_LINES[i];
      if (!cfg) return;
      gsap.set(g, { x: cfg.startX, y: 0 });
      tweens.push(
        gsap.to(g, {
          x: cfg.startX - cfg.wavelength,
          duration: cfg.duration,
          ease: "none",
          repeat: -1,
        }),
      );
      if (cfg.bob) {
        tweens.push(
          gsap.to(g, {
            y: cfg.bob,
            duration: cfg.bobDur,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          }),
        );
      }
    });

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(buildTicker);
    };
    window.addEventListener("resize", onResize);

    return () => {
      tickerTween?.kill();
      tweens.forEach((t) => t.kill());
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      scroller.removeEventListener("mouseenter", onEnter);
      scroller.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="mr-ribbon"
      aria-label="Metablify — we make scale possible"
    >
      {/* Green wave field spanning the whole band, sitting BEHIND the marquee
          so the white bar reads as floating in front of it in 3D. */}
      <div className="mr-waves" aria-hidden="true">
        <svg
          className="mr-waves-svg"
          viewBox={`0 0 ${WAVE_VIEW_W} ${WAVE_VIEW_H}`}
          preserveAspectRatio="none"
          role="presentation"
        >
          {WAVE_LINES.map((line, i) => (
            <g className="mr-wave-group" key={i}>
              <path
                d={wavePath(line.amp, line.wavelength, line.yMid)}
                fill="none"
                stroke="#ffffff"
                strokeWidth={line.width}
                strokeOpacity={line.opacity}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* White ticker bar — hard edges (no fade), floating over the waves. */}
      <div className="mr-ticker">
        {/* Static, screen-reader-friendly line. Always visible if JS fails and
            the sole non-animated copy under reduced motion. */}
        <div className="mr-reduced">
          <span className="mr-anchor">{ANCHOR}</span>
          <Dot />
          <span className="mr-support">{SUPPORTING[0]}</span>
        </div>

        <div className="mr-viewport">
          <div className="mr-scroller" ref={scrollerRef}>
            <Track ariaHidden={false} />
            <Track ariaHidden={true} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MarqueeRibbon;
