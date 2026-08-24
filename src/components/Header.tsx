"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { SiteSearch } from "./SiteSearch";
import { navLinks } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > 16 : y > 72));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`site-header sticky top-0 z-50 ${scrolled ? "is-scrolled" : ""}`}
    >
      {/* One row: logo, nav, actions. The nav used to sit in a bordered strip
          of its own below this, which read as detached from the bar. */}
      <div className="site-header-inner gutter-x">
        <Logo priority />

        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`site-nav-link ${isActive(link.href) ? "is-active" : ""}`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header-actions">
          <SiteSearch />

          <Link
            href="/discuss"
            className="btn btn-primary site-header-cta !px-5 !py-3 !text-[0.7rem]"
          >
            <span>Discuss a Project</span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>

          <button
            type="button"
            className="site-header-icon site-burger"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span
                className={`site-burger-bar ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`site-burger-bar ${open ? "opacity-0" : ""}`} />
              <span
                className={`site-burger-bar ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="site-mobile-nav" aria-label="Mobile">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`site-mobile-link ${isActive(link.href) ? "is-active" : ""}`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/discuss"
                className="btn btn-primary mt-5 w-full justify-center"
                onClick={() => setOpen(false)}
              >
                <span>Discuss a Project</span>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
