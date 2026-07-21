import { renderOgImage, ogSize, ogContentType } from "@/lib/seo/ogImage";
import { getBySlug, slugsForFamily } from "@/content/registry";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Metablify application";

export function generateStaticParams() {
  return slugsForFamily("application");
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getBySlug("application", slug);
  return renderOgImage("Application", page?.h1 ?? "Metablify");
}
