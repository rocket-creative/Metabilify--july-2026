"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

/**
 * The opening animation the CEO described: a field of noisy peaks that
 * collapses into one clean peak, then the mark and wordmark. Runs once per
 * page load and holds still; reduced-motion skips it.
 */
const NOISE_PEAKS: ReadonlyArray<readonly [number, number, number]> = [
  // x, apex height (from the baseline), half width
  [22, 22, 6],
  [40, 34, 7],
  [56, 18, 5],
  [74, 40, 8],
  [92, 26, 6],
  [108, 44, 7],
  [136, 38, 7],
  [154, 24, 6],
  [172, 46, 8],
  [190, 20, 5],
  [206, 36, 7],
  [222, 28, 6],
];

const BASE = 66;

function bell(x: number, h: number, w: number) {
  return `M${x - w} ${BASE} C${x - w * 0.45} ${BASE} ${x - w * 0.3} ${BASE - h} ${x} ${BASE - h} C${x + w * 0.3} ${BASE - h} ${x + w * 0.45} ${BASE} ${x + w} ${BASE}`;
}

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => {
      setDone(true);
      window.dispatchEvent(new Event("metablify:ready"));
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const raf = requestAnimationFrame(finish);
      return () => cancelAnimationFrame(raf);
    }

    const tl = gsap.timeline({ onComplete: finish });

    tl.set(".preloader-noise path", { opacity: 0, scaleY: 0.3, transformOrigin: "50% 100%" })
      .set(".preloader-real", { opacity: 0, scaleY: 0.15, transformOrigin: "50% 100%" })
      .set(".preloader-brand", { opacity: 0, y: 12 })
      // Noise rises.
      .to(".preloader-noise path", {
        opacity: 0.55,
        scaleY: 1,
        duration: 0.5,
        stagger: { each: 0.03, from: "random" },
        ease: "power2.out",
      })
      // The real feature rises through it.
      .to(
        ".preloader-real",
        { opacity: 1, scaleY: 1, duration: 0.7, ease: "power3.out" },
        "-=0.15",
      )
      // Noise crystallizes away.
      .to(
        ".preloader-noise path",
        {
          opacity: 0,
          scaleY: 0.1,
          duration: 0.55,
          stagger: { each: 0.02, from: "center" },
          ease: "power2.in",
        },
        "-=0.4",
      )
      .to(".preloader-brand", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.1")
      .to({}, { duration: 0.35 })
      .to(".preloader-inner", { y: -20, opacity: 0, duration: 0.4, ease: "power2.in" })
      .to(
        ".preloader",
        { yPercent: -100, duration: 0.85, ease: "power4.inOut" },
        "-=0.1",
      );

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-inner">
        <svg
          className="preloader-signal"
          viewBox="0 0 240 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="8" y1={BASE} x2="232" y2={BASE} opacity="0.25" />
          <g className="preloader-noise">
            {NOISE_PEAKS.map(([x, h, w]) => (
              <path key={x} d={bell(x, h, w)} />
            ))}
          </g>
          <path className="preloader-real" d={bell(120, 54, 12)} />
        </svg>
        <div className="preloader-brand">
          <div className="preloader-mark">
            <Image
              className="no-round"
              src="/images/logo-icon.png"
              alt=""
              width={333}
              height={333}
              priority
            />
          </div>
          <div className="preloader-word">
            <Image
              className="no-round"
              src="/images/logo-wordmark.png"
              alt=""
              width={1270}
              height={308}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
