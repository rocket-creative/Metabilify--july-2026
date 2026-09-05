import Link from "next/link";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Reveal } from "./Reveal";

type Application = {
  index: string;
  href: string;
  name: string;
  body: string;
  link: string;
  /** Art brief. The CEO wants a real image here, confirmed with the inventors. */
  image: string;
};

const APPLICATIONS: Application[] = [
  {
    index: "01",
    href: "/applications/metabolomics",
    name: "Metabolomics",
    body: "Turn complex untargeted LC/MS datasets into cleaner, aligned, and quantified mass-feature results.",
    link: "Explore Metabolomics",
    image: "LC/MS instrument — liquid chromatography stack coupled to a mass spectrometer",
  },
  {
    index: "02",
    href: "/applications/proteomics",
    name: "Proteomics",
    body: "Reveal and quantify peptide mass features across complex LC/MS datasets with a workflow built for scale, alignment, and signal clarity.",
    link: "Explore Proteomics",
    image: "Mass spectrometer ion source, close-up",
  },
];

export function ApplicationsCarousel() {
  return (
    <section className="wash-white section-wide band-y">
      <div className="gutter-x mx-auto max-w-[80rem]">
        <Reveal>
          <div className="mb-10 max-w-2xl md:mb-14">
            <p className="eyebrow mb-4">Applications</p>
            <h2 className="display display-lg mb-6">
              One Metablify Platform. Multiple Omics.
            </h2>
            <p className="lead">
              Metablify analyzes the mass-feature layer shared across LC/MS
              workflows, with leading applications in metabolomics and
              proteomics.
            </p>
          </div>
        </Reveal>

        <div className="applications-grid">
          {APPLICATIONS.map((app, i) => (
            <Reveal key={app.href} delay={i * 120} className="h-full">
              <Link href={app.href} className="card card-link media-card group">
                <ImagePlaceholder
                  ratio="16/9"
                  label={app.image}
                  className="media-card-media media-card-media--wide"
                />
                <div className="media-card-body">
                  <span className="media-card-index">{app.index}</span>
                  <h3
                    className="mb-4 text-2xl text-ink md:text-3xl"
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {app.name}
                  </h3>
                  <p className="mb-8 max-w-md text-base leading-relaxed text-muted">
                    {app.body}
                  </p>
                  <span className="arrow-link mt-auto">
                    {app.link} <span className="arrow-ne">↗</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
