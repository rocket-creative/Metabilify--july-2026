import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";

export function AboutHero() {
  return (
    <section className="about-hero">
      <Photo
        shape="wide"
        className="about-hero-photo"
        src="/images/about/danforth-building.jpg"
        alt="The Donald Danforth Plant Science Center, with the entrance courtyard and reflecting pools"
        width={1024}
        height={768}
        sizes="100vw"
        objectPosition="center 38%"
      />
      <div className="gutter-x about-hero-copy">
        <Reveal>
          <p className="eyebrow mb-4">About Metablify</p>
          <h1 className="display display-lg max-w-4xl">Our Story</h1>
          <p className="about-story-line">
            Built to help scientists see more in LC/MS data.
          </p>
        </Reveal>
      </div>
      <div className="gutter-x about-hero-prose">
        <Reveal delay={60}>
          <div className="about-prose">
            <p>
              Metablify began at the Donald Danforth Plant Science Center,
              where the Baxter lab faced a growing challenge: large LC/MS
              experiments were producing more data than existing analysis tools
              could reliably handle. The team needed a better way to find
              meaningful signals across thousands of samples.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
