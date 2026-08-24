"use client";

/**
 * Slim announcement ribbon, mounted above the site header on every page.
 *
 * Items roll upward on a 5 second cycle: the current headline travels up and
 * out while the next one rises into its place. Both are on screen at once and
 * clipped by the window around them, which is what makes it read as one strip
 * of type moving rather than two separate elements. There is no crossfade — the
 * movement carries it.
 *
 * Because rotation only ever moves forward, the outgoing item is derived from
 * the current index rather than tracked in its own state. That keeps a single
 * source of truth for what is showing.
 *
 * Three things keep the rotation from becoming an irritation:
 *
 * - It pauses while hovered or focused, so the headline cannot move out from
 *   under someone in the middle of reading or reaching for the link.
 * - It pauses when the tab is hidden, so a backgrounded tab is not running a
 *   timer and repainting forever.
 * - It does not move at all under prefers-reduced-motion. Those users see the
 *   newest item; the rest are one click away on /news, which is where the link
 *   goes regardless of which item is showing.
 *
 * With a single news item this renders exactly as it did when it was static, so
 * the rotation costs nothing until there is something to rotate to.
 */
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { newsItems } from "@/content/news";
import type { NewsItem } from "@/content/news";

/** Full cycle, including the roll. */
const ROTATE_MS = 5000;
/** Travel time. Handed to CSS below so the stylesheet and the unmount timing
 *  cannot drift apart. */
const ROLL_MS = 700;

function ItemBody({ item }: { item: NewsItem }) {
  return (
    <>
      <span className="ribbon-year">{item.year}</span>
      <span className="ribbon-sep" aria-hidden="true" />
      <span className="ribbon-headline">{item.title}</span>
    </>
  );
}

export function AnnouncementRibbon() {
  const [index, setIndex] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [paused, setPaused] = useState(false);
  const reducedRef = useRef(false);
  const settleRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (newsItems.length < 2 || paused || reducedRef.current) return;

    const id = window.setInterval(() => {
      // Skip the tick rather than advancing invisibly, so a tab left in the
      // background does not come back having rolled through everything.
      if (document.visibilityState !== "visible") return;

      setIndex((i) => (i + 1) % newsItems.length);
      setRolling(true);
      // Slightly longer than the travel time, so the class is never removed
      // from underneath a running animation.
      settleRef.current = window.setTimeout(
        () => setRolling(false),
        ROLL_MS + 80,
      );
    }, ROTATE_MS);

    return () => {
      window.clearInterval(id);
      window.clearTimeout(settleRef.current);
      setRolling(false);
    };
  }, [paused]);

  const item = newsItems[index];
  const outgoing =
    newsItems[(index - 1 + newsItems.length) % newsItems.length];

  return (
    <aside
      className="ribbon"
      aria-label="Announcement"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Link href="/news" className="ribbon-link">
        <span className="ribbon-flag">News</span>
        <span
          className="ribbon-window"
          style={{ "--ribbon-roll": `${ROLL_MS}ms` } as CSSProperties}
        >
          {rolling ? (
            <span key={`out-${index}`} className="ribbon-item is-rolling-out">
              <ItemBody item={outgoing} />
            </span>
          ) : null}
          <span
            key={`in-${index}`}
            className={`ribbon-item${rolling ? " is-rolling-in" : ""}`}
          >
            <ItemBody item={item} />
          </span>
        </span>
        <span className="ribbon-cta">
          <span className="ribbon-cta-label">Read the news</span>
          <span className="ribbon-arrow" aria-hidden="true">
            →
          </span>
        </span>
      </Link>
    </aside>
  );
}

export default AnnouncementRibbon;
