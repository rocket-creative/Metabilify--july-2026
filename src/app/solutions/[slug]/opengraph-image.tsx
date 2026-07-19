import { renderOgImage, ogSize, ogContentType } from "@/lib/seo/ogImage";
import { getBySlug, slugsForFamily } from "@/content/registry";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Metablify solution";

export function generateStaticParams() {
  return slugsForFamily("solution");
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getBySlug("solution", slug);
  return renderOgImage("Solution", page?.h1 ?? "Metablify");
}
