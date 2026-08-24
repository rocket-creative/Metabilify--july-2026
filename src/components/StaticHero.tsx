import type { JSX } from "react";
import { Button } from "./Button";
import { ImagePlaceholder } from "./ImagePlaceholder";

const credibility = [
  "Developed at the Donald Danforth Plant Science Center",
  "Metabolomics · Proteomics · Multi-omics",
];

export function StaticHero(): JSX.Element {
  return (
    <section className="hero-static">
      <div className="hero-static-inner">
        <div className="hero-static-copy">
          <h1 className="display hero-headline">
            <span className="block">See more in your</span>
            <span className="block">LC/MS data.</span>
          </h1>

          <p className="lead hero-static-lead">
            Metablify is an LC/MS platform built on the first principles of
            physics.
          </p>

          <div className="hero-static-cta">
            <Button href="/platform">Explore Metablify</Button>
          </div>

          <ul className="hero-credibility">
            {credibility.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>

        <div className="hero-static-media">
          <ImagePlaceholder
            ratio="4/3"
            label="Gloved hands loading a 96-well microplate into an LC/MS autosampler"
          />
        </div>
      </div>
    </section>
  );
}
