"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CleanPeaksVisual,
  LcmsVisual,
  RawSignalVisual,
  SamplesVisual,
  WellPlateVisual,
} from "./visuals/JourneyVisuals";

gsap.registerPlugin(ScrollTrigger);

/**
 * The "zoom in" the CEO and the team asked for: broad sample types, down to a
 * 96-well plate, through the instrument, into noisy signal, out as clean,
 * aligned mass features. Copy follows the working diagram brief and stops at
 * mass features — no identified metabolites, no biomarkers.
 */
type Stage = {
  n: string;
  key: string;
  title: string;
  body: string;
  visual: React.ReactNode;
};

const STAGES: Stage[] = [
  {
    n: "01",
    key: "samples",
    title: "Diverse Samples",
    body: "Blood and plasma, cells and tissue, leaves and roots, soil and water, microbial cultures. Any sample an LC/MS instrument can run.",
    visual: <SamplesVisual />,
  },
  {
    n: "02",
    key: "plate",
    title: "Prepared at Scale",
    body: "Samples are prepared in 96-well plates so that hundreds of runs can move through one experiment.",
    visual: <WellPlateVisual />,
  },
  {
    n: "03",
    key: "lcms",
    title: "High-Throughput LC/MS",
    body: "Each well flows through liquid chromatography and into the mass spectrometer, producing thousands of raw signals per run.",
    visual: <LcmsVisual />,
  },
  {
    n: "04",
    key: "raw",
    title: "Dense, Noisy Signal",
    body: "The output is complex. Real mass features sit alongside noise, artifacts, and drift from sample to sample.",
    visual: <RawSignalVisual />,
  },
  {
    n: "05",
    key: "clean",
    title: "Clean, Aligned Mass Features",
    body: "Metablify aligns signals across every sample, pools consistent evidence, and amplifies what is real, so results are ready for downstream analysis.",
    visual: <CleanPeaksVisual />,
  },
];

export function SampleJourney() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stages = gsap.utils.toArray<HTMLElement>(".journey-stage", root);
    const rail = root.querySelector<HTMLElement>(".journey-rail-fill");
    const indexItems = gsap.utils.toArray<HTMLElement>(".journey-index-item", root);

    const setActive = (i: number) => {
      indexItems.forEach((el, j) => el.classList.toggle("is-active", i === j));
      stages.forEach((el, j) => el.classList.toggle("is-active", i === j));
    };

    const ctx = gsap.context(() => {
      stages.forEach((stage, i) => {
        // Which stage is "current" drives the index on the left. This is a
        // class toggle, not a tween, so it is fine under reduced motion.
        ScrollTrigger.create({
          trigger: stage,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });

        if (reduced) {
          gsap.set(stage, { opacity: 1, y: 0 });
          return;
        }

        const visual = stage.querySelector(".journey-visual");
        gsap.set(stage, { opacity: 0, y: 32 });
        if (visual) gsap.set(visual, { scale: 1.06, transformOrigin: "50% 50%" });

        gsap
          .timeline({
            scrollTrigger: { trigger: stage, start: "top 78%", once: true },
          })
          .to(stage, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" })
          .to(
            visual,
            { scale: 1, duration: 1.1, ease: "power3.out" },
            "<",
          );
      });

      // The rail fills as the reader moves down, so the page reads as one
      // continuous flow from sample to result. Scrubbed, so no loop.
      if (rail) {
        gsap.set(rail, { scaleY: reduced ? 1 : 0, transformOrigin: "top center" });
        if (!reduced) {
          gsap.to(rail, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.querySelector(".journey-stages"),
              start: "top 60%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          });
        }
      }
    }, root);

    setActive(0);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="journey section-wide band-y"
      aria-labelledby="journey-heading"
    >
      <div className="gutter-x mx-auto max-w-[80rem]">
        <div className="journey-layout">
          <div className="journey-aside">
            <div className="journey-aside-inner">
              <p className="eyebrow mb-4">From samples to mass features</p>
              <h2 id="journey-heading" className="display display-md mb-6">
                From Complex Samples to High-Confidence Mass Features.
              </h2>
              <p className="lead mb-8">
                One experiment, followed from the sample in the tube to the
                mass features Metablify returns.
              </p>
              <ol className="journey-index" aria-hidden="true">
                {STAGES.map((s) => (
                  <li key={s.key} className="journey-index-item">
                    <span className="journey-index-num">{s.n}</span>
                    <span className="journey-index-title">{s.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="journey-stages-wrap">
            <span className="journey-rail" aria-hidden="true">
              <span className="journey-rail-fill" />
            </span>
            <ol className="journey-stages">
              {STAGES.map((s) => (
                <li key={s.key} className={`journey-stage journey-stage--${s.key}`}>
                  <div className="journey-visual">{s.visual}</div>
                  <div className="journey-copy">
                    <p className="journey-num">{s.n}</p>
                    <h3 className="journey-title">{s.title}</h3>
                    <p className="journey-body">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
