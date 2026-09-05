/**
 * Badges for the Align / Pool / Amplify stages. 64x64, unfilled 1.5 strokes,
 * colour inherited from the badge, per the design contract.
 */
function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Three traces whose peaks line up on one vertical guide. */
export function AlignIcon() {
  return (
    <Icon>
      <path d="M32 8v48" strokeDasharray="2 4" opacity="0.6" />
      <path d="M10 22h14l4-8 4 8h4l4-6 4 6h10" />
      <path d="M10 36h12l6-8 4 8h4l4-6 4 6h10" />
      <path d="M10 50h13l5-9 4 9h4l4-6 4 6h10" />
    </Icon>
  );
}

/** Several small signals gathered into one. */
export function PoolIcon() {
  return (
    <Icon>
      <circle cx="16" cy="16" r="4" />
      <circle cx="48" cy="16" r="4" />
      <circle cx="12" cy="36" r="4" />
      <circle cx="52" cy="36" r="4" />
      <circle cx="32" cy="46" r="9" />
      <path d="M19 19l7 15" />
      <path d="M45 19l-7 15" />
      <path d="M16 37l8 5" />
      <path d="M48 37l-8 5" />
    </Icon>
  );
}

/** A small peak growing into a tall one. */
export function AmplifyIcon() {
  return (
    <Icon>
      <path d="M8 50h48" />
      <path d="M10 50c4 0 5-10 8-10s4 10 8 10" opacity="0.55" />
      <path d="M28 50c5 0 7-34 10-34s5 34 10 34" />
      <path d="M38 8v6" />
      <path d="M35 11l3-3 3 3" />
    </Icon>
  );
}
