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
  injection: {
    src: "/images/stock/athlete-injection.jpg",
    alt: "Athlete preparing an injection in the upper arm",
    width: 1201,
    height: 1800,
    objectPosition: "center 58%",
  },
} as const satisfies Record<string, StockShot>;
