import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { AboutProse, AboutSection } from "./AboutSection";

/** Logos link out; the partner sites are expected to link back. */
const logos = [
  {
    name: "Donald Danforth Plant Science Center",
    href: "https://www.danforthcenter.org/",
    src: "/images/partners/danforth-center.png",
    width: 700,
    height: 89,
  },
  {
    name: "Danforth Technology Company",
    href: "https://danforthtechnology.com/",
    src: "/images/partners/danforth-technology-company.png",
    width: 500,
    height: 156,
  },
] as const;

export function DanforthTechnology() {
  return (
    <AboutSection
      eyebrow="From Discovery to Startup"
      title="Danforth Technology Company Took the Next Step."
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7">
          <AboutProse
            paragraphs={[
              "Scientific breakthroughs do not become companies on their own.",
              "Danforth Technology Company was created to help move promising technologies developed by Danforth Center scientists from discovery toward commercial impact by bringing together scientists, entrepreneurs, investors, management, and capital.",
              "DTC recognized the commercial potential of the technology emerging from the Baxter lab and led the effort to build a company around it.",
              "DTC helped bring experienced entrepreneurial leadership into the effort, connecting Michael Bielski with the scientific founders and supporting the transition from research innovation to independent company.",
            ]}
          />
        </Reveal>
        <Reveal delay={100} className="lg:col-span-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {logos.map((logo) => (
              <a
                key={logo.name}
                className="about-logo"
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="partner-logo">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    sizes="(min-width: 1024px) 24rem, 90vw"
                  />
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </AboutSection>
  );
}
