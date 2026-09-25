import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";

export function AboutHero() {
  return (
    <section className="section-wide band-y wash-white border-b border-stone">
      <div className="gutter-x mx-auto max-w-[80rem]">
        <Reveal>
          <p className="eyebrow mb-4">About Metablify</p>
          <h1 className="display display-xl max-w-4xl">
            Built at Danforth. Created to Solve a Real LC/MS Problem.
          </h1>
        </Reveal>
        <Reveal delay={60}>
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
        <Reveal delay={80}>
          <div className="about-prose mt-8 md:mt-10">
            <p className="lead">
              Metablify grew from years of ambitious scientific research at the
              Donald Danforth Plant Science Center and a simple realization: as
              LC/MS experiments became larger and more complex, the tools used
              to analyze the data were not keeping pace.
            </p>
            <p>
              What began as a challenge inside the Baxter lab became a new
              approach to LC/MS mass-feature analysis, and ultimately a company
              built to bring that technology to researchers and organizations
              far beyond its place of origin.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
