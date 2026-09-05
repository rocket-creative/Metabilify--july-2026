/**
 * Line art for the "Work With Metablify" card badges. Geometry follows the
 * design contract: 64x64 viewBox, unfilled 1.5 strokes, colour inherited from
 * the badge so a forest badge and a light badge use the same markup.
 */
function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Capped sample vial with a fill line and graduation marks. */
export function VialIcon() {
  return (
    <Icon>
      <rect x="24" y="11" width="16" height="9" rx="2" />
      <path d="M27 20v28a5 5 0 0 0 10 0V20" />
      <path d="M27 37h10" />
      <path d="M27 30h4" />
      <path d="M27 25h4" />
    </Icon>
  );
}

/** Angle brackets with a slash — code, not an abstract gear. */
export function CodeBracketsIcon() {
  return (
    <Icon>
      <path d="M23 19 10 32l13 13" />
      <path d="M41 19l13 13-13 13" />
      <path d="M36 15 28 49" />
    </Icon>
  );
}

/** Two figures, the second half-hidden behind the first. */
export function PartnershipIcon() {
  return (
    <Icon>
      <circle cx="25" cy="22" r="7" />
      <path d="M12 50v-3a13 13 0 0 1 26 0v3" />
      <circle cx="45" cy="25" r="5.5" />
      <path d="M44 35c6 0 10 4.5 10 10v3" />
    </Icon>
  );
}
