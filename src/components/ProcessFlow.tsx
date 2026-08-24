"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./Button";
import {
  AnalyzeIcon,
  DefineIcon,
  DiscussIcon,
  ReviewIcon,
} from "./visuals/ProcessIcons";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  n: string;
  title: string;
  body: string;
  icon: React.ReactNode;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Discuss Your Project",
    body: "Tell us about your scientific objective, samples, existing data, and desired outputs.",
    icon: <DiscussIcon />,
  },
  {
    n: "02",
    title: "Define the Right Approach",
    body: "Together, we define the right analytical services, platform-development, or collaboration approach.",
    icon: <DefineIcon />,
  },
  {
    n: "03",
    title: "Put Metablify to Work",
    body: "Metablify processes and analyzes your LC/MS data to generate cleaner, aligned, and quantified mass-feature results.",
    icon: <AnalyzeIcon />,
  },
  {
    n: "04",
    title: "Review Results",
    body: "Review results with our team and identify next steps and opportunities for further analysis.",
    icon: <ReviewIcon />,
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

      // One sweep, sequenced into the reveal rather than looping. A perpetual
      // animation would keep a rAF alive while the section is off-screen, and it
      // reads as restless next to the rest of the page, which reveals once and
      // then holds still.
      if (spark && window.matchMedia("(min-width: 810px)").matches) {
        tl.to(
          spark,
          {
            keyframes: {
              "0%": { left: "0%", opacity: 0 },
              "12%": { opacity: 1 },
              "88%": { opacity: 1 },
              "100%": { left: "100%", opacity: 0 },
            },
            duration: 1.6,
            ease: "none",
          },
          0.15,
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="process-flow section-wide section-grey band-y"
      aria-label="Getting started with Metablify"
    >
      <div className="gutter-x mx-auto max-w-[80rem]">
        <div className="process-flow-head">
          <p className="eyebrow mb-4">How it works</p>
          <h2 className="display display-lg mb-5">
            Getting Started with Metablify is Simple.
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
                  <span className="process-flow-badge">{step.icon}</span>
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
