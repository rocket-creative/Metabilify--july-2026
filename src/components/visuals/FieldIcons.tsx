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

/**
 * Isoleucine, drawn as a skeletal formula: the compound the CEO uses as the
 * metabolomics mark. Ethyl chain from the left, hashed bond up to the methyl,
 * wedge down to the amine, carboxyl on the right.
 */
export function MoleculeIcon() {
  return (
    <Icon>
      {/* Backbone: ethyl → C3 → C2 (alpha) → carboxyl carbon */}
      <path d="M6 34l9 5 9-5 9 5 9-5" strokeWidth="2.25" />
      {/* Hashed bond up from C3 to the methyl */}
      <path d="M23.5 31.5h1M23 29h2M22.5 26.5h3M22 24h4" strokeWidth="1.5" />
      {/* Wedge down from the alpha carbon to NH2 */}
      <path d="M32 40l-2.4 7h4.8z" fill="currentColor" stroke="none" />
      {/* C=O up, C–OH right */}
      <path d="M41 33l.8-8M43.4 33.4l.8-8" strokeWidth="2" />
      <path d="M42 34l7 4" strokeWidth="2.25" />
      <text x="38" y="21" fontSize="8" fontWeight="700" fill="currentColor" stroke="none" fontFamily="var(--font-body)">O</text>
      <text x="49" y="41" fontSize="8" fontWeight="700" fill="currentColor" stroke="none" fontFamily="var(--font-body)">OH</text>
      <text x="25" y="58" fontSize="8" fontWeight="700" fill="currentColor" stroke="none" fontFamily="var(--font-body)">NH</text>
      <text x="37" y="60" fontSize="5.5" fontWeight="700" fill="currentColor" stroke="none" fontFamily="var(--font-body)">2</text>
    </Icon>
  );
}

/**
 * Three interlocking loops around a small core: the folded-protein mark from
 * the CEO's brochure, for the proteomics card.
 */
export function PeptideIcon() {
  return (
    <Icon>
      <g strokeWidth="2.5">
        <ellipse cx="32" cy="32" rx="8" ry="24" />
        <ellipse cx="32" cy="32" rx="8" ry="24" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="8" ry="24" transform="rotate(-60 32 32)" />
      </g>
      <path d="M32 26l5.2 3v6l-5.2 3-5.2-3v-6z" fill="var(--color-white)" strokeWidth="1.5" />
    </Icon>
  );
}
