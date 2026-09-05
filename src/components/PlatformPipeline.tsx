import { CopyPlaceholder } from "./ImagePlaceholder";
import { Reveal } from "./Reveal";
import { AlignIcon, AmplifyIcon, PoolIcon } from "./visuals/PipelineIcons";
import Image from "next/image";

/**
 * The CEO's sketch for the top of the platform page: three boxes — Align,
 * Pool, Amplify — feeding one Metablify output. Stage copy is a placeholder
 * until the technical team writes it; the heading and lead are his own draft.
 */
const STAGES = [
  {
    n: "01",
    title: "Align",
    icon: <AlignIcon />,
    placeholder: "Align — one or two sentences on aligning signals across every sample in the dataset",
  },
  {
    n: "02",
    title: "Pool",
    icon: <PoolIcon />,
    placeholder: "Pool — one or two sentences on pooling consistent evidence across samples",
  },
  {
    n: "03",
    title: "Amplify",
    icon: <AmplifyIcon />,
    placeholder: "Amplify — one or two sentences on amplifying real signal and suppressing noise",
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
          <p className="lead mb-4">
            Metablify analyzes complex LC/MS datasets as a whole, aligning
            signals across samples and pooling consistent evidence to amplify
            what is real.
          </p>
          <p className="lead mb-10 md:mb-14">
            The Metablify platform then detects, resolves, and quantifies mass
            features for downstream analysis.
          </p>
        </Reveal>

        <div className="pipeline-stages">
          {STAGES.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} className="pipeline-stage-wrap">
              <article className="pipeline-stage">
                <span className="pipeline-badge">{s.icon}</span>
                <p className="pipeline-num">{s.n}</p>
                <h3 className="pipeline-title">{s.title}</h3>
                <CopyPlaceholder label={s.placeholder} />
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
                A dataset-wide mass-feature matrix, aligned across every
                sample and ready for downstream analysis.
              </p>
              <p className="pipeline-output-note">
                Same region of the same dataset. A legacy workflow reports no
                mass features; Metablify resolves one real signal across 598
                samples and flags a probable artifact.
              </p>
            </div>
            <div className="pipeline-output-visual">
              <figure className="pipeline-output-figure">
                <Image
                  src="/images/competitor-vs-metablify.png"
                  alt="Two mass versus retention-time plots of the same region. Competitor: no mass features detected. Metablify: a single real signal detected in 598 samples, with a probable artifact identified below it."
                  width={2000}
                  height={691}
                  sizes="(min-width: 810px) 46rem, 90vw"
                />
              </figure>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
