import { Reveal } from "./Reveal";
import AmplificationGraphic from "./visuals/AmplificationGraphic";
import { AlignIcon, AmplifyIcon, PoolIcon } from "./visuals/PipelineIcons";

/**
 * The CEO's sketch for the top of the platform page: three boxes — Align,
 * Pool, Amplify — feeding one Metablify output. Copy is his, from the 9/7
 * deck. The output panel shows the align-and-amplify graphic.
 */
const STAGES = [
  {
    n: "01",
    title: "Align",
    icon: <AlignIcon />,
    body: "Bring corresponding signals into alignment across samples.",
  },
  {
    n: "02",
    title: "Pool",
    icon: <PoolIcon />,
    body: "Pool information across samples to strengthen consistent signal.",
  },
  {
    n: "03",
    title: "Amplify",
    icon: <AmplifyIcon />,
    body: "Make consistent signal more prominent relative to background noise.",
  },
] as const;

export function PlatformPipeline() {
  return (
    <section className="pipeline section-wide band-y section-grey">
      <div className="gutter-x mx-auto max-w-[80rem]">
        <Reveal>
          <p className="eyebrow mb-4">How Metablify works</p>
          <h2 className="display display-lg mb-5 max-w-3xl">
            From Noisy LC/MS Data to Quantified Mass Features
          </h2>
          <p className="lead mb-10 md:mb-14">
            Metablify analyzes complex LC/MS datasets as a whole, using
            information across samples to align signals and amplify what is
            real.
          </p>
        </Reveal>

        <div className="pipeline-stages">
          {STAGES.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} className="pipeline-stage-wrap">
              <article className="pipeline-stage">
                <span className="pipeline-badge">{s.icon}</span>
                <p className="pipeline-num">{s.n}</p>
                <h3 className="pipeline-title">{s.title}</h3>
                <p className="pipeline-body">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="pipeline-feed" aria-hidden="true">
          <span className="pipeline-feed-line" />
          <span className="pipeline-feed-line" />
          <span className="pipeline-feed-line" />
        </div>

        <Reveal delay={300}>
          <div className="pipeline-output">
            <div className="pipeline-output-copy">
              <p className="eyebrow mb-3">Metablify output</p>
              <h3 className="pipeline-output-title">
                Cleaner, aligned, quantified mass features.
              </h3>
              <p className="pipeline-output-body">
                A structured, dataset-wide view of mass features ready for
                downstream analysis.
              </p>
            </div>
            <div className="pipeline-output-visual">
              <AmplificationGraphic />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
