import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Reveal } from "@/components/Reveal";
import { AboutProse, AboutSection } from "./AboutSection";

const paragraphs = [
  "The scientific foundation for Metablify was built in an environment designed to tackle difficult, data-intensive biological questions.",
  "Ivan Baxter and collaborators at the Donald Danforth Plant Science Center have worked across multiple federally supported research programs spanning systems biology, computational analysis, high-throughput phenotyping, and multiomics. U.S. Department of Energy Genomic Science Program awards supported this research over consecutive cycles from 2012 through the present.",
  "As the science scaled, so did the data.",
  "Within this federally supported research environment, the Baxter lab confronted a practical challenge at unprecedented scale. In one large untargeted metabolomics experiment, the team generated approximately 3,800 samples. Existing software reportedly capped out at about 400 samples, making it difficult to analyze the full experiment as a single dataset.",
  "That challenge became the starting point for Metablify.",
];

function ChromatogramPanel() {
  return (
    <svg
      className="about-diagram"
      viewBox="0 0 240 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M24 16 V118 H224" opacity="0.4" />
      <g opacity="0.35">
        <path d="M32 118 v-5" />
        <path d="M62 118 v-4" />
        <path d="M88 118 v-6" />
        <path d="M110 118 v-4" />
        <path d="M136 118 v-5" />
        <path d="M162 118 v-4" />
        <path d="M192 118 v-6" />
        <path d="M216 118 v-4" />
      </g>
      <path d="M24 118 L40 118 C44 118 44 78 48 78 C52 78 52 118 56 118 L66 118 C70 118 70 44 74 44 C78 44 78 118 82 118 L88 118 C92 118 92 92 96 92 C100 92 100 118 104 118 L114 118 C118 118 118 30 122 30 C126 30 126 118 130 118 L140 118 C144 118 144 84 148 84 C152 84 152 118 156 118 L168 118 C172 118 172 60 176 60 C180 60 180 118 184 118 L194 118 C198 118 198 96 202 96 C206 96 206 118 210 118 L224 118" />
      <circle cx="48" cy="78" r="2" />
      <circle cx="74" cy="44" r="2" />
      <circle cx="122" cy="30" r="2" />
      <circle cx="176" cy="60" r="2" />
    </svg>
  );
}

export function ScaleChallenge() {
  return (
    <AboutSection
      tone="grey"
      eyebrow="Built on Ambitious Science"
      title="Big Data Created a Bigger Analytical Challenge."
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Reveal>
            <AboutProse paragraphs={paragraphs} emphasiseLast />
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={80}>
            <div className="about-stats">
              <div>
                <p className="about-stat-figure">~3,800</p>
                <p className="about-stat-label">
                  Samples in one untargeted metabolomics experiment
                </p>
              </div>
              <p className="about-stat-divider">versus</p>
              <div>
                <p className="about-stat-figure about-stat-figure--muted">
                  ~400
                </p>
                <p className="about-stat-label">
                  Reported ceiling of existing software
                </p>
              </div>
            </div>
            <ChromatogramPanel />
            <div className="mt-6">
              <ImagePlaceholder
                ratio="3/2"
                label="Baxter lab at the Danforth Center — LC/MS instrument bay or growth chambers"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </AboutSection>
  );
}
