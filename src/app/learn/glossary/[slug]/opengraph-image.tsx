import { renderOgImage, ogSize, ogContentType } from "@/lib/seo/ogImage";
import { getBySlug, slugsForFamily } from "@/content/registry";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Metablify glossary term";

export function generateStaticParams() {
  return slugsForFamily("glossary");
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getBySlug("glossary", slug);
  return renderOgImage("Glossary", page?.h1 ?? "Metablify");
}
