import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentArticle } from "@/components/ContentArticle";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBySlug, slugsForFamily } from "@/content/registry";

export const dynamicParams = false;

export function generateStaticParams() {
  return slugsForFamily("compare");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getBySlug("compare", slug);
  return page ? buildMetadata(page) : {};
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getBySlug("compare", slug);
  if (!page) notFound();
  return <ContentArticle page={page} />;
}
