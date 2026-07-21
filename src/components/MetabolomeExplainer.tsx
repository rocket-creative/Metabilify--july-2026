"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ParticleField } from "./ParticleField";

const STAGES = [
  {
    label: "01 Cloud",
    title: "The detectable landscape",
    body: "Complex LC/MS datasets hold a vast field of mass features. Most of what is real is buried in noise.",
  },
  {
    label: "02 Sample",
    title: "What is actually in your sample",
    body: "Real mass features are present in your experiment. The question is whether your workflow can recover them.",
  },
  {
    label: "03 Legacy",
    title: "Legacy recovers only the overlap",
    body: "Conventional workflows may recover only a subset of detectable mass features, leaving discovery on the table.",
  },
  {
    label: "04 Metablify",
    title: "Amplify what is real",
    body: "Metablify reveals a broader set of real mass features across LC/MS datasets by amplifying consistent signals.",
  },
];

export function MetabolomeExplainer() {
  const orbitsRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  // Gate the sphere labels on the SAME desktop breakpoint as the .callout
  // boxes so both annotation layers appear together at every screen size.
  const [showLabels, setShowLabels] = useState(false);

  // Reveal the sphere (scale/opacity) once it scrolls into view.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setReady(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keep the sphere labels in lockstep with the desktop breakpoint used for
  // the .callout boxes (min-width: 810px).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 810px)");
    const sync = () => setShowLabels(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
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
      className="metabolome-section relative overflow-hidden py-20 md:py-28"
      aria-label="How Metablify recovers more real mass features"
    >
      <div className="mx-auto max-w-[90rem] px-5 md:px-10 lg:px-14">
        <p className="eyebrow mb-4">Why Metablify</p>
        <h2 className="display display-lg mb-10 max-w-3xl">
          Don’t leave real mass features in the noise.
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s) => (
            <div key={s.label} className="metabolome-step">
              <p className="eyebrow mb-2">{s.label}</p>
              <h3
                className="mb-2 text-xl text-ink md:text-2xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted md:text-base">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-14 w-full md:mt-20">
        <div
          ref={stageRef}
          className={`metabolome-stage metabolome-stage-wide relative w-full overflow-hidden ${ready ? "is-ready" : ""}`}
        >
          <ParticleField
            className="absolute inset-0"
            interactive
            showOrbits
            showLabels={showLabels}
            tone="green"
            reveal={1}
          />

          {/* Canvas is full-bleed, but the framing shells and callouts live in
              a centered overlay so they hug the centered sphere rather than
              drifting to the viewport edges. */}
          <div className="metabolome-annotations">
            <div ref={orbitsRef} className="metabolome-orbits" aria-hidden="true">
              <div className="metabolome-orbit-group">
                <span className="metabolome-ring metabolome-ring-1" />
                <span className="metabolome-ring metabolome-ring-2" />
                <span className="metabolome-ring metabolome-ring-3" />
              </div>
            </div>

            <div className="callout callout-main is-on">
              <span className="callout-line" aria-hidden="true" />
              <span className="callout-node" aria-hidden="true" />
              <p>
                Metablify reveals a{" "}
                <strong>broader set of real mass features</strong> across LC/MS
                datasets.
              </p>
            </div>
            <div className="callout callout-sample is-on">
              <span className="callout-line" aria-hidden="true" />
              <span className="callout-node" aria-hidden="true" />
              <p>Real mass features present in your sample</p>
            </div>
            <div className="callout callout-legacy is-on">
              <span className="callout-line" aria-hidden="true" />
              <span className="callout-node" aria-hidden="true" />
              <p>
                Legacy recovers only the <em>overlap</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
