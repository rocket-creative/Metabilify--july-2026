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
      // On mobile (and reduced motion) skip the pinned scrollytelling and show
      // the full, stacked story so the copy never overlaps.
      if (reduced || !isDesktop) {
        setReady(true);
        setStage(3);
        progressRef.current = 1;
        return;
      }

      // Pin an inner element rather than the section itself. The section is a
      // direct child of <main>, so if GSAP wrapped it in a pin-spacer, React
      // would fail to remove it on route change ("removeChild ... not a child").
      // Keeping the pin-spacer inside the section avoids that crash.
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=220%",
        pin: pinEl,
        scrub: 0.65,
        anticipatePin: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          if (self.progress < 0.22) setStage(0);
          else if (self.progress < 0.48) setStage(1);
          else if (self.progress < 0.72) setStage(2);
          else setStage(3);
        },
        onEnter: () => setReady(true),
        onEnterBack: () => setReady(true),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Ambient 3D depth: slowly rotate the orbital shells that frame the point
  // cloud so the visual reads as a dimensional sphere rather than a flat disc.
  // GSAP owns the transforms; reduced motion / mobile leave the shells static
  // but still visible (no opacity/visibility set here or in CSS).
  useEffect(() => {
    const group = orbitsRef.current?.querySelector<HTMLElement>(
      ".metabolome-orbit-group",
    );
    if (!group) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 810px)").matches;
    if (reduced || !isDesktop) return;

    // Only the group is animated. The rings keep their CSS 3D tilt (rotateX /
    // rotateY); rotating the group in 3D orbits those tilted shells so the
    // cloud reads dimensional. Animating the rings directly would let GSAP
    // overwrite their tilt transform, so we intentionally leave them to CSS.
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

        <div className="relative mx-auto flex min-h-[100svh] max-w-[90rem] flex-col justify-center px-5 py-16 md:px-10 lg:px-14">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Why Metablify</p>
            <h2 className="display display-lg mb-6">
              Don’t leave real mass features in the noise.
            </h2>

            <div className="metabolome-stages">
              <StageCopy
                active={stage === 0}
                label="01 Cloud"
                title="The detectable landscape"
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
      <p className="eyebrow mb-2">{label}</p>
      <h3
        className="mb-2 text-xl text-ink md:text-2xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted md:text-base">{body}</p>
    </div>
  );
}
