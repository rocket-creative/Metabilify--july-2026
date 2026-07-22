import { Reveal } from "./Reveal";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  variant?: "wide" | "bleed";
  height?: string;
};

export function FullBleedImage({
  src,
  alt,
  caption,
  variant = "wide",
  height = "clamp(18rem, 46vw, 34rem)",
}: Props) {
  const figure = (
    <figure className="m-0">
      <div className="overflow-hidden rounded-[1.5rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full object-cover"
          style={{ height }}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      )}
    </figure>
  );

  if (variant === "bleed") {
    return (
      <section className="section-wide py-[clamp(2rem,5vw,4rem)]">
        <Reveal>
          <div className="px-3 md:px-5">{figure}</div>
        </Reveal>
      </section>
    );
  }

  return (
    <section className="section-wide py-[clamp(2rem,5vw,4rem)]">
      <div className="mx-auto max-w-[80rem] px-5 md:px-10">
        <Reveal>{figure}</Reveal>
      </div>
    </section>
  );
}
