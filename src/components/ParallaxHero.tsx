"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./Button";
import { ParticleField, type StoryPhase } from "./ParticleField";

gsap.registerPlugin(ScrollTrigger);

// Legacy compare circle is ~0.32 of the full orb. The dive lands there as a
// molecular texture, then the cloud shouts out to the full Metablify field.
const LEGACY_EXPANSION = 0.32;

export function ParallaxHero() {
  const rootRef = useRef<HTMLElement>(null);
  const leafRef = useRef<HTMLImageElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const idleTweensRef = useRef<gsap.core.Tween[]>([]);
  const expansionRef = useRef(LEGACY_EXPANSION);
  const storyPhaseRef = useRef<StoryPhase>("legacy");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const buildZoom = (section: HTMLElement) => {
      const stage = stageRef.current;
      const leaf = leafRef.current;
      if (!stage || !leaf) return;

      const focus = () => {
        const sectionTop = section.getBoundingClientRect().top;
        const box = leaf.getBoundingClientRect();
        const left = Math.max(box.left, 0);
        const right = Math.min(box.right, window.innerWidth);
        return {
          x: (left + right) / 2,
          y: box.top + box.height / 2 - sectionTop,
        };
      };

      const setOrigin = () => {
        const stageBox = stage.getBoundingClientRect();
        const sectionTop = section.getBoundingClientRect().top;
        const f = focus();
        const ox = ((f.x - stageBox.left) / stageBox.width) * 100;
        const oy = ((f.y - (stageBox.top - sectionTop)) / stageBox.height) * 100;
        gsap.set(stage, { transformOrigin: `${ox}% ${oy}%` });
      };

      const setIdlePaused = (paused: boolean) => {
        for (const tween of idleTweensRef.current) {
          tween.paused(paused);
        }
      };

      setOrigin();
      gsap.set([".hero-molecular-veil", ".hero-molecular-field"], { opacity: 0 });
      gsap.set(".reel-callouts", { opacity: 0, y: 28 });

      const reelStage =
        section.closest<HTMLElement>(".dive-reel-stage") ?? section;
      const eyebrow = section.querySelector<HTMLElement>(".reel-eyebrow");
      const headline = section.querySelector<HTMLElement>(".reel-headline");

      if (!eyebrow || !headline) return;

      const resetDiveState = () => {
        expansionRef.current = LEGACY_EXPANSION;
        storyPhaseRef.current = "legacy";
      };

      const mm = gsap.matchMedia();

      const scene = (depth: number, travel: string) => () => {
        gsap.set([eyebrow, headline, ".reel-callouts"], { opacity: 0, y: 28 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: reelStage,
            start: "top top",
            end: `+=${travel}`,
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              setOrigin();
            },
            onUpdate: (self) => {
              setIdlePaused(self.progress > 0);

              // Land on the legacy orb first; shout after callouts have a home.
              const shout = Math.min(
                1,
                Math.max(0, (self.progress - 0.58) / 0.22),
              );
              expansionRef.current =
                LEGACY_EXPANSION + (1 - LEGACY_EXPANSION) * shout;
              storyPhaseRef.current =
                shout > 0.45 ? "metablify" : "legacy";
            },
            onLeave: () => {
              gsap.set([eyebrow, headline, ".reel-callouts"], {
                clearProps: "transform,opacity",
              });
            },
            onEnterBack: () => {
              gsap.set([eyebrow, headline, ".reel-callouts"], {
                opacity: 1,
                y: 0,
              });
            },
            onLeaveBack: () => {
              resetDiveState();
              gsap.set([eyebrow, headline, ".reel-callouts"], {
                opacity: 0,
                y: 28,
              });
            },
          },
        });

        tl.fromTo(
          reelStage,
          { autoAlpha: 1 },
          { autoAlpha: 1, duration: 1, ease: "none" },
          0,
        );

        tl.to(".hero-scroll-hint", { opacity: 0, duration: 0.1, ease: "none" }, 0)
          .to(
            ".hero-copy",
            { opacity: 0, y: -70, filter: "blur(9px)", duration: 0.18, ease: "none" },
            0,
          )
          .to(
            stage,
            {
              scale: depth,
              x: () => window.innerWidth / 2 - focus().x,
              y: () => window.innerHeight / 2 - focus().y,
              duration: 0.48,
              ease: "none",
            },
            0,
          )
          .fromTo(
            leaf,
            { filter: "blur(0px) drop-shadow(0 26px 34px rgba(18, 50, 39, 0.16))" },
            {
              filter: "blur(26px) drop-shadow(0 26px 34px rgba(18, 50, 39, 0.16))",
              duration: 0.28,
              ease: "none",
            },
            0.12,
          )
          .fromTo(
            ".hero-molecular-veil",
            { opacity: 0 },
            { opacity: 1, duration: 0.2, ease: "none" },
            0.28,
          )
          // First particle orb comes into focus — callouts live on this field.
          .fromTo(
            ".hero-molecular-field",
            { opacity: 0, filter: "blur(14px)" },
            { opacity: 1, filter: "blur(0px)", duration: 0.14, ease: "none" },
            0.38,
          )
          .to(
            eyebrow,
            { opacity: 1, y: 0, duration: 0.1, ease: "none" },
            0.48,
          )
          .to(
            headline,
            { opacity: 1, y: 0, duration: 0.12, ease: "none" },
            0.52,
          )
          .to(
            ".reel-callouts",
            { opacity: 1, y: 0, duration: 0.14, ease: "none" },
            0.5,
          );
      };

      mm.add("(min-width: 810px)", scene(5.6, "170%"));
      mm.add("(max-width: 809px)", scene(4.2, "140%"));

      return () => {
        setIdlePaused(false);
        resetDiveState();
        mm.revert();
      };
    };

    const start = () => {
      let disposeZoom: (() => void) | undefined;
      const ctx = gsap.context(() => {
        if (reduced) {
          gsap.set(".hero-anim", { opacity: 1, y: 0, filter: "none" });
          gsap.set([".reel-eyebrow", ".reel-headline"], { opacity: 1, y: 0 });
          return;
        }

        gsap.set(".hero-anim", { opacity: 0, y: 40, filter: "blur(10px)" });
        gsap.set([".reel-eyebrow", ".reel-headline"], { opacity: 0, y: 36 });

        const tl = gsap.timeline();
        tl.to(".hero-line-1", {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "power4.out",
        })
          .to(
            ".hero-line-2",
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.95,
              ease: "power4.out",
            },
            "-=0.7",
          )
          .to(
            ".hero-lead",
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.5",
          )
          .to(
            ".hero-cta",
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.45",
          )
          .to(
            ".hero-scroll-hint",
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 },
            "-=0.3",
          );

        disposeZoom = buildZoom(root);
      }, root);

      return () => {
        disposeZoom?.();
        ctx.revert();
      };
    };

    let cleanup: (() => void) | undefined;
    const onReady = () => {
      cleanup = start();
    };

    window.addEventListener("metablify:ready", onReady, { once: true });
    const fallback = window.setTimeout(() => {
      if (!cleanup) cleanup = start();
    }, 3200);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("metablify:ready", onReady);
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    const leaf = leafRef.current;
    if (!leaf) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.set(leaf, { rotationY: -30 });

      idleTweensRef.current = [
        gsap.to(leaf, {
          rotationY: 30,
          duration: 11,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }),
        gsap.to(leaf, {
          rotationX: 9,
          duration: 7.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }),
        gsap.to(leaf, {
          rotationZ: 2.5,
          duration: 13,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }),
        gsap.to(leaf, {
          y: -22,
          duration: 5.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }),
      ];
    }, leaf);

    return () => {
      idleTweensRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="hero-vireo relative overflow-hidden">
      <div className="hero-parallax-slow pointer-events-none absolute inset-0 bg-white" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-[90rem] items-center gap-8 px-5 py-12 md:px-10 md:py-14 lg:grid-cols-12 lg:gap-4 lg:px-16">
        <div className="hero-copy hero-parallax-fast relative z-10 lg:col-span-6">
          <h1 className="display hero-headline">
            <span className="block hero-anim hero-line-1">See more in your</span>
            <span className="block hero-anim hero-line-2 text-ink">
              LC/MS data.
            </span>
          </h1>
          <p className="lead mt-8 !max-w-lg !text-lg hero-anim hero-lead">
            Metablify is an LC/MS platform built on the first principles of
            physics.
          </p>
          <div className="mt-12 flex flex-wrap gap-4 hero-anim hero-cta">
            <Button href="/platform">Explore Metablify</Button>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="hero-canvas-frame relative mx-auto aspect-[4/3] w-full lg:aspect-square">
            <div ref={stageRef} className="hero-leaf-stage" aria-hidden="true">
              <Image
                ref={leafRef}
                src="/images/hero-leaf.webp"
                alt=""
                width={857}
                height={454}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-molecular">
        <div className="hero-molecular-veil" aria-hidden="true" />
        <div className="hero-molecular-field" aria-hidden="true">
          <ParticleField
            className="h-full w-full"
            tone="mono"
            interactive={false}
            showOrbits
            showLabels
            forceLabels
            density={1.35}
            transparent
            storyPhaseRef={storyPhaseRef}
            expansionRef={expansionRef}
          />
        </div>

        <div className="hero-reel-copy">
          <p className="eyebrow reel-eyebrow mb-5">Why Metablify</p>
          <h2 className="display display-lg reel-headline">
            Don’t leave real mass features in the noise.
          </h2>
        </div>
      </div>

      <div className="hero-scroll-hint hero-anim">
        <span>Scroll</span>
        <span className="hero-scroll-arrow" aria-hidden="true">
          ↓
        </span>
      </div>
    </section>
  );
}
