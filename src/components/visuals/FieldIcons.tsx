/**
 * Badges for the six application fields. 64x64, unfilled 1.75 strokes, colour
 * inherited from the badge.
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

/** Capsule, split, tilted. */
export function PillIcon() {
  return (
    <Icon>
      <rect x="10" y="24" width="44" height="16" rx="8" transform="rotate(-35 32 32)" />
      <path d="M32 21.5v21" transform="rotate(-35 32 32)" />
    </Icon>
  );
}

/** Leaf with a midrib. */
export function LeafIcon() {
  return (
    <Icon>
      <path d="M50 14c-2 24-14 36-34 36 0-20 12-34 34-36z" />
      <path d="M16 50c8-10 16-18 26-26" />
    </Icon>
  );
}

/** Erlenmeyer flask with liquid line. */
export function FlaskIcon() {
  return (
    <Icon>
      <path d="M26 10h12" />
      <path d="M28 10v14L14 46a4 4 0 0 0 3 6h30a4 4 0 0 0 3-6L36 24V10" />
      <path d="M20 40h24" />
    </Icon>
  );
}

/** Three rising bars. */
export function BarsIcon() {
  return (
    <Icon>
      <path d="M12 52V34" />
      <path d="M24 52V22" />
      <path d="M36 52V28" />
      <path d="M48 52V14" />
      <path d="M8 52h48" />
    </Icon>
  );
}

/** Water drop. */
export function DropIcon() {
  return (
    <Icon>
      <path d="M32 10c8 11 14 18 14 26a14 14 0 0 1-28 0c0-8 6-15 14-26z" />
      <path d="M24 38a8 8 0 0 0 6 8" opacity="0.6" />
    </Icon>
  );
}

/** Apple with a leaf. */
export function AppleIcon() {
  return (
    <Icon>
      <path d="M32 22c-4-4-12-4-16 2-5 8-1 22 7 28 3 2 6 2 9 0 3 2 6 2 9 0 8-6 12-20 7-28-4-6-12-6-16-2z" />
      <path d="M32 22v-6" />
      <path d="M32 16c2-5 6-7 10-7-1 5-4 8-10 7z" />
    </Icon>
  );
}

/** Small molecule — hexagon with substituents, for the metabolomics card. */
export function MoleculeIcon() {
  return (
    <Icon>
      <path d="M32 18l12 7v14l-12 7-12-7V25z" />
      <path d="M32 18v-8" />
      <path d="M44 25l7-4" />
      <path d="M20 39l-7 4" />
      <circle cx="32" cy="8" r="2.5" />
      <circle cx="53" cy="19" r="2.5" />
      <circle cx="11" cy="45" r="2.5" />
    </Icon>
  );
}

/** Peptide chain — beads on a folded line, for the proteomics card. */
export function PeptideIcon() {
  return (
    <Icon>
      <path d="M12 44c6-14 12-14 18 0s12 14 18 0" />
      <circle cx="12" cy="44" r="3.5" />
      <circle cx="21" cy="30" r="3.5" />
      <circle cx="30" cy="44" r="3.5" />
      <circle cx="39" cy="30" r="3.5" />
      <circle cx="48" cy="44" r="3.5" />
      <circle cx="21" cy="17" r="3" opacity="0.6" />
      <path d="M21 20.5v6" opacity="0.6" />
    </Icon>
  );
}
