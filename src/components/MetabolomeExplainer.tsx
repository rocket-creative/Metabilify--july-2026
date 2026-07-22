"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParticleField } from "./ParticleField";

gsap.registerPlugin(ScrollTrigger);

type Stage = 0 | 1 | 2 | 3;

export function MetabolomeExplainer() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [stage, setStage] = useState<Stage>(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const pinEl = pinRef.current;
    if (!section || !pinEl) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isDesktop = window.matchMedia("(min-width: 810px)").matches;

    const ctx = gsap.context(() => {
      if (reduced || !isDesktop) {
        setReady(true);
        setStage(3);
        progressRef.current = 1;
        return;
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        end: "bottom 22%",
        scrub: 0.65,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          if (self.progress < 0.25) setStage(0);
          else if (self.progress < 0.5) setStage(1);
          else if (self.progress < 0.75) setStage(2);
          else setStage(3);
        },
        onEnter: () => setReady(true),
        onEnterBack: () => setReady(true),
      });
    }, section);

    return () => ctx.revert();
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

  return (
    <section
      ref={sectionRef}
      className="metabolome-section relative overflow-hidden"
      aria-label="How Metablify recovers more real mass features"
    >
      <div ref={pinRef} className="relative">
        <div className="metabolome-progress" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`metabolome-dot ${stage >= i ? "is-active" : ""}`}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-[90rem] px-5 py-14 md:px-10 md:py-20 lg:px-14">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Why Metablify</p>

            <div className="metabolome-stages">
              <StageCopy
                active={stage === 0}
                label="01 Cloud"
                title="Don’t leave real mass features in the noise."
                body="Complex LC/MS datasets hold a vast field of mass features. Most of what is real is buried in noise."
              />
              <StageCopy
                active={stage === 1}
                label="02 Sample"
                title="What is actually in your sample"
                body="Real mass features are present in your experiment. The question is whether your workflow can recover them."
              />
              <StageCopy
                active={stage === 2}
                label="03 Legacy"
                title="Legacy recovers only the overlap"
                body="Conventional workflows may recover only a subset of detectable mass features, leaving discovery on the table."
              />
              <StageCopy
                active={stage === 3}
                label="04 Metablify"
                title="Amplify what is real"
                body="Metablify reveals a broader set of real mass features across LC/MS datasets by amplifying consistent signals."
              />
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div
              className={`metabolome-stage relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/11] ${ready ? "is-ready" : ""}`}
            >
              <ParticleField
                className="absolute inset-0"
                interactive
                showOrbits
                showLabels
                tone="green"
                reveal={stage >= 1 ? 1 : 0}
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
      </div>
    </section>
  );
}

function StageCopy({
  active,
  label,
  title,
  body,
}: {
  active: boolean;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className={`stage-copy ${active ? "is-active" : ""}`}>
      <p className="eyebrow mb-3">{label}</p>
      <h2 className="display display-lg mb-4 text-ink">{title}</h2>
      <p className="text-sm leading-relaxed text-muted md:text-base">{body}</p>
    </div>
  );
}
