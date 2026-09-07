"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { contentRegistry } from "@/content/registry";
import { pageHref } from "@/types/content";
import type { PageFamily } from "@/types/content";
import { navLinks } from "@/lib/site";

type SearchItem = {
  href: string;
  title: string;
  description: string;
  group: string;
  haystack: string;
};

const GROUP_LABEL: Record<PageFamily, string> = {
  solution: "Solutions",
  compare: "Comparisons",
  instrument: "Instruments",
  "analyte-class": "Analyte classes",
  glossary: "Glossary",
  application: "Applications",
  resource: "Resources",
};

// Blurbs for the marketing routes, which carry no registry entry of their own.
const ROUTE_BLURBS: Record<string, string> = {
  "/": "Metablify — see more in your LC/MS data.",
  "/technology": "The Metablify technology.",
  "/applications": "Where the platform is applied.",
  "/work-with-us":
    "Analytical services, platform development, and collaborations.",
  "/about": "The team and the science behind Metablify.",
  "/news": "Updates and announcements from Metablify.",
  "/discuss": "Start a conversation about your project.",
};

const GROUP_ORDER = [
  "Pages",
  "Applications",
  "Solutions",
  "Comparisons",
  "Instruments",
  "Analyte classes",
  "Glossary",
  "Resources",
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

const PAGE_ITEMS: SearchItem[] = [
  { href: "/", label: "Home" },
  ...navLinks.map((link) => ({ href: link.href, label: link.label })),
  { href: "/discuss", label: "Discuss a Project" },
].map(({ href, label }) => {
  const description = ROUTE_BLURBS[href] ?? "";
  return {
    href,
    title: label,
    description,
    group: "Pages",
    haystack: normalize(`${label} ${description}`),
  };
});

// Matches what the hub pages list, so search cannot surface a page that
// /solutions, /compare and /learn/glossary all deliberately hide. Note this is
// the browse rule, not the narrower `live`-only rule the sitemap uses.
const CONTENT_ITEMS: SearchItem[] = contentRegistry
  .filter((page) => page.status !== "draft")
  .map((page) => ({
    href: pageHref(page),
    title: page.title,
    description: page.metaDescription,
    group: GROUP_LABEL[page.family],
    haystack: normalize(
      `${page.title} ${page.metaDescription} ${page.tags.join(" ")}`,
    ),
  }));

const INDEX: SearchItem[] = [...PAGE_ITEMS, ...CONTENT_ITEMS];

const MAX_RESULTS = 24;

function score(item: SearchItem, tokens: string[]): number {
  const title = normalize(item.title);
  let total = 0;
  for (const token of tokens) {
    if (!item.haystack.includes(token)) return -1;
    if (title.startsWith(token)) total += 3;
    else if (title.includes(token)) total += 2;
    else total += 1;
  }
  return total;
}

function search(query: string): SearchItem[] {
  const tokens = normalize(query).split(" ").filter(Boolean);
  if (tokens.length === 0) return PAGE_ITEMS;

  const scored: { item: SearchItem; value: number }[] = [];
  for (const item of INDEX) {
    const value = score(item, tokens);
    if (value >= 0) scored.push({ item, value });
  }
  scored.sort(
    (a, b) => b.value - a.value || a.item.title.localeCompare(b.item.title),
  );
  return scored.slice(0, MAX_RESULTS).map((entry) => entry.item);
}

type ResultGroup = { label: string; items: SearchItem[] };

/**
 * Groups the scored results and hands back the flattened list in the same
 * order the groups render, so the arrow-key index always addresses the option
 * the reader is actually looking at.
 */
function groupResults(results: SearchItem[]): {
  groups: ResultGroup[];
  ordered: SearchItem[];
} {
  const map = new Map<string, SearchItem[]>();
  for (const item of results) {
    const bucket = map.get(item.group);
    if (bucket) bucket.push(item);
    else map.set(item.group, [item]);
  }
  const groups = [...map.entries()]
    .sort((a, b) => GROUP_ORDER.indexOf(a[0]) - GROUP_ORDER.indexOf(b[0]))
    .map(([label, items]) => ({ label, items }));
  return { groups, ordered: groups.flatMap((group) => group.items) };
}

function SearchGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 L21 21" />
    </svg>
  );
}

