import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="section wash-botanical border-b border-stone">
      <Reveal>
        {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
        <h1 className="display display-lg max-w-3xl">{title}</h1>
        {lead ? <p className="lead mt-6">{lead}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Reveal>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-10 max-w-2xl md:mb-14">
      {eyebrow ? (
        <p
          className="eyebrow mb-3"
          style={light ? { color: "rgba(255,255,255,0.75)" } : undefined}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`display display-md ${light ? "text-white" : ""}`}>
        {title}
      </h2>
      {lead ? (
        <p className={`lead mt-4 ${light ? "!text-white/85" : ""}`}>{lead}</p>
      ) : null}
    </div>
  );
}
