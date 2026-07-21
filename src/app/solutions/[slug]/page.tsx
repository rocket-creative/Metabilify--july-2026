import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentArticle } from "@/components/ContentArticle";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBySlug, slugsForFamily } from "@/content/registry";

export const dynamicParams = false;

export function generateStaticParams() {
  return slugsForFamily("solution");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getBySlug("solution", slug);
  return page ? buildMetadata(page) : {};
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getBySlug("solution", slug);
  if (!page) notFound();
  return <ContentArticle page={page} />;
}
