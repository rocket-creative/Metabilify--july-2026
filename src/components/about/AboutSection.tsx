import { Reveal } from "@/components/Reveal";

export type Tone = "white" | "grey" | "sage" | "forest";

const toneClass: Record<Tone, string> = {
  white: "",
  grey: "section-grey",
  sage: "section-sage",
  forest: "section-forest",
};

/**
 * Every band on this page is the same shape: full-bleed background, 80rem
 * measure, eyebrow then heading. Fifteen hand-rolled sections would drift.
 */
export function AboutSection({
  tone = "white",
  eyebrow,
  title,
  children,
  className = "",
}: {
  tone?: Tone;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={["section-wide band-y", toneClass[tone], className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="gutter-x mx-auto max-w-[80rem]">
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="display display-lg max-w-4xl">{title}</h2>
        </Reveal>
        {children ? <div className="mt-8 md:mt-12">{children}</div> : null}
      </div>
    </section>
  );
}

/** A stack of body paragraphs at the reading measure the contract asks for. */
export function AboutProse({
  paragraphs,
  emphasiseLast = false,
  className = "",
}: {
  paragraphs: string[];
  /** Sets the closing line in ink rather than muted, for pivot sentences. */
  emphasiseLast?: boolean;
  className?: string;
}) {
  return (
    <div className={`about-prose ${className}`}>
      {paragraphs.map((text, i) => (
        <p
          key={text}
          className={
            emphasiseLast && i === paragraphs.length - 1
              ? "about-prose-emphasis"
              : undefined
          }
        >
          {text}
        </p>
      ))}
    </div>
  );
}
