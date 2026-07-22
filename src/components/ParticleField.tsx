"use client";

import { useEffect, useRef } from "react";

type Particle = {
  bx: number;
  by: number;
  bz: number;
  size: number;
  a: number;
  hi: boolean;
  ox: number;
  oy: number;
  ovx: number;
  ovy: number;
  seed: number;
};

type Flare = {
  ang: number;
  r: number;
  vr: number;
  va: number;
  life: number;
  decay: number;
  size: number;
};

export type StoryPhase = "cloud" | "legacy" | "metablify";

type Props = {
  className?: string;
  interactive?: boolean;
  showOrbits?: boolean;
  showLabels?: boolean;
  density?: number;
  tone?: "blue" | "green";
  flares?: boolean;
  reveal?: number;
  transparent?: boolean;
  radiusScale?: number;
  orbitScale?: number;
  fieldOffsetX?: number;
  storyPhase?: StoryPhase;
};

const PI2 = Math.PI * 2;

export function ParticleField({
  className = "",
  interactive = true,
  showOrbits = true,
  showLabels = false,
  density = 1,
  tone = "blue",
  flares = false,
  reveal = 1,
  transparent = false,
  radiusScale = 1,
  orbitScale = 1,
  fieldOffsetX = 0,
  storyPhase,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  const showOrbitsRef = useRef(showOrbits);
  const showLabelsRef = useRef(showLabels);
  const revealRef = useRef(reveal);
  const storyPhaseRef = useRef(storyPhase);

  useEffect(() => {
    showOrbitsRef.current = showOrbits;
    showLabelsRef.current = showLabels;
    revealRef.current = reveal;
    storyPhaseRef.current = storyPhase;
  }, [showOrbits, showLabels, reveal, storyPhase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = true;
    let visible = true;
    let w = 0;
    let h = 0;
    let t = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let flareList: Flare[] = [];

    let sampleLensAlpha = 0;
    let legacyLensAlpha = 0;
    let labelAlphas = [0, 0, 0];
    let radiusMul = 1;
    let fieldAlpha = 1;

    const mouse = { x: -9999, y: -9999, active: false };

    const lerp = (current: number, target: number, amount: number) =>
      reduced ? target : current + (target - current) * amount;

    const phaseTargets = (labelsFit: boolean) => {
      const phase = storyPhaseRef.current;
      if (!phase) {
        const o = (showOrbitsRef.current ? 1 : 0) * revealRef.current;
        const l =
          (showLabelsRef.current && labelsFit ? 1 : 0) * revealRef.current;
        return {
          sampleLens: o,
          legacyLens: o,
          labels: [l, l, l] as [number, number, number],
          radiusMul: 1,
          fieldAlpha: 1,
        };
      }

      const labelOn = showLabelsRef.current && labelsFit ? 1 : 0;
      switch (phase) {
        case "cloud":
          return {
            // Outer rings stay visible in every stage for the art direction
            sampleLens: 1,
            legacyLens: 0.55,
            labels: [0, 0, 0] as [number, number, number],
            radiusMul: 0.96,
            fieldAlpha: 0.78,
          };
        case "legacy":
          return {
            sampleLens: 1,
            legacyLens: 1,
            labels: [0, labelOn, 0] as [number, number, number],
            radiusMul: 0.98,
            fieldAlpha: 0.85,
          };
        case "metablify":
          return {
            sampleLens: 1,
            legacyLens: 0.85,
            labels: [0, labelOn * 0.7, labelOn] as [number, number, number],
            radiusMul: 1.04,
            fieldAlpha: 1,
          };
      }
    };

    const palette =
      tone === "green"
        ? {
            bg: "#ffffff",
            glow: "rgba(150,190,110,0.28)",
            rim: "rgba(26,78,48,0.7)",
            rimSoft: "rgba(26,78,48,0.18)",
            flare: "rgba(170,214,92,",
            hiProb: 0.3,
          }
        : {
            bg: "#ffffff",
            glow: "rgba(196,222,249,0.4)",
            rim: "rgba(42,96,190,0.6)",
            rimSoft: "rgba(42,96,190,0.16)",
            flare: "rgba(120,180,235,",
            hiProb: 0.45,
          };

    const makeSprite = (core: string, mid: string, edge: string) => {
      const s = document.createElement("canvas");
      const S = 40;
      s.width = S;
      s.height = S;
      const c = s.getContext("2d");
      if (c) {
        const g = c.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
        g.addColorStop(0, core);
        g.addColorStop(0.45, mid);
        g.addColorStop(1, edge);
        c.fillStyle = g;
        c.fillRect(0, 0, S, S);
      }
      return s;
    };

    const whiteSprite = makeSprite(
      "rgba(255,255,255,1)",
      "rgba(226,240,252,0.55)",
      "rgba(210,232,250,0)",
    );
    const blueSprite = makeSprite(
      "rgba(120,180,235,1)",
      "rgba(70,130,205,0.5)",
      "rgba(50,110,190,0)",
    );
    const greenSprite = makeSprite(
      "rgba(26,78,48,1)",
      "rgba(40,110,64,0.5)",
      "rgba(60,140,80,0)",
    );
    const limeSprite = makeSprite(
      "rgba(176,214,96,1)",
      "rgba(150,200,80,0.5)",
      "rgba(150,200,80,0)",
    );

    const baseSprite = tone === "green" ? greenSprite : blueSprite;
    const hiSprite = tone === "green" ? limeSprite : whiteSprite;

    const geometry = (shiftField = true) => {
      const cx = w * 0.5 + (shiftField ? fieldOffsetX * w : 0);
      const cy = h * 0.5;
      const R =
        Math.min(w, h) *
        (showLabelsRef.current ? 0.26 : 0.3) *
        radiusScale *
        radiusMul;
      return { cx, cy, R };
    };

    const perfFactor = () => {
      const vw = window.innerWidth;
      return vw < 700 ? 0.28 : vw < 1100 ? 0.6 : 1;
    };

    const seed = () => {
      const perf = perfFactor();
      const count = Math.floor(
        Math.min(9000, Math.max(2200, (w * h) / 40)) * density * perf,
      );
      particles = [];
      for (let i = 0; i < count; i++) {
        const u = Math.random() * 2 - 1;
        const th = Math.random() * PI2;
        const s = Math.sqrt(1 - u * u);
        const dx = s * Math.cos(th);
        const dy = s * Math.sin(th);
        const dz = u;

        let rs: number;
        let a: number;
        let size: number;
        const roll = Math.random();
        if (roll < 0.7) {
          rs = 0.9 + Math.random() * 0.12;
          a = 0.5 + Math.random() * 0.5;
          size = 0.6 + Math.random() * 1.8;
        } else if (roll < 0.88) {
          rs = Math.random() * 0.85;
          a = 0.14 + Math.random() * 0.28;
          size = 0.5 + Math.random() * 1.2;
        } else {
          rs = 1 + Math.random() * 0.28;
          a = 0.32 * Math.max(0.1, 1 - (rs - 1) / 0.28);
          size = 0.5 + Math.random() * 1.4;
        }

        if (Math.random() < 0.05) size += 2.6 + Math.random() * 2.2;

        particles.push({
          bx: dx * rs,
          by: dy * rs,
          bz: dz * rs,
          size,
          a,
          hi: Math.random() < palette.hiProb,
          ox: 0,
          oy: 0,
          ovx: 0,
          ovy: 0,
          seed: Math.random() * 1000,
        });
      }
    };

    const spawnFlare = (f: Flare) => {
      const { R } = geometry();
      f.ang = Math.random() * PI2;
      f.r = R * (0.82 + Math.random() * 0.12);
      f.vr = R * (0.003 + Math.random() * 0.007);
      f.va = (Math.random() - 0.5) * 0.012;
      f.life = 1;
      f.decay = 0.006 + Math.random() * 0.014;
      f.size = 0.8 + Math.random() * 2.2;
    };

    const seedFlares = () => {
      flareList = [];
      if (!flares || reduced) return;
      const perf = perfFactor();
      const n = Math.floor(130 * perf);
      for (let i = 0; i < n; i++) {
        const f: Flare = {
          ang: 0,
          r: 0,
          vr: 0,
          va: 0,
          life: 0,
          decay: 0,
          size: 0,
        };
        spawnFlare(f);
        f.life = Math.random();
        f.r += Math.random() * geometry().R * 0.3;
        flareList.push(f);
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const svg = svgRef.current;
      if (svg) {
        svg.setAttribute("width", String(w));
        svg.setAttribute("height", String(h));
        svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      }
      seed();
      seedFlares();
    };

    const drawFlares = (cx: number, cy: number, R: number) => {
      if (!flares || reduced) return;
      ctx.lineCap = "round";
      for (const f of flareList) {
        f.r += f.vr;
        f.ang += f.va;
        f.life -= f.decay;
        if (f.life <= 0) {
          spawnFlare(f);
          continue;
        }
        const tail = R * 0.05 + f.vr * 6;
        const cosA = Math.cos(f.ang);
        const sinA = Math.sin(f.ang);
        const x2 = cx + cosA * f.r;
        const y2 = cy + sinA * f.r;
        const x1 = cx + cosA * (f.r - tail);
        const y1 = cy + sinA * (f.r - tail);

        ctx.globalAlpha = Math.max(0, f.life) * 0.8;
        ctx.strokeStyle = `${palette.flare}1)`;
        ctx.lineWidth = f.size;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.globalAlpha = Math.max(0, f.life);
        const gsz = f.size * 2.2;
        ctx.drawImage(hiSprite, x2 - gsz, y2 - gsz, gsz * 2, gsz * 2);
      }
      ctx.globalAlpha = 1;
    };

    // Outline-only red for the large Metablify capture ring (not artistic orbits)
    const metablifyRed = "rgba(196, 78, 58, 0.95)";

    /** Clean compare rings: large orb = Metablify, small circle = legacy. No magnifier. */
    const drawCompareRing = (
      x: number,
      y: number,
      r: number,
      alpha: number,
      weight: "large" | "small",
    ) => {
      if (alpha <= 0.01) return;
      const metablifyHot =
        weight === "large" && storyPhaseRef.current === "metablify";
      ctx.globalAlpha = alpha;

      if (weight === "small") {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, PI2);
        ctx.fillStyle =
          tone === "green" ? "rgba(196, 205, 196, 0.55)" : "rgba(210, 218, 230, 0.55)";
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(x, y, r, 0, PI2);
      ctx.strokeStyle = metablifyHot
        ? metablifyRed
        : weight === "large"
          ? palette.rim
          : tone === "green"
            ? "rgba(120, 140, 120, 0.85)"
            : "rgba(120, 140, 170, 0.85)";
      ctx.lineWidth =
        weight === "large"
          ? Math.max(2.5, r * (metablifyHot ? 0.028 : 0.018))
          : Math.max(1.5, r * 0.05);
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const computeOrbits = () => {
      const { cx, cy, R } = geometry(false);
      const driftX = Math.cos(t * 0.11) * R * 0.02;
      const driftY = Math.sin(t * 0.09) * R * 0.015;
      const legacyR = R * 0.32 * orbitScale;
      return {
        // Large ring around the full particle orb (Metablify)
        c1x: cx,
        c1y: cy,
        sr: R * 0.98,
        // Smaller circular section inside (legacy / rest of field)
        c2x: cx + R * 0.18 + driftX,
        c2y: cy + R * 0.08 + driftY,
        lr: legacyR,
      };
    };

    const drawOrbits = (o: ReturnType<typeof computeOrbits>) => {
      if (sampleLensAlpha > 0.01) {
        drawCompareRing(o.c1x, o.c1y, o.sr, sampleLensAlpha, "large");
      }
      if (legacyLensAlpha > 0.01) {
        drawCompareRing(o.c2x, o.c2y, o.lr, legacyLensAlpha, "small");
      }
    };

    const layoutLabels = (o: ReturnType<typeof computeOrbits>) => {
      if (!showLabelsRef.current) return;
      const { cx, cy, R } = geometry();

      const dir = (ax: number, ay: number, bx: number, by: number) => {
        const dx = bx - ax;
        const dy = by - ay;
        const m = Math.hypot(dx, dy) || 1;
        return [dx / m, dy / m] as const;
      };

      // Index 0 unused (kept for alpha array shape). 1 = legacy, 2 = Metablify.
      const defs = [
        {
          ox: cx,
          oy: cy,
          rr: R * 0.5,
          ex: cx,
          ey: cy,
          align: "left" as const,
          ph: 0,
        },
        {
          ox: o.c2x,
          oy: o.c2y,
          rr: o.lr,
          ex: cx + R * 1.28,
          ey: cy + R * 0.55,
          align: "left" as const,
          ph: 2,
        },
        {
          ox: o.c1x,
          oy: o.c1y,
          rr: o.sr,
          ex: cx - R * 1.22,
          ey: cy - R * 0.15,
          align: "right" as const,
          ph: 4,
        },
      ];

      defs.forEach((d, i) => {
        const alpha = labelAlphas[i] ?? 0;
        const rise = (1 - alpha) * 16;
        const fx = Math.sin(t * 0.5 + d.ph) * R * 0.03;
        const fy = Math.cos(t * 0.45 + d.ph) * R * 0.03;
        const ex = d.ex + fx;
        const ey = d.ey + fy + rise;
        const [dx, dy] = dir(d.ox, d.oy, ex, ey);
        const ax = d.ox + dx * d.rr;
        const ay = d.oy + dy * d.rr;

        const line = lineRefs.current[i];
        if (line) {
          line.setAttribute("x1", String(ax));
          line.setAttribute("y1", String(ay));
          line.setAttribute("x2", String(ex));
          line.setAttribute("y2", String(ey));
          line.setAttribute("opacity", String(alpha));
        }
        const dot = dotRefs.current[i];
        if (dot) {
          dot.setAttribute("cx", String(ax));
          dot.setAttribute("cy", String(ay));
          dot.setAttribute("opacity", String(alpha));
        }
        const box = boxRefs.current[i];
        if (box) {
          box.style.width = `${R * 1.35}px`;
          box.style.left = `${ex}px`;
          box.style.top = `${ey}px`;
          box.style.textAlign = d.align;
          box.style.opacity = String(alpha);
          box.style.transform =
            d.align === "left"
              ? "translate(10px, -50%)"
              : "translate(calc(-100% - 10px), -50%)";
        }
      });
    };

    const drawScene = () => {
      const labelsFit = w >= 420 && w / h > 1.1;
      const targets = phaseTargets(labelsFit);
      sampleLensAlpha = lerp(sampleLensAlpha, targets.sampleLens, 0.08);
      legacyLensAlpha = lerp(legacyLensAlpha, targets.legacyLens, 0.08);
      labelAlphas = labelAlphas.map((a, i) =>
        lerp(a, targets.labels[i] ?? 0, 0.08),
      );
      radiusMul = lerp(radiusMul, targets.radiusMul, 0.06);
      fieldAlpha = lerp(fieldAlpha, targets.fieldAlpha, 0.08);

      const { cx, cy, R } = geometry();

      ctx.clearRect(0, 0, w, h);
      if (!transparent) {
        ctx.fillStyle = palette.bg;
        ctx.fillRect(0, 0, w, h);
      }

      const bgGlow = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.3);
      bgGlow.addColorStop(0, palette.glow);
      bgGlow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.3, 0, PI2);
      ctx.fillStyle = bgGlow;
      ctx.globalAlpha = fieldAlpha;
      ctx.fill();

      drawFlares(cx, cy, R);

      const spin = t * 0.16;
      const cosA = Math.cos(spin);
      const sinA = Math.sin(spin);
      const tilt = -0.35 + Math.sin(t * 0.2) * 0.08;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      const mr = Math.min(w, h) * 0.16;
      const mr2 = mr * mr;

      for (const p of particles) {
        const X = p.bx * cosA + p.bz * sinA;
        const Z0 = -p.bx * sinA + p.bz * cosA;
        const Y = p.by * cosT - Z0 * sinT;
        const Z = p.by * sinT + Z0 * cosT;

        const persp = 1 / (1 - Z * 0.14);
        let sx = cx + X * R * persp;
        let sy = cy + Y * R * persp;

        if (interactive && mouse.active) {
          const dxm = sx + p.ox - mouse.x;
          const dym = sy + p.oy - mouse.y;
          const d2 = dxm * dxm + dym * dym;
          if (d2 < mr2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / mr) * 3;
            p.ovx += (dxm / d) * f;
            p.ovy += (dym / d) * f;
          }
        }
        p.ovx += -p.ox * 0.06;
        p.ovy += -p.oy * 0.06;
        p.ovx *= 0.85;
        p.ovy *= 0.85;
        p.ox += p.ovx;
        p.oy += p.ovy;
        sx += p.ox;
        sy += p.oy;

        const depth = (Z + 1.3) / 2.6;
        const shimmer = reduced ? 1 : 0.85 + 0.15 * Math.sin(t * 2 + p.seed);
        const size = p.size * (0.5 + depth) * persp * shimmer;
        const alpha =
          p.a *
          (0.28 + 0.72 * depth) *
          (reduced ? 1 : 0.85 + 0.15 * Math.sin(t * 1.5 + p.seed)) *
          fieldAlpha;

        const sprite = p.hi ? hiSprite : baseSprite;
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.drawImage(sprite, sx - size, sy - size, size * 2, size * 2);
      }
      ctx.globalAlpha = 1;

      const o = computeOrbits();
      drawOrbits(o);
      ctx.globalAlpha = 1;
      layoutLabels(o);
    };

    const frame = () => {
      if (!running || !visible) return;
      t += 0.016;
      drawScene();
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    if (reduced) {
      drawScene();
    } else {
      frame();
    }

    let io: IntersectionObserver | null = null;
    if (!reduced && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          const wasVisible = visible;
          visible = entries.some((e) => e.isIntersecting);
          if (visible && !wasVisible && running) frame();
        },
        { rootMargin: "160px" },
      );
      io.observe(canvas);
    }

    window.addEventListener("resize", resize);
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (interactive && !reduced && !coarse) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [
    interactive,
    density,
    tone,
    flares,
    transparent,
    radiusScale,
    orbitScale,
    fieldOffsetX,
  ]);

  const legacyLabelColor = tone === "green" ? "#1f4d2e" : "#33538f";
  const legacyLine =
    tone === "green" ? "rgba(26,78,48,0.55)" : "rgba(51,83,143,0.55)";
  const legacyDotStroke =
    tone === "green" ? "rgba(26,78,48,0.8)" : "rgba(51,83,143,0.8)";
  const metablifyLabelColor = "#c44e3a";
  const metablifyLine = "rgba(196,78,58,0.65)";
  const metablifyDotStroke = "rgba(196,78,58,0.9)";

  const labels = [
    null,
    <>
      Legacy workflows may recover only a subset of detectable mass features.
    </>,
    <>
      Metablify reveals a broader set of real mass features across LC/MS
      datasets.
    </>,
  ];

  return (
    <div className={`h-full w-full overflow-visible ${className}`}>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full ${interactive ? "" : "pointer-events-none"}`}
        style={{ touchAction: "pan-y" }}
        aria-hidden="true"
      />
      {showLabels && (
        <div className="pointer-events-none absolute inset-0 z-10">
          <svg
            ref={svgRef}
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {[0, 1, 2].map((i) => {
              const isMetablify = i === 2;
              return (
                <g key={i}>
                  <line
                    ref={(el) => {
                      lineRefs.current[i] = el;
                    }}
                    stroke={isMetablify ? metablifyLine : legacyLine}
                    strokeWidth="1"
                  />
                  <circle
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    r="3.5"
                    fill="#ffffff"
                    stroke={isMetablify ? metablifyDotStroke : legacyDotStroke}
                    strokeWidth="1.25"
                  />
                </g>
              );
            })}
          </svg>
          {labels.map((content, i) => (
            <div
              key={i}
              ref={(el) => {
                boxRefs.current[i] = el;
              }}
              className="pointer-events-none absolute left-0 top-0 text-[0.72rem] leading-snug md:text-[0.8rem]"
              style={{
                color: i === 2 ? metablifyLabelColor : legacyLabelColor,
                fontFamily: "var(--font-body)",
                fontWeight: i === 2 ? 600 : 400,
              }}
            >
              {content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
