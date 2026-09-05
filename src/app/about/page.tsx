import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { AboutHero } from "@/components/about/AboutHero";
import { ArchGrants } from "@/components/about/ArchGrants";
import { BigIdeas } from "@/components/about/BigIdeas";
import { CapitalBand } from "@/components/about/CapitalBand";
import { ClosingBand } from "@/components/about/ClosingBand";
import { DanforthTechnology } from "@/components/about/DanforthTechnology";
import { FoundersGrid } from "@/components/about/FoundersGrid";
import { JourneyTimeline } from "@/components/about/JourneyTimeline";
import { ScaleChallenge } from "@/components/about/ScaleChallenge";
import { ScientificInsight } from "@/components/about/ScientificInsight";
import { StartupToWatch } from "@/components/about/StartupToWatch";
import { SupportersSection } from "@/components/about/SupportersSection";
import { TeamBand } from "@/components/about/TeamBand";
import { TodayPlatform } from "@/components/about/TodayPlatform";

export const metadata: Metadata = {
  title: "About",
  description:
    "Metablify was built at the Donald Danforth Plant Science Center, where an LC/MS experiment outgrew the available software. How that challenge became a company.",
  alternates: { canonical: "/about" },
};

/**
 * Section order and background rhythm are fixed by the copy draft: white, grey
 * or sage, with forest kept for the three emphasis bands (capital, today, and
 * the close) and never placed adjacent to another forest band.
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
      <ScaleChallenge />
      <ScientificInsight />
      <BigIdeas />
      <DanforthTechnology />
      <FoundersGrid />
      <CapitalBand />
      <ArchGrants />
      <StartupToWatch />
      <JourneyTimeline />
      <TodayPlatform />
      <TeamBand />
      <SupportersSection />
      <ClosingBand />
    </>
  );
}
