import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";

export function AboutHero() {
  return (
    <section className="section-wide band-y wash-white border-b border-stone">
      <div className="gutter-x mx-auto max-w-[80rem]">
        <Reveal>
          <p className="eyebrow mb-4">About Metablify</p>
          <h1 className="display display-lg max-w-4xl">Our Story</h1>
          <p className="about-story-line">
            Built to help scientists see more in LC/MS data.
          </p>
        </Reveal>
        <Reveal delay={60}>
          <div className="about-prose mt-8 md:mt-10">
            <p>
              Metablify began at the Donald Danforth Plant Science Center,
              where the Baxter lab faced a growing challenge: large LC/MS
              experiments were producing more data than existing analysis tools
              could reliably handle. The team needed a better way to find
              meaningful signals across thousands of samples.
            </p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
            <Photo
              shape="wide"
              src="/images/about/danforth-campus.webp"
              alt="Aerial view of the Donald Danforth Plant Science Center campus"
              width={900}
              height={600}
              sizes="(min-width: 810px) 40rem, 90vw"
              objectPosition="center 42%"
            />
            <Photo
              shape="wide"
              src="/images/about/danforth-building.jpg"
              alt="The Donald Danforth Plant Science Center, with the entrance courtyard and reflecting pools"
              width={1024}
              height={768}
              sizes="(min-width: 810px) 40rem, 90vw"
              objectPosition="center 38%"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
