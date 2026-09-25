import type { StockShot } from "@/lib/stock";

/**
 * Lab photographs supplied with the press release. Not Envato stock.
 * Faces are not named here: the frames were not captioned.
 */
export const press = {
  labGroup: {
    src: "/images/press/lab-group.jpg",
    alt: "Researchers at the Donald Danforth Plant Science Center examining a plant sample",
    width: 1024,
    height: 682,
    objectPosition: "center 42%",
  },
  labSamples: {
    src: "/images/press/lab-samples.jpg",
    alt: "Researchers comparing plant samples growing in culture cups",
    width: 1024,
    height: 682,
    objectPosition: "center 40%",
  },
  plantSample: {
    src: "/images/press/plant-sample.jpg",
    alt: "A researcher inspecting a plant growing in a culture cup",
    width: 682,
    height: 1024,
    objectPosition: "center 18%",
  },
} as const satisfies Record<string, StockShot>;
