export function ChromatogramVisual({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden bg-neutral ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 640 420"
        className="absolute inset-0 h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={48 + i * 46}
            y1="48"
            x2={48 + i * 46}
            y2="360"
            stroke="var(--color-stone)"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="48"
            y1={48 + i * 52}
            x2="600"
            y2={48 + i * 52}
            stroke="var(--color-stone)"
            strokeWidth="1"
          />
        ))}

        <line
          x1="48"
          y1="360"
          x2="600"
          y2="360"
          stroke="var(--color-ink)"
          strokeWidth="2"
        />
        <line
          x1="48"
          y1="48"
          x2="48"
          y2="360"
          stroke="var(--color-ink)"
          strokeWidth="2"
        />

        <rect className="peak-bar" x="90" y="220" width="18" height="140" fill="#8a8a8a" style={{ animationDelay: "0.2s" }} />
        <rect className="peak-bar" x="160" y="140" width="22" height="220" fill="var(--color-ink)" style={{ animationDelay: "0.35s" }} />
        <rect className="peak-bar" x="230" y="250" width="16" height="110" fill="#8a8a8a" style={{ animationDelay: "0.45s" }} />
        <rect className="peak-bar" x="300" y="90" width="26" height="270" fill="var(--color-ink)" style={{ animationDelay: "0.55s" }} />
        <rect className="peak-bar" x="380" y="180" width="20" height="180" fill="var(--color-ink)" style={{ animationDelay: "0.65s" }} />
        <rect className="peak-bar" x="450" y="270" width="14" height="90" fill="#8a8a8a" style={{ animationDelay: "0.75s" }} />
        <rect className="peak-bar" x="510" y="160" width="24" height="200" fill="var(--color-ink)" style={{ animationDelay: "0.85s" }} />

        <path
          className="chromatogram-path"
          d="M48 340 C 90 330, 120 280, 150 200 C 175 120, 200 100, 230 180 C 260 260, 280 300, 310 120 C 340 40, 360 80, 390 160 C 420 240, 440 280, 470 300 C 500 320, 530 200, 560 170 C 580 155, 590 200, 600 220"
          stroke="var(--color-ink)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        <circle cx="310" cy="120" r="5" fill="var(--color-ink)" />
        <circle cx="160" cy="200" r="4" fill="var(--color-ink)" />
        <circle cx="510" cy="170" r="4" fill="var(--color-ink)" />

        <text x="52" y="40" fill="var(--color-faint)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1.5">
          INTENSITY
        </text>
        <text x="520" y="390" fill="var(--color-faint)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1.5">
          m/z
        </text>
      </svg>
    </div>
  );
}
