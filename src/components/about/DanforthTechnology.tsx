import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { AboutProse, AboutSection } from "./AboutSection";

/** Logos link out when a URL is confirmed. QRM Capital does not have one yet. */
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
  {
    name: "QRM Capital",
    href: null,
    src: "/images/partners/qrm-capital.png",
    width: 500,
    height: 192,
  },
] as const;

export function DanforthTechnology() {
  return (
    <AboutSection
      eyebrow="From Research to Company"
      title="Danforth Technology Company brought the idea to market."
    >
      <Reveal>
        <AboutProse
          paragraphs={[
            "Team Metablify won the Danforth Center’s Big Ideas 3.0 competition in 2023. Subsequent proof-of-concept funding helped advance the technology. Danforth Technology Company (DTC) then led the effort to turn the research into an independent business, bringing together the scientific team, intellectual property, investment, and commercial leadership.",
            "DTC brought Michael Bielski into the effort as Metablify’s founding CEO. Bielski joined Baxter, Hubbard, and Connelly as a co-founder to build the company and bring the platform to commercial and research partners. DTC spun out Metablify in 2024 and provided initial investment alongside QRM Capital.",
          ]}
        />
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {logos.map((logo, i) => (
          <Reveal key={logo.name} delay={i * 60}>
            {logo.href ? (
              <a
                className="about-logo"
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${logo.name} (opens in a new tab)`}
              >
                <span className="partner-logo">
                  <Image
                    src={logo.src}
                    alt=""
                    width={logo.width}
                    height={logo.height}
                    sizes="(min-width: 1024px) 18rem, 90vw"
                  />
                </span>
              </a>
            ) : (
              <div className="about-logo">
                <span className="partner-logo">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    sizes="(min-width: 1024px) 18rem, 90vw"
                  />
                </span>
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </AboutSection>
  );
}
