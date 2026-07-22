"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "./Button";
import { ParticleField } from "./ParticleField";

export function ParallaxHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const start = () => {
      const ctx = gsap.context(() => {
        if (reduced) {
          gsap.set(".hero-anim", { opacity: 1, y: 0, filter: "none" });
          return;
        }

        gsap.set(".hero-anim", { opacity: 0, y: 40, filter: "blur(10px)" });

        const tl = gsap.timeline();
        tl.to(".hero-line-1", {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "power4.out",
        })
          .to(
            ".hero-line-2",
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.95,
              ease: "power4.out",
            },
            "-=0.7",
          )
          .to(
            ".hero-lead",
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.5",
          )
          .to(
            ".hero-cta",
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.45",
          )
          .to(
            ".hero-scroll-hint",
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 },
            "-=0.3",
          );

        gsap.to(".hero-parallax-slow", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-parallax-fast", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }, root);

      return () => ctx.revert();
    };

    let cleanup: (() => void) | undefined;
    const onReady = () => {
      cleanup = start();
    };

    window.addEventListener("metablify:ready", onReady, { once: true });
    const fallback = window.setTimeout(() => {
      if (!cleanup) cleanup = start();
    }, 3200);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("metablify:ready", onReady);
      cleanup?.();
    };
  }, []);

  return (
    <section ref={rootRef} className="hero-vireo relative overflow-hidden">
      <div className="hero-parallax-slow pointer-events-none absolute inset-0 bg-white" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-[90rem] items-center gap-8 px-5 py-12 md:px-10 md:py-14 lg:grid-cols-12 lg:gap-4 lg:px-16">
        <div className="hero-parallax-fast relative z-10 lg:col-span-6">
          <h1 className="display hero-headline">
            <span className="block hero-anim hero-line-1">See more in your</span>
            <span className="block hero-anim hero-line-2 text-ink">
              LC/MS data.
            </span>
          </h1>
          <p className="lead mt-8 !max-w-lg !text-lg hero-anim hero-lead">
            Metablify is an LC/MS platform built on the first principles of
            physics.
          </p>
          <div className="mt-12 flex flex-wrap gap-4 hero-anim hero-cta">
            <Button href="/platform">Explore Metablify</Button>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="hero-canvas-frame relative mx-auto aspect-square w-[72%] max-w-[18rem] sm:max-w-[22rem] md:w-full md:max-w-none md:aspect-[4/3]">
            <div className="absolute inset-0 z-0 lg:left-[-110%] lg:right-[-10%] lg:top-[-83%] lg:bottom-[-83%]">
              <ParticleField
                className="absolute inset-0"
                interactive
                showOrbits
                tone="green"
                transparent
                radiusScale={2}
                orbitScale={0.5}
                fieldOffsetX={0.14}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint hero-anim">
        <span>Scroll</span>
        <span className="hero-scroll-arrow" aria-hidden="true">
          ↓
        </span>
      </div>
    </section>
  );
}