// Result options are anchors held at tabindex -1 so focus stays in the input;
// they must stay out of the trap's cycle.
const FOCUSABLE =
  'a[href]:not([tabindex="-1"]), button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

export function SiteSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const baseId = useId();
  const listId = `${baseId}-list`;
  const titleId = `${baseId}-title`;
  const optionId = (index: number) => `${baseId}-option-${index}`;

  const { groups, ordered } = useMemo(
    () => groupResults(search(query)),
    [query],
  );

  const close = useCallback(() => setOpen(false), []);

  const openPalette = useCallback(() => {
    setQuery("");
    setActive(0);
    setOpen(true);
  }, []);

  // Cmd/Ctrl+K from anywhere on the page.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setQuery("");
        setActive(0);
        setOpen((wasOpen) => !wasOpen);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Open: remember focus, lock the page, focus the input. The cleanup runs on
  // close and hands focus back to whatever opened the palette.
  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    // Lenis owns wheel scrolling; overflow alone will not hold it.
    const lenis = (window as Window & { __lenis?: { stop(): void; start(): void } })
      .__lenis;
    lenis?.stop();

    const frame = requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      cancelAnimationFrame(frame);
      root.style.overflow = previousOverflow;
      lenis?.start();
      restoreRef.current?.focus?.();
    };
  }, [open]);

  // Keep the highlighted option in view as the arrows walk the list.
  useEffect(() => {
    if (!open) return;
    const node = listRef.current?.querySelector<HTMLElement>(".is-active");
    node?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  const onPanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (ordered.length === 0) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((prev) => (prev + step + ordered.length) % ordered.length);
      return;
    }

    if (event.key === "Enter") {
      const item = ordered[active];
      if (!item) return;
      event.preventDefault();
      go(item.href);
      return;
    }

    if (event.key === "Tab") {
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  const overlay = (
    <div
      className="ss-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        className="ss-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={onPanelKeyDown}
      >
        <h2 id={titleId} className="sr-only">
          Search Metablify
        </h2>

        <div className="ss-field">
          <SearchGlyph />
          <input
            ref={inputRef}
            className="ss-input"
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              ordered[active] ? optionId(active) : undefined
            }
            placeholder="Search pages, applications, glossary…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="button" className="ss-close" onClick={close}>
            Esc
          </button>
        </div>

        <div
          ref={listRef}
          className="ss-results"
          id={listId}
          role="listbox"
          aria-label="Search results"
        >
          {ordered.length === 0 ? (
            <p className="ss-empty">
              Nothing matches “{query}”. Try a broader term.
            </p>
          ) : (
            groups.map((group) => (
              <div
                className="ss-group"
                role="group"
                aria-label={group.label}
                key={group.label}
              >
                <p className="ss-group-label" aria-hidden="true">
                  {group.label}
                </p>
                {group.items.map((item) => {
                  const position = ordered.indexOf(item);
                  const isActive = position === active;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      id={optionId(position)}
                      role="option"
                      aria-selected={isActive}
                      tabIndex={-1}
                      className={`ss-option ${isActive ? "is-active" : ""}`}
                      onMouseMove={() => setActive(position)}
                      onClick={close}
                    >
                      <span className="ss-option-title">{item.title}</span>
                      {item.description ? (
                        <span className="ss-option-desc">
                          {item.description}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <p className="ss-hint" aria-hidden="true">
          <span>↑↓ Navigate</span>
          <span>↵ Open</span>
          <span>Esc Close</span>
        </p>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="ss-trigger"
        onClick={openPalette}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Search the site"
      >
        <SearchGlyph />
        <span className="ss-trigger-label">Search</span>
        <span className="ss-trigger-kbd" aria-hidden="true">
          ⌘K
        </span>
      </button>

      {/* `open` can only be set by a user event, so by the time this renders
          hydration is done and `document` is safe to reach for. */}
      {open && typeof document !== "undefined"
        ? createPortal(overlay, document.body)
        : null}
    </>
  );
}

export default SiteSearch;
