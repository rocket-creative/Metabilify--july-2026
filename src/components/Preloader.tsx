"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

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

    tl.fromTo(
      ".preloader-mark",
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" },
    )
      .fromTo(
        ".preloader-word",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
        "-=0.35",
      )
      .fromTo(
        ".preloader-bar",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.85, ease: "power2.inOut" },
        "-=0.2",
      )
      .to(".preloader-inner", {
        y: -20,
        opacity: 0,
        duration: 0.45,
        ease: "power2.in",
      })
      .to(
        ".preloader",
        {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        },
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
        <div className="preloader-mark">
          <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
            <rect width="48" height="48" rx="4" fill="#1a1a1a" />
            <path
              d="M8 38 L14 28 L18 32 L24 12 L30 26 L34 20 L40 38 Z"
              fill="white"
              fillOpacity="0.95"
            />
          </svg>
        </div>
        <p className="preloader-word">Metablify</p>
        <div className="preloader-track">
          <div className="preloader-bar" />
        </div>
      </div>
    </div>
  );
}
