import type { Metadata } from "next";
import { ContentHub } from "@/components/ContentHub";
import { buildBasicMetadata } from "@/lib/seo/metadata";
import { byFamily } from "@/content/registry";

export const metadata: Metadata = buildBasicMetadata({
  title: "LC/MS Instruments | Metablify",
  description:
    "How Metablify approaches data from high resolution LC/MS platforms, including file formats, data characteristics, and where feature recovery matters.",
  path: "/instruments",
});

export default function InstrumentsHub() {
  const pages = byFamily("instrument").filter((p) => p.status !== "draft");
  return (
    <ContentHub
      eyebrow="Instruments"
      title="Your data, by the box in your lab"
      lead="Researchers think in terms of the instrument they run. These pages describe how Metablify approaches data from each platform. Production support is confirmed per project."
      pages={pages}
      crumbs={[
        { name: "Home", href: "/" },
        { name: "Instruments", href: "/instruments" },
      ]}
      cta={{
        tier: "assessment",
        proof: "Confirm support for your platform and run a limited assessment.",
      }}
    />
  );
}
