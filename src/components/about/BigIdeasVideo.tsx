"use client";

import { useState } from "react";

const POSTER = "/images/about/big-ideas.webp";
const EMBED =
  "https://www.youtube-nocookie.com/embed/2VPGF2xUvq4?start=2810&autoplay=1&rel=0&modestbranding=1";

/**
 * Click-to-play facade. The still is a frame from the pitch itself, so the
 * embed does not show YouTube's default thumbnail before it starts.
 */
export function BigIdeasVideo() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="about-video">
        <iframe
          src={EMBED}
          title="Metablify at the Danforth Center Big Ideas 3.0 competition"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="about-video">
      <button
        type="button"
        className="about-video-poster"
        onClick={() => setPlaying(true)}
      >
        <img src={POSTER} alt="" width={1600} height={900} className="no-round" />
        <span className="about-video-play" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M9 7.2v9.6l8-4.8-8-4.8z" fill="currentColor" />
          </svg>
        </span>
        <span className="sr-only">
          Play the Big Ideas 3.0 pitch, starting at 46:50
        </span>
      </button>
    </div>
  );
}
