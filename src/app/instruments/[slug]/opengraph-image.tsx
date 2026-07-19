import { renderOgImage, ogSize, ogContentType } from "@/lib/seo/ogImage";
import { getBySlug, slugsForFamily } from "@/content/registry";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Metablify instrument support";

export function generateStaticParams() {
  return slugsForFamily("instrument");
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getBySlug("instrument", slug);
  return renderOgImage("Instrument", page?.h1 ?? "Metablify");
}
