const iconProps = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export function DiscussIcon() {
  return (
    <svg {...iconProps}>
      <path d="M15 12H35A5 5 0 0 1 40 17V27A5 5 0 0 1 35 32H24L17 38V32H15A5 5 0 0 1 10 27V17A5 5 0 0 1 15 12Z" />
      <path d="M33 30H49A5 5 0 0 1 54 35V43A5 5 0 0 1 49 48H47L47 54L40 48H33A5 5 0 0 1 28 43V35A5 5 0 0 1 33 30Z" />
    </svg>
  );
}

export function DefineIcon() {
  return (
    <svg {...iconProps}>
      <path d="M25 13H19A5 5 0 0 0 14 18V49A5 5 0 0 0 19 54H45A5 5 0 0 0 50 49V18A5 5 0 0 0 45 13H39" />
      <rect x="25" y="8" width="14" height="10" rx="3" />
      <path d="M22 29L25.5 32.5L31 26" />
      <path d="M36 29H43" />
      <path d="M22 40L25.5 43.5L31 37" />
      <path d="M36 40H43" />
    </svg>
  );
}

export function AnalyzeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 16V50H52" />
      <path d="M12 50H17L21.5 34L26 50H29L33 22L37 50H41L45 38L49 50H52" />
      <circle cx="21.5" cy="34" r="2" fill="currentColor" stroke="none" />
      <circle cx="33" cy="22" r="2" fill="currentColor" stroke="none" />
      <circle cx="45" cy="38" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ReviewIcon() {
  return (
    <svg {...iconProps}>
      <path d="M37 8H18A5 5 0 0 0 13 13V51A5 5 0 0 0 18 56H46A5 5 0 0 0 51 51V22Z" />
      <path d="M37 8V22H51" />
      <path d="M21 49H43" opacity="0.4" />
      <rect x="22" y="39" width="5" height="10" />
      <rect x="30" y="33" width="5" height="16" />
      <rect x="38" y="28" width="5" height="21" />
    </svg>
  );
}
