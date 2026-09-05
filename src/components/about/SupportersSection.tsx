import Image from "next/image";
import { CopyPlaceholder } from "@/components/ImagePlaceholder";
import { Reveal } from "@/components/Reveal";
import { supporters } from "@/lib/site";
import { AboutSection } from "./AboutSection";

/** No brand assets are cleared for use, so each tile is set typographically. */
function hostLabel(href: string) {
  return new URL(href).hostname.replace(/^www\./, "");
}

export function SupportersSection() {
  return (
    <AboutSection
      eyebrow="Investors & Supporters"
      title="The Organizations That Helped Move Metablify Forward."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {supporters.map((supporter, i) => (
          <Reveal key={supporter.name} delay={i * 60}>
            {supporter.href ? (
              <a
                className="about-wordmark"
                href={supporter.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {supporter.logo ? (
                  <Image
                    className="about-wordmark-logo"
                    src={supporter.logo.src}
                    alt=""
                    width={supporter.logo.width}
                    height={supporter.logo.height}
                    sizes="18rem"
                  />
                ) : null}
                <p className="about-wordmark-name">{supporter.name}</p>
                <p className="about-wordmark-cue">
                  {hostLabel(supporter.href)}
                  <span aria-hidden="true"> &#8599;</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </p>
              </a>
            ) : (
              <div className="about-wordmark">
                {supporter.logo ? (
                  <Image
                    className="about-wordmark-logo"
                    src={supporter.logo.src}
                    alt=""
                    width={supporter.logo.width}
                    height={supporter.logo.height}
                    sizes="18rem"
                  />
                ) : null}
                <p className="about-wordmark-name">{supporter.name}</p>
              </div>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal delay={supporters.length * 60}>
        <div className="about-slot mt-6">
          <p className="about-slot-index">Supporters — open slot</p>
          <CopyPlaceholder label="Additional approved investors or supporters — organization name and link" />
        </div>
      </Reveal>
    </AboutSection>
  );
}
