import type { Metadata } from "next";
import { ContentHub } from "@/components/ContentHub";
import { buildBasicMetadata } from "@/lib/seo/metadata";
import { byFamily } from "@/content/registry";

export const metadata: Metadata = buildBasicMetadata({
  title: "Compare LC/MS Tools | Metablify",
  description:
    "Honest comparisons of Metablify with common LC/MS processing tools, including where each tool is the right choice and where Metablify complements it.",
  path: "/compare",
});

export default function CompareHub() {
  const pages = byFamily("compare").filter((p) => p.status !== "draft");
  return (
    <ContentHub
      eyebrow="Comparison"
      title="How Metablify compares, fairly"
      lead="These pages name the real strengths of each tool and say plainly when the other tool is the right choice. Metablify often complements an existing stack rather than replacing it."
      pages={pages}
      crumbs={[
        { name: "Home", href: "/" },
        { name: "Comparison", href: "/compare" },
      ]}
      cta={{
        tier: "assessment",
        proof: "Compare on your own data rather than on anyone's marketing.",
      }}
    />
  );
}
