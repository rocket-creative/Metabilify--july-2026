"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChromatogramVisual } from "./ChromatogramVisual";

type Item = {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
};

const ITEMS: Item[] = [
  {
    href: "/applications/metabolomics",
    eyebrow: "Metabolomics",
    title: "Turn untargeted LC/MS into cleaner, aligned mass feature results",
    body: "Stronger foundations for downstream discovery with less manual review, across large and complex sample sets.",
  },
  {
    href: "/applications/proteomics",
    eyebrow: "Proteomics",
    title: "Reveal and quantify peptide mass features at scale",
    body: "A workflow built for alignment, signal clarity, and complex datasets that conventional tools struggle to resolve.",
  },
];

export function ApplicationsCarousel() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section className="section-forest section-wide py-[clamp(4.5rem,10vw,7.5rem)]">
      <div className="mx-auto max-w-[80rem] px-5 md:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Applications</p>
            <h2 className="display display-lg max-w-2xl">
              One platform. Multiple omics.
            </h2>
          </div>
          <div className="section-nav hidden md:inline-flex">
            <button
              type="button"
              aria-label="Previous application"
              className="section-nav-btn"
              onClick={() => scrollBy(-1)}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next application"
              className="section-nav-btn"
              onClick={() => scrollBy(1)}
            >
              →
            </button>
          </div>
        </div>

        <div ref={scroller} className="card-scroller">
          {ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="card card-link card-split group">
              <div className="card-split-body">
                <p className="eyebrow mb-4">{item.eyebrow}</p>
                <h3
                  className="mb-3 text-2xl text-ink md:text-[1.7rem]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="mb-8 max-w-md text-muted">{item.body}</p>
                <span className="arrow-link mt-auto">
                  Read more <span className="arrow-ne">↗</span>
                </span>
              </div>
              <div className="card-split-media">
                <ChromatogramVisual className="absolute inset-0 aspect-auto h-full" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
