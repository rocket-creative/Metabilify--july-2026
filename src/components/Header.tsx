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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header sticky top-0 z-50 border-b border-transparent ${
        scrolled ? "is-scrolled border-stone/60" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-10 lg:px-8 xl:px-14">
        <Logo priority />

        <nav
          className="hidden flex-nowrap items-center gap-4 lg:flex xl:gap-7"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap text-[0.82rem] tracking-wide transition-colors xl:text-[0.9rem] ${
                  active
                    ? "font-semibold text-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/discuss"
            className="btn btn-primary whitespace-nowrap !px-4 !py-2.5 !text-[0.7rem]"
          >
            <span>Discuss a Project</span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </nav>

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

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-stone bg-white px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 text-base text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/discuss"
                className="btn btn-primary mt-2 w-full justify-center"
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
