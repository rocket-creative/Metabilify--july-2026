import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { AboutProse, AboutSection } from "./AboutSection";

const nextLinks = [
  { href: "/technology", label: "Explore the Technology" },
  { href: "/team", label: "Meet the Team" },
  { href: "/discuss", label: "Get in Touch" },
] as const;

export function ClosingBand() {
  return (
    <AboutSection tone="forest" title="What Comes Next">
      <Reveal>
        <AboutProse
          paragraphs={[
            "Today, Metablify works with partners to develop applications across metabolomics, proteomics, and other LC/MS workflows. The goal remains the one that started the work at Danforth: help scientists find more meaningful information in complex LC/MS data.",
          ]}
          emphasiseLast
        />
      </Reveal>

      <Reveal delay={80}>
        <nav className="about-links" aria-label="Continue">
          {nextLinks.map((link) => (
            <Link key={link.href} href={link.href} className="arrow-link">
              {link.label}{" "}
              <span className="arrow-ne" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </nav>
      </Reveal>
    </AboutSection>
  );
}
