import Image from "next/image";
import { Reveal } from "./Reveal";

type Ratio = "16/9" | "4/3" | "1/1";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  variant?: "wide" | "bleed" | "embedded";
  ratio?: Ratio;
  priority?: boolean;
};

export function FullBleedImage({
  src,
  alt,
  caption,
  variant = "wide",
  ratio = "16/9",
  priority = false,
}: Props) {
  const sizes =
    variant === "bleed" ? "100vw" : "(min-width: 1280px) 1280px, 100vw";

  const figure = (
    <figure className="m-0">
      <div
        className="relative overflow-hidden rounded-[1.5rem]"
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      )}
    </figure>
  );

  if (variant === "embedded") {
    return <Reveal>{figure}</Reveal>;
  }

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
