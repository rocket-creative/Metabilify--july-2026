"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChromatogramVisual } from "./ChromatogramVisual";

type Item = {
  href: string;
  eyebrow: string;
  body: string;
  link: string;
};

const ITEMS: Item[] = [
  {
    href: "/applications/metabolomics",
    eyebrow: "Metabolomics",
    body: "Turn complex untargeted LC/MS datasets into cleaner, aligned, and quantified mass-feature results.",
    link: "Explore Metabolomics",
  },
  {
    href: "/applications/proteomics",
    eyebrow: "Proteomics",
    body: "Reveal and quantify peptide mass features across complex LC/MS datasets with a workflow built for scale, alignment, and signal clarity.",
    link: "Explore Proteomics",
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
    <section className="section-forest section-wide band-y">
      <div className="gutter-x mx-auto max-w-[80rem]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Applications</p>
            <h2 className="display display-lg mb-6 max-w-2xl">
              One Metablify Platform. Multiple Omics.
            </h2>
            <div className="lead max-w-2xl space-y-4">
              <p>
                Turn complex untargeted LC/MS datasets into cleaner, aligned,
                and quantified mass-feature results.
              </p>
              <p>
                Metablify analyzes the mass-feature layer shared across LC/MS
                workflows, with leading applications in metabolomics and
                proteomics.
              </p>
            </div>
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
                <p
                  className="mb-8 max-w-md text-xl leading-relaxed text-ink md:text-2xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.body}
                </p>
                <span className="arrow-link mt-auto">
                  {item.link} <span className="arrow-ne">↗</span>
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
