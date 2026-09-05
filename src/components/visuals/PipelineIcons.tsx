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
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Two traces whose peaks sit on one vertical guide. */
export function AlignIcon() {
  return (
    <Icon>
      <path d="M32 6v52" strokeDasharray="3 4" opacity="0.6" />
      <path d="M8 26h12c4 0 6-12 12-12s8 12 12 12h12" />
      <path d="M8 48h12c4 0 6-12 12-12s8 12 12 12h12" />
    </Icon>
  );
}

/** Four signals gathered into one. */
export function PoolIcon() {
  return (
    <Icon>
      <circle cx="12" cy="14" r="4" />
      <circle cx="52" cy="14" r="4" />
      <circle cx="12" cy="34" r="4" />
      <circle cx="52" cy="34" r="4" />
      <circle cx="32" cy="48" r="8" />
      <path d="M15 17l12 24" />
      <path d="M49 17l-12 24" />
      <path d="M16 35l9 9" />
      <path d="M48 35l-9 9" />
    </Icon>
  );
}

/** A small peak becoming a tall one. */
export function AmplifyIcon() {
  return (
    <Icon>
      <path d="M6 52h52" />
      <path d="M8 52c5 0 6-12 10-12s5 12 10 12" opacity="0.5" />
      <path d="M28 52c6 0 8-38 12-38s6 38 12 38" />
      <path d="M40 6v8" />
      <path d="M36 10l4-4 4 4" />
    </Icon>
  );
}
