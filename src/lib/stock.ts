/**
 * Web-sized crops of the Envato set in /stock-photos. Originals stay in that
 * folder; these are what the site actually serves.
 */
export type StockShot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Keeps the subject in frame when the slot is a different shape. */
  objectPosition?: string;
};

export const stock = {
  autosampler: {
    src: "/images/stock/autosampler-blue-caps.jpg",
    alt: "Autosampler needle drawing from a blue-capped vial in an HPLC rack",
    width: 2200,
    height: 1466,
  },
  vialRack: {
    src: "/images/stock/sample-vial-rack.jpg",
    alt: "Rack of capped sample vials loaded in a laboratory autosampler",
    width: 2200,
    height: 1238,
  },
  capsules: {
    src: "/images/stock/capsule-preparation.jpg",
    alt: "Gloved hand placing a capsule on a laboratory counting tray",
    width: 2200,
    height: 1463,
  },
  plantTubes: {
    src: "/images/stock/plant-sample-tubes.jpg",
    alt: "Researcher placing a plant cutting into a row of sample tubes",
    width: 2200,
    height: 1650,
  },
  greenhouse: {
    src: "/images/stock/greenhouse-plant-research.jpg",
    alt: "Researcher collecting a leaf sample above a greenhouse crop",
    width: 2200,
    height: 1237,
  },
  riverside: {
    src: "/images/stock/riverside-water-testing.jpg",
    alt: "Scientist holding water samples beside a tree-lined river",
    width: 2400,
    height: 1089,
    objectPosition: "78% center",
  },
  berries: {
    src: "/images/stock/fresh-berries.jpg",
    alt: "Bowls of strawberries, raspberries, blueberries, and other fresh fruit",
    width: 2200,
    height: 1466,
  },
  berryCloseup: {
    src: "/images/stock/berry-closeup.jpg",
    alt: "Close-up of raspberries and blueberries with a scoop of sugar",
    width: 2200,
    height: 1720,
  },
  injection: {
    src: "/images/stock/athlete-injection.jpg",
    alt: "Athlete preparing an injection in the upper arm",
    width: 1201,
    height: 1800,
    objectPosition: "center 58%",
  },
  massSpec: {
    src: "/images/stock/mass-spec-source.jpg",
    alt: "Close-up of a mass spectrometer ion source",
    width: 1024,
    height: 682,
  },
  peakTraces: {
    src: "/images/stock/peak-traces.jpg",
    alt: "Scientist reviewing chromatographic peak traces on a laboratory monitor",
    width: 1024,
    height: 683,
    objectPosition: "62% center",
  },
  labSession: {
    src: "/images/stock/lab-collaboration.jpg",
    alt: "Researchers gathered around a workstation in a laboratory",
    width: 1024,
    height: 683,
    objectPosition: "center 40%",
  },
  laptopReview: {
    src: "/images/stock/scientists-laptop-review.jpg",
    alt: "Two scientists reviewing results on a laptop, one holding a sample vial",
    width: 1024,
    height: 683,
  },
  laptopBench: {
    src: "/images/stock/scientists-laptop-bench.jpg",
    alt: "Two scientists working through data on a laptop at a lab bench",
    width: 1024,
    height: 682,
  },
  cells: {
    src: "/images/stock/fluorescent-cells.jpg",
    alt: "Fluorescence micrograph of cells with green filaments and red nuclei",
    width: 1024,
    height: 1024,
  },
} as const satisfies Record<string, StockShot>;

/**
 * Rendered slot width at each layout breakpoint, so Next serves a file that
 * matches the frame instead of the full master.
 * Phone, 810px tablet, 1024px desktop. Content stops growing at 80rem.
 */
export const photoSizes = {
  card: "(min-width: 1024px) 24rem, (min-width: 810px) 45vw, 92vw",
  carousel: "(min-width: 810px) 38rem, 92vw",
  wide: "(min-width: 64rem) 76rem, (min-width: 810px) 45vw, 92vw",
  wwuCard: "(min-width: 768px) 22rem, 92vw",
} as const;
