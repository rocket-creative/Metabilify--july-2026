import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  image,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    objectPosition?: string;
  };
}) {
  const copy = (
    <Reveal>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h1 className="display display-lg max-w-3xl">{title}</h1>
      {lead ? <p className="lead mt-6">{lead}</p> : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </Reveal>
  );

  if (!image) {
    return (
      <section className="section wash-white border-b border-stone">{copy}</section>
    );
  }

  return (
    <section className="page-hero-photo">
      <Photo
        shape="wide"
        className="page-hero-photo-media"
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="100vw"
        objectPosition={image.objectPosition ?? "center 40%"}
      />
      <div className="gutter-x page-hero-photo-copy">{copy}</div>
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
    <div className="section-head max-w-2xl">
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
