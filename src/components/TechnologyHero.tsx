"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

const CLIPS = ["01-plants.mp4", "02-soil.mp4", "03-researchers.mp4"] as const;
const FADE_MS = 800;

type Size = "mobile" | "tablet" | "desktop";

function sizeFor(width: number): Size {
  if (width <= 767) return "mobile";
  if (width <= 1279) return "tablet";
  return "desktop";
}

function clipSrc(size: Size, index: number) {
  return `/videos/technology/${size}/${CLIPS[index]}`;
}

/**
 * Full-bleed hero for /technology. Three lab clips crossfade on a loop,
 * muted, with no player chrome. One encode is chosen for the viewport so a
 * phone does not download the desktop files.
 */
export function TechnologyHero() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const slotA = useRef<HTMLVideoElement>(null);
  const slotB = useRef<HTMLVideoElement>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [front, setFront] = useState(0);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const apply = () => setSize(sizeFor(window.innerWidth));
    apply();
    const queries = [window.matchMedia("(max-width: 767px)"), window.matchMedia("(max-width: 1279px)")];
    for (const query of queries) query.addEventListener("change", apply);
    return () => {
      for (const query of queries) query.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    if (!size || reduce !== false) return;
    const a = slotA.current;
    const b = slotB.current;
    if (!a || !b) return;

    const slots = [a, b];
    let frontSlot = 0;
    let clip = 0;
    let fading = false;
    let playing = false;
    let seen = false;
    let raf = 0;
    let fadeTimer = 0;
    const visible = { el: a as HTMLVideoElement };

    const prepare = (el: HTMLVideoElement, index: number) => {
      el.muted = true;
      el.src = clipSrc(size, index);
      el.preload = "auto";
      el.load();
    };

    setFront(0);
    setArmed(false);
    prepare(a, 0);
    prepare(b, 1);

    const arm = () => setArmed(true);
    a.addEventListener("playing", arm);

    const advance = () => {
      if (fading) return;
      fading = true;
      const nextSlot = frontSlot === 0 ? 1 : 0;
      const nextEl = slots[nextSlot];
      const prevEl = slots[frontSlot];
      nextEl.currentTime = 0;
      const pending = nextEl.play();
      if (pending) pending.catch(() => {});
      visible.el = nextEl;
      frontSlot = nextSlot;
      clip = (clip + 1) % CLIPS.length;
      setFront(frontSlot);
      fadeTimer = window.setTimeout(() => {
        prevEl.pause();
        fading = false;
        prepare(prevEl, (clip + 1) % CLIPS.length);
      }, FADE_MS);
    };

    const onEnded = (event: Event) => {
      if (event.currentTarget !== visible.el) return;
      advance();
    };
    a.addEventListener("ended", onEnded);
    b.addEventListener("ended", onEnded);

    const tick = () => {
      if (!playing) return;
      const el = visible.el;
      if (el.duration && Number.isFinite(el.duration)) {
        const remain = el.duration - el.currentTime;
        if (remain <= FADE_MS / 1000 + 0.05) advance();
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (playing) return;
      playing = true;
      const pending = visible.el.play();
      if (pending) pending.catch(() => {});
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      playing = false;
      cancelAnimationFrame(raf);
      a.pause();
      b.pause();
    };
    const sync = () => {
      if (!document.hidden && seen) start();
      else stop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        seen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.08 },
    );
    if (rootRef.current) io.observe(rootRef.current);
    document.addEventListener("visibilitychange", sync);

    return () => {
      stop();
      window.clearTimeout(fadeTimer);
      a.removeEventListener("playing", arm);
      a.removeEventListener("ended", onEnded);
      b.removeEventListener("ended", onEnded);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [size, reduce]);

  const showVideo = size !== null && reduce === false;

  return (
    <section ref={rootRef} className="tech-hero section-forest">
      <picture className="tech-hero-poster">
        <source media="(max-width: 767px)" srcSet="/videos/technology/mobile/poster.webp" />
        <source media="(max-width: 1279px)" srcSet="/videos/technology/tablet/poster.webp" />
        <img src="/videos/technology/desktop/poster.webp" alt="" />
      </picture>

      {showVideo ? (
        <>
          <video
            ref={slotA}
            className={`tech-hero-video${front === 0 && armed ? " is-on" : ""}`}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <video
            ref={slotB}
            className={`tech-hero-video${front === 1 && armed ? " is-on" : ""}`}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </>
      ) : null}

      <div className="tech-hero-copy">
        <Reveal className="tech-hero-card">
          <p className="eyebrow mb-4">The Metablify Technology</p>
          <h1 className="display display-lg tech-hero-title">
            First Principles and AI Find and Amplify Real Mass Features
          </h1>
          <p className="lead mt-6">
            Metablify combines the first principles of physics with AI to align, pool, and amplify
            consistent signal across complex LC/MS datasets, so real mass features can be detected
            with confidence amid the noise.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/discuss" variant="on-green">
              Discuss a Project
            </Button>
            <Button href="/applications" variant="secondary">
              Explore Applications
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
