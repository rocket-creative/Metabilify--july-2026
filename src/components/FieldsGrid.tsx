import Link from "next/link";
import type { ReactNode } from "react";
import { stock, type StockShot, photoSizes } from "@/lib/stock";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import {
  AppleIcon,
  BarsIcon,
  DropIcon,
  FlaskIcon,
  LeafIcon,
  PillIcon,
} from "./visuals/FieldIcons";

/**
 * The six application fields, shared by /applications and the home page so
 * the two never drift. Copy is the CEO's from the 9/7 Applications deck.
 * Fields with a live page link to it; the rest go to the discuss form until
 * their pages exist.
 */
export const FIELDS: {
  href: string;
  title: string;
  body: string;
  icon: ReactNode;
  /** Art brief. Shown only while the slot is still a placeholder. */
  image: string;
  photo?: StockShot;
}[] = [
  {
    href: "/applications/drug-discovery",
    title: "Drug Discovery & Development",
    body: "Use metabolomic and proteomic data to support target discovery, compound profiling, mechanism-of-action research, and other discovery stage workflows.",
    icon: <PillIcon />,
    image: "Capsules and a pipette on a lab bench, cool blue tones",
    photo: stock.capsules,
  },
  {
    href: "/applications/plant-agricultural-science",
    title: "Agriculture & Crop Science",
    body: "Apply large-scale metabolomics and proteomics to crop diversity, trait discovery, plant biology, breeding populations, and agricultural research.",
    icon: <LeafIcon />,
    image: "Young crop seedlings in rows, field soil",
    photo: stock.greenhouse,
  },
  {
    href: "/discuss",
    title: "Toxicology & Anti-Doping",
    body: "Detect and characterize exogenous compounds, metabolites, and biomarkers for safety, compliance, and performance testing.",
    icon: <FlaskIcon />,
    image: "Pipette dropping into a test tube, clinical lab",
    photo: stock.injection,
  },
  {
    href: "/discuss",
    title: "Biomarker Discovery",
    body: "Apply metabolomics and proteomics to discover and validate biomarkers across biological systems.",
    icon: <BarsIcon />,
    image: "Cells or molecular structures under fluorescence, teal tones",
    photo: stock.cells,
  },
  {
    href: "/applications/pfas-environmental",
    title: "Environmental & PFAS Research",
    body: "Analyze complex environmental samples to investigate known and unknown chemical features, contaminant exposure signatures, and emerging compounds of concern.",
    icon: <DropIcon />,
    image: "Lake and forest landscape, clear water",
    photo: stock.riverside,
  },
  {
    href: "/discuss",
    title: "Food, Nutrition & Natural Products",
    body: "Apply LC/MS omics to food composition, nutrition research, natural-product discovery, authenticity, and complex biological or chemical profiling.",
    icon: <AppleIcon />,
    image: "Fresh produce close-up: tomatoes, berries, herbs",
    photo: stock.berries,
  },
];

export function FieldsGrid({
  photos,
}: {
  /** Swap a field's photo on one page without changing the shared default. */
  photos?: Partial<Record<(typeof FIELDS)[number]["title"], StockShot>>;
} = {}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {FIELDS.map((f, i) => {
        const photo = photos?.[f.title] ?? f.photo;
        return (
        <Reveal key={f.title} delay={i * 70} className="h-full">
          <Link href={f.href} className="field-card group">
            <div className="field-card-media">
              {photo ? (
                <Photo
                  shape="card"
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  objectPosition={photo.objectPosition}
                  sizes={photoSizes.card}
                />
              ) : (
                <ImagePlaceholder ratio="3/2" label={f.image} />
              )}
              <span className="field-card-badge">{f.icon}</span>
            </div>
            <div className="field-card-body">
              <h3 className="field-card-title">{f.title}</h3>
              <p className="field-card-text">{f.body}</p>
              <span className="arrow-link mt-auto" aria-hidden="true">
                <span className="arrow-ne">→</span>
              </span>
            </div>
          </Link>
        </Reveal>
        );
      })}
    </div>
  );
}
