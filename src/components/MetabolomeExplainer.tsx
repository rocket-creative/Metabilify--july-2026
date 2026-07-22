"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ParticleField, type StoryPhase } from "./ParticleField";

type Stage = 0 | 1 | 2;

const PHASES: StoryPhase[] = ["cloud", "legacy", "metablify"];

const STAGES: {
  stage: Stage;
  phase: StoryPhase;
  label: string;
  title: string;
  body: string;
}[] = [
  {
    stage: 0,
    phase: "cloud",
    label: "01 Noise",
    title: "Don’t leave real mass features in the noise.",
    body: "Large LC/MS datasets are noisy, complex, and difficult to align across samples. Real mass features can be missed, split, or buried in background signal.",
  },
  {
    stage: 1,
    phase: "legacy",
    label: "02 Legacy",
    title: "Legacy recovers only a subset",
    body: "Legacy workflows may recover only a subset of detectable mass features.",
  },
  {
    stage: 2,
    phase: "metablify",
    label: "03 Metablify",
    title: "Metablify reveals what is real",
    body: "Metablify reveals a broader set of real mass features across LC/MS datasets.",
  },
];

const STAGE_MS = 4500;

export function MetabolomeExplainer() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [stage, setStage] = useState<Stage>(0);
  const [ready, setReady] = useState(false);

  const storyPhase = PHASES[stage];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReady(true);

    if (reduced) {
      setStage(2);
      return;
    }

    const clearTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const startTimer = () => {
      clearTimer();
      if (!visibleRef.current) return;
      timerRef.current = setInterval(() => {
        setStage((prev) => ((prev + 1) % 3) as Stage);
      }, STAGE_MS);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const onScreen = entries.some((e) => e.isIntersecting);
        visibleRef.current = onScreen;
        if (onScreen) startTimer();
        else clearTimer();
      },
      { rootMargin: "80px", threshold: 0.15 },
    );

    io.observe(section);
    startTimer();

    return () => {
      clearTimer();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const group = orbitsRef.current?.querySelector<HTMLElement>(
      ".metabolome-orbit-group",
    );
    if (!group) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 810px)").matches;
    if (reduced || !isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.set(group, { transformPerspective: 1000 });
      gsap.to(group, {
        rotationY: 360,
        duration: 44,
        ease: "none",
        repeat: -1,
      });
      gsap.to(group, {
        rotationX: "+=6",
        duration: 9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, group);

    return () => ctx.revert();
  }, []);

  const goToStage = (next: Stage) => {
    setStage(next);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setStage((prev) => ((prev + 1) % 3) as Stage);
      }, STAGE_MS);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="metabolome-section"
      aria-label="How Metablify recovers more real mass features"
    >
      <div className="relative mx-auto max-w-[90rem] px-5 py-12 md:px-10 md:py-16 lg:px-14">
        <div className="metabolome-progress" role="tablist" aria-label="Story stages">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={stage === i}
              aria-label={`Show stage ${i + 1}`}
              className={`metabolome-dot ${stage >= i ? "is-active" : ""}`}
              onClick={() => goToStage(i as Stage)}
            />
          ))}
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Why Metablify</p>

            <div className="metabolome-stages">
              {STAGES.map((item) => (
                <div
                  key={item.label}
                  className={`stage-copy ${stage === item.stage ? "is-active" : ""}`}
                >
                  <p className="eyebrow mb-3">{item.label}</p>
                  <h2 className="display display-lg mb-4 text-ink">{item.title}</h2>
                  <p className="text-sm leading-relaxed text-muted md:text-base">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div
              className={`metabolome-stage relative aspect-[4/3] w-full md:aspect-[16/10] ${ready ? "is-ready" : ""}`}
              data-story-phase={storyPhase}
            >
              <ParticleField
                className="absolute inset-0"
                interactive
                showOrbits
                showLabels
                tone="green"
                storyPhase={storyPhase}
              />

              <div
                ref={orbitsRef}
                className="metabolome-orbits"
                aria-hidden="true"
              >
                <div className="metabolome-orbit-group">
                  <span className="metabolome-ring metabolome-ring-1" />
                  <span className="metabolome-ring metabolome-ring-2" />
                  <span className="metabolome-ring metabolome-ring-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
