import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { AboutHero } from "@/components/about/AboutHero";
import { ClosingBand } from "@/components/about/ClosingBand";
import { DanforthTechnology } from "@/components/about/DanforthTechnology";
import { ScientificInsight } from "@/components/about/ScientificInsight";

export const metadata: Metadata = {
  title: "About",
  description:
    "Metablify began at the Donald Danforth Plant Science Center, where the Baxter lab needed a better way to find meaningful signals in large LC/MS experiments.",
  alternates: { canonical: "/about" },
};

/**
 * Four bands: white story, grey insight, white company, forest close.
 * Forest is only the last band, so it never sits against another forest band.
 */
export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      <AboutHero />
      <ScientificInsight />
      <DanforthTechnology />
      <ClosingBand />
    </>
  );
}
