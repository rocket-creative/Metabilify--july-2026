"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

export function FeatureCompare() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ink = root.querySelector<HTMLElement>(".feature-compare-ink");
    const legacy = root.querySelector<HTMLElement>(".feature-compare-legacy");
    const rings = gsap.utils.toArray<HTMLElement>(".feature-compare-ring", root);

    if (!ink || !legacy) return;

    if (reduced) {
      gsap.set([ink, legacy, rings], { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(ink, { scale: 0.72, opacity: 0.35 });
      gsap.set(legacy, { scale: 0.4, opacity: 0 });
      gsap.set(rings, { scale: 0.85, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          once: true,
        },
      });

      tl.to(ink, {
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
      })
        .to(
          legacy,
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(1.4)",
          },
          "-=0.45",
        )
        .add(() => {
          gsap.to(ink, {
            scale: 1.035,
            duration: 2.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          rings.forEach((ring, i) => {
            gsap.to(ring, {
              scale: 1.28,
              opacity: 0,
              duration: 3.2,
              ease: "power1.out",
              repeat: -1,
              delay: i * 1.05,
            });
          });
        });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <Reveal>
      <div ref={rootRef} className="relative mx-auto max-w-3xl py-8">
        <div className="relative mx-auto aspect-square max-w-md">
          <span className="feature-compare-ring" aria-hidden="true" />
          <span className="feature-compare-ring" aria-hidden="true" />
          <span className="feature-compare-ring" aria-hidden="true" />
          <div className="feature-compare-ink absolute inset-[8%] rounded-full bg-ink" />
          <div
            className="feature-compare-legacy absolute left-[38%] top-[40%] h-[28%] w-[28%] rounded-full bg-stone"
            style={{ boxShadow: "0 0 0 3px white" }}
          />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-2">Metablify</p>
            <p className="text-ink">
              Metablify reveals a broader set of real mass features across LC/MS
              datasets.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2" style={{ color: "var(--color-faint)" }}>
              Legacy workflows
            </p>
            <p className="text-muted">
              Legacy workflows may recover only a subset of detectable mass
              features.
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
