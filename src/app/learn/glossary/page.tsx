import type { Metadata } from "next";
import { ContentHub } from "@/components/ContentHub";
import { buildBasicMetadata } from "@/lib/seo/metadata";
import { byFamily } from "@/content/registry";

export const metadata: Metadata = buildBasicMetadata({
  title: "LC/MS Glossary | Metablify",
  description:
    "A working glossary of LC/MS and omics terms, each with a substantive definition and a practical worked example, from mass feature to batch effect.",
  path: "/learn/glossary",
});

export default function GlossaryHub() {
  const pages = byFamily("glossary")
    .filter((p) => p.status !== "draft")
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <ContentHub
      eyebrow="Glossary"
      title="A working glossary for LC/MS and omics"
      lead="Not dictionary stubs. Each entry defines a term and shows what it means in practice, so the glossary is useful at the bench and not just for a definition."
      pages={pages}
      crumbs={[
        { name: "Home", href: "/" },
        { name: "Learn", href: "/learn" },
        { name: "Glossary", href: "/learn/glossary" },
      ]}
      cta={{ tier: "benchmark" }}
    />
  );
}
