"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
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

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`site-header sticky top-0 z-50 ${
        scrolled ? "is-scrolled" : "bg-transparent"
      }`}
    >
      {}
      <div className="site-header-bar gutter-x flex items-center justify-between gap-4">
        <Logo priority />

        <div className="flex items-center gap-3">
          <Link
            href="/discuss"
            className="btn btn-primary hidden lg:inline-flex !px-5 !py-3 !text-[0.7rem]"
          >
            <span>Discuss a Project</span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-ink/20 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span
                className={`block h-0.5 w-5 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-ink transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {}
      <nav className="site-nav-row hidden lg:block" aria-label="Primary">
        <ul className="gutter-x mx-auto flex max-w-[80rem] items-center justify-center gap-8 xl:gap-12">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`site-nav-link ${isActive(link.href) ? "is-active" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-stone bg-white px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2.5 text-base ${
                    isActive(link.href) ? "font-semibold text-ink" : "text-muted"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/discuss"
                className="btn btn-primary mt-3 w-full justify-center"
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
