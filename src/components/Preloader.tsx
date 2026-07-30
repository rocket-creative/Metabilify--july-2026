"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
          <Image
            className="no-round"
            src="/images/logo-icon.png"
            alt=""
            width={373}
            height={400}
            priority
          />
        </div>
        <div className="preloader-word">
          <Image
            className="no-round"
            src="/images/logo-wordmark.png"
            alt=""
            width={873}
            height={237}
            priority
          />
        </div>
        <div className="preloader-track">
          <div className="preloader-bar" />
        </div>
      </div>
    </div>
  );
}
