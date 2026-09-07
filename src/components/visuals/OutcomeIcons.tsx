/**
 * The three reasons on the Work With Us closing band. 64x64, unfilled 1.75
 * strokes, colour inherited.
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

/** Target with a check in the centre. */
export function TargetIcon() {
  return (
    <Icon>
      <circle cx="32" cy="32" r="22" />
      <circle cx="32" cy="32" r="13" />
      <path d="M26 32l4 4 8-8" />
    </Icon>
  );
}

/** Two figures, one leading. */
export function GuidanceIcon() {
  return (
    <Icon>
      <circle cx="25" cy="22" r="7" />
      <path d="M12 50v-3a13 13 0 0 1 26 0v3" />
      <circle cx="45" cy="25" r="5.5" />
      <path d="M44 35c6 0 10 4.5 10 10v3" />
    </Icon>
  );
}

/** Rising bars. */
export function ResultsIcon() {
  return (
    <Icon>
      <path d="M14 50V36" />
      <path d="M26 50V26" />
      <path d="M38 50V32" />
      <path d="M50 50V16" />
      <path d="M10 50h48" />
    </Icon>
  );
}
