"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./Button";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  n: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Discuss Your Project",
    body: "Tell us about your scientific objective, samples, existing data, and desired outputs.",
  },
  {
    n: "02",
    title: "Choose the Right Approach",
    body: "We define an analytical-services project, platform-development program, or strategic collaboration.",
  },
  {
    n: "03",
    title: "Put Metablify to Work",
    body: "Metablify processes and analyzes the LC/MS data to produce cleaner, aligned, and quantified mass-feature results.",
  },
  {
    n: "04",
    title: "Review Results",
    body: "Work with our team to understand the outputs, prioritize next steps, and identify opportunities for further analysis.",
  },
];

export function ProcessFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const sparkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const steps = gsap.utils.toArray<HTMLElement>(".process-flow-step", track);
    const orbits = gsap.utils.toArray<HTMLElement>(".process-flow-orbit", track);
    const rail = railRef.current;
    const spark = sparkRef.current;

    if (reduced) {
      gsap.set(steps, { opacity: 1, y: 0 });
      if (rail) gsap.set(rail, { scaleX: 1, opacity: 1 });
      if (spark) gsap.set(spark, { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(steps, { opacity: 0, y: 28 });
      if (rail)
        gsap.set(rail, { scaleX: 0, opacity: 1, transformOrigin: "left center" });
      if (spark) gsap.set(spark, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      if (rail) {
        tl.to(rail, { scaleX: 1, duration: 0.9, ease: "power3.out" }, 0);
      }
      tl.to(
        steps,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.14,
        },
        0.1,
      );

      if (spark && window.matchMedia("(min-width: 810px)").matches) {
        gsap.to(spark, {
          keyframes: {
            "0%": { left: "0%", opacity: 0 },
            "10%": { opacity: 1 },
            "90%": { opacity: 1 },
            "100%": { left: "100%", opacity: 0 },
          },
          duration: 3.6,
          ease: "none",
          repeat: -1,
          repeatDelay: 0.5,
          delay: 1,
        });
      }

      orbits.forEach((orbit, i) => {
        gsap.to(orbit, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 14 + i * 3,
          ease: "none",
          repeat: -1,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="process-flow section-wide band-y"
      aria-label="Getting started with Metablify"
    >
      <div className="gutter-x mx-auto max-w-[80rem]">
        <div className="process-flow-head">
          <p className="eyebrow mb-4">How it works</p>
          <h2 className="display display-lg mb-5">
            Getting Started with Metablify is Easy
          </h2>
          <p className="lead">
            Bring us your samples, LC/MS data, or a challenging workflow. We
            will help define the right path forward.
          </p>
        </div>

        <div className="process-flow-track-wrap">
          <span ref={railRef} className="process-flow-rail" aria-hidden="true">
            <span ref={sparkRef} className="process-flow-spark" />
          </span>

          <ol ref={trackRef} className="process-flow-track">
            {STEPS.map((step) => (
              <li key={step.n} className="process-flow-step">
                <span className="process-flow-marker">
                  <span className="process-flow-node">
                    <span className="process-flow-orbit" aria-hidden="true" />
                    <span
                      className="process-flow-node-core"
                      aria-hidden="true"
                    />
                  </span>
                </span>
                <div className="process-flow-copy">
                  <p className="process-flow-num">{step.n}</p>
                  <h3 className="process-flow-step-title">{step.title}</h3>
                  <p className="process-flow-step-body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="process-flow-cta">
          <Button href="/discuss">Discuss Your Project</Button>
        </div>
      </div>
    </section>
  );
}
