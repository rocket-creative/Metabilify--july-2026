import { renderOgImage, ogSize, ogContentType } from "@/lib/seo/ogImage";
import { getBySlug, slugsForFamily } from "@/content/registry";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Metablify comparison";

export function generateStaticParams() {
  return slugsForFamily("compare");
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getBySlug("compare", slug);
  return renderOgImage("Comparison", page?.h1 ?? "Metablify");
}
