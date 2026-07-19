import { renderOgImage, ogSize, ogContentType } from "@/lib/seo/ogImage";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Metablify. See more in your LC/MS data.";

export default function OgImage() {
  return renderOgImage("LC/MS platform", "See more in your LC/MS data.");
}
