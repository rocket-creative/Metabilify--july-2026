import Image, { type ImageProps } from "next/image";

type Shape = "card" | "wide" | "circle" | "flat";

/**
 * Every photograph on the site goes through this component so stock from
 * Envato, the team headshots, and whatever Mike shoots this week read as one
 * set. It does three things: a fixed crop per slot shape, a shared colour
 * grade (saturation pulled down, contrast up a touch), and a faint forest
 * tint laid over the frame. Change the grade in one place, in base.css under
 * `.photo-frame`.
 */
export function Photo({
  shape = "card",
  className = "",
  alt,
  objectPosition,
  style,
  ...img
}: Omit<ImageProps, "alt"> & {
  alt: string;
  shape?: Shape;
  className?: string;
  objectPosition?: string;
}) {
  return (
    <span className={`photo-frame photo-frame--${shape} ${className}`}>
      <Image
        alt={alt}
        style={objectPosition ? { ...style, objectPosition } : style}
        {...img}
      />
    </span>
  );
}
