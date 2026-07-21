import type { Metadata } from "next";
import { ContentHub } from "@/components/ContentHub";
import { buildBasicMetadata } from "@/lib/seo/metadata";
import { byFamily } from "@/content/registry";

export const metadata: Metadata = buildBasicMetadata({
  title: "LC/MS Solutions | Metablify",
  description:
    "Technical solutions for the LC/MS processing problems that break large studies: peak splitting, retention time drift, batch effects, and low abundance recovery.",
  path: "/solutions",
});

export default function SolutionsHub() {
  const pages = byFamily("solution").filter((p) => p.status !== "draft");
  return (
    <ContentHub
      eyebrow="Solutions"
      title="Solutions for the problems that break large studies"
      lead="The failures that matter in LC/MS are not exotic. They are peak splitting, drift, batch effects, and lost low abundance signal. These pages describe each problem and how Metablify addresses it."
      pages={pages}
      crumbs={[
        { name: "Home", href: "/" },
        { name: "Solutions", href: "/solutions" },
      ]}
      cta={{
        tier: "assessment",
        proof:
          "Send a subset of your data and see the difference on your own study.",
      }}
    />
  );
}
