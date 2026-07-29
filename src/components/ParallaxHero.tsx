"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Button } from "./Button";

export function ParallaxHero() {
  const rootRef = useRef<HTMLElement>(null);
  const leafRef = useRef<HTMLImageElement>(null);

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

  useEffect(() => {
    const leaf = leafRef.current;
    if (!leaf) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.set(leaf, { rotationY: -30 });

      // A flat plane turning a full circle goes edge on and vanishes twice a
      // revolution, so the turn oscillates inside a range instead. The three
      // axes run on different periods so the drift never visibly loops.
      gsap.to(leaf, {
        rotationY: 30,
        duration: 11,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      // The tilt and roll are kept shallow. Both swell the leaf's on screen
      // box, and roll swells it most because the leaf is nearly twice as wide
      // as it is tall, so a few degrees adds real height at this size.
      gsap.to(leaf, {
        rotationX: 9,
        duration: 7.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(leaf, {
        rotationZ: 2.5,
        duration: 13,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(leaf, {
        y: -22,
        duration: 5.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, leaf);

    return () => ctx.revert();
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
          <div className="hero-canvas-frame relative mx-auto aspect-[4/3] w-full lg:aspect-square">
            <div className="hero-leaf-stage" aria-hidden="true">
              <Image
                ref={leafRef}
                src="/images/hero-leaf.webp"
                alt=""
                width={857}
                height={454}
                priority
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
