type Ratio = "16/9" | "4/3" | "3/2" | "1/1";

type Props = {
  /** What belongs in this slot. Doubles as the asset brief for sourcing. */
  label: string;
  ratio?: Ratio;
  /** Use "dark" on forest sections so the dashed border stays visible. */
  tone?: "light" | "dark";
  className?: string;
};

export function ImagePlaceholder({
  label,
  ratio = "16/9",
  tone = "light",
  className = "",
}: Props) {
  return (
    <div
      className={`image-placeholder image-placeholder--${tone} ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Image placeholder: ${label}`}
    >
      <svg
        className="image-placeholder-glyph"
        viewBox="0 0 32 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <rect x="1" y="1" width="30" height="22" rx="2" />
        <circle cx="10" cy="8" r="2.5" />
        <path d="M1 18l8.5-7 6.5 5.5 5-4L31 19" />
      </svg>
      <p className="image-placeholder-label">{label}</p>
      <p className="image-placeholder-ratio">{ratio}</p>
    </div>
  );
}

/**
 * Same treatment for copy that has not been written yet, so unfinished text and
 * unfinished imagery read as the same deliberate state rather than two bugs.
 */
export function CopyPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <p className={`copy-placeholder ${className}`}>
      <span className="copy-placeholder-tag">Copy needed</span>
      {label}
    </p>
  );
}
