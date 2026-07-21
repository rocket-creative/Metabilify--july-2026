import { Reveal } from "./Reveal";

export function FeatureCompare() {
  return (
    <Reveal>
      <div className="relative mx-auto max-w-3xl py-8">
        <div className="relative mx-auto aspect-square max-w-md">
          <div className="absolute inset-[8%] rounded-full bg-ink" />
          <div
            className="absolute left-[38%] top-[40%] h-[28%] w-[28%] rounded-full bg-stone"
            style={{ boxShadow: "0 0 0 3px white" }}
          />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-2">Metablify</p>
            <p className="text-ink">
              Metablify reveals a broader set of real mass features across LC/MS
              datasets.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2" style={{ color: "var(--color-faint)" }}>
              Legacy workflows
            </p>
            <p className="text-muted">
              Legacy workflows may recover only a subset of detectable mass
              features.
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
