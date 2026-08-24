"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * Three regions of the diagram, in the order the numbered markers appear from
 * left to right. The legacy set straddles the boundary of the real-feature set,
 * so region 3 — what legacy workflows report that is not actually there — has
 * somewhere to live. Drawing legacy fully inside said the opposite.
 */
const regions = [
  {
    key: "1",
    label: "Real mass features",
    body: "Metablify reveals a broader set of real mass features across LC/MS datasets.",
    quiet: false,
  },
  {
    key: "2",
    label: "Detected by legacy",
    body: "Legacy workflows detect only a subset of real mass features.",
    quiet: true,
  },
  {
    key: "3",
    label: "Noise and artifacts",
    body: "A subset of mass features detected by legacy workflows are noise or artifacts.",
    quiet: true,
  },
] as const;

export function FeatureCompare() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ink = root.querySelector<HTMLElement>(".feature-compare-ink");
    const legacy = root.querySelector<HTMLElement>(".feature-compare-legacy");
    const rings = gsap.utils.toArray<HTMLElement>(".feature-compare-ring", root);
    const markers = gsap.utils.toArray<HTMLElement>(
      ".feature-compare-marker",
      root,
    );

    if (!ink || !legacy) return;

    if (reduced) {
      gsap.set([ink, legacy, rings], { opacity: 1, scale: 1 });
      gsap.set(markers, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(ink, { scale: 0.72, opacity: 0.35 });
      gsap.set(legacy, { scale: 0.4, opacity: 0 });
      gsap.set(rings, { scale: 0.85, opacity: 0 });
      // Markers are annotations, not shapes: they fade, they never scale, so
      // they stay centred on their region.
      gsap.set(markers, { opacity: 0 });

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
        .to(
          markers,
          {
            opacity: 1,
            duration: 0.45,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.15",
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
        {/* Decorative: the numbered legend below carries the meaning. */}
        <div className="feature-compare-stage" aria-hidden="true">
          <span className="feature-compare-ring" />
          <span className="feature-compare-ring" />
          <span className="feature-compare-ring" />
          <div className="feature-compare-ink" />
          <div className="feature-compare-legacy" />
          <span className="feature-compare-key feature-compare-marker feature-compare-marker--real">
            1
          </span>
          <span className="feature-compare-key feature-compare-marker feature-compare-marker--shared">
            2
          </span>
          <span className="feature-compare-key feature-compare-marker feature-compare-marker--noise">
            3
          </span>
        </div>

        <ol className="mt-10 grid list-none gap-8 p-0 md:grid-cols-3">
          {regions.map((region) => (
            <li key={region.key}>
              <div className="mb-2 flex items-center gap-2.5">
                <span className="feature-compare-key">{region.key}</span>
                <p
                  className={`eyebrow ${
                    region.quiet ? "feature-compare-label--quiet" : ""
                  }`}
                >
                  {region.label}
                </p>
              </div>
              <p className={region.quiet ? "text-muted" : "text-ink"}>
                {region.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
