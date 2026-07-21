import type { InstrumentPage } from "@/types/content";

const author = "Metablify Science Team";
const lastReviewed = "2026-07-18";

/**
 * Instrument pages ship as staged with roadmap language until the client
 * confirms which vendors and file formats are production supported today
 * (Wave 1 open question, Agent 4 blocker). productionSupported stays false and
 * copy avoids implying support that does not exist.
 */
export const instruments: InstrumentPage[] = [
  {
    family: "instrument",
    slug: "thermo-orbitrap",
    status: "staged",
    intent: "commercial",
    vendor: "Thermo Fisher Scientific",
    productionSupported: false,
    title: "Thermo Orbitrap data with Metablify",
    metaTitle: "Thermo Orbitrap LC/MS Data | Metablify",
    metaDescription:
      "How Metablify approaches high resolution Thermo Orbitrap LC/MS data, including file formats, data characteristics, and where feature recovery matters.",
    h1: "Thermo Orbitrap data with Metablify",
    lead: "Orbitrap platforms produce high resolution, high mass accuracy data that is well suited to feature level work. This page describes how Metablify approaches that data and is maintained as a roadmap page pending confirmation of production support.",
    tags: ["instrument", "Thermo", "Orbitrap", "high resolution"],
    fileFormats: [
      { label: "Vendor format", value: "Thermo raw" },
      { label: "Open format", value: "mzML via conversion" },
    ],
    dataCharacteristics:
      "Orbitrap analyzers deliver high resolving power and high mass accuracy, which tightens the m/z coordinate of each feature and constrains elemental composition more strongly than lower resolution platforms. Acquisition often mixes full scan survey with data dependent fragmentation, so feature detection works on rich profile data while fragment spectra support later annotation. The precision of the mass axis is an advantage for feature detection, because narrow, accurate windows reduce the chance of merging distinct ions or splitting one.",
    recoveryNotes:
      "Even on high accuracy data, recovery near the baseline still depends on how detection separates weak real signal from noise, and alignment across a long acquisition campaign still faces retention drift. Coeluting compounds and complex matrices produce mixed spectra that benefit from deconvolution. High resolution improves the mass dimension, but the cohort scale problems of low abundance recovery and cross batch alignment remain, which is where Metablify concentrates.",
    ingestion:
      "Metablify is designed to work from open high resolution formats such as mzML produced by standard conversion of vendor files, so no change to acquisition is needed. Production support for specific Orbitrap models and acquisition modes is confirmed on a per project basis.",
    uniqueValueBlocks: [
      {
        heading: "High accuracy helps the mass axis",
        body: "Orbitrap resolving power tightens the m/z of each feature and constrains elemental composition, which reduces the chance of merging distinct ions or splitting one.",
      },
      {
        heading: "Scale problems remain",
        body: "High resolution does not fix retention drift across a long campaign or the loss of low abundance features to a fixed threshold, which is where Metablify concentrates.",
      },
      {
        heading: "Works from open formats",
        body: "Metablify reads mzML produced by standard conversion, so no change to your Orbitrap acquisition method is required to run an assessment.",
      },
    ],
    faqs: [
      {
        question: "Do I need to change my Orbitrap method?",
        answer:
          "No. Metablify is intended to work on the high resolution data you already acquire, using open formats produced by standard conversion. The goal is recovery and alignment on existing files, not a new acquisition method.",
      },
      {
        question: "Is my specific Orbitrap model supported today?",
        answer:
          "This page is maintained as roadmap information. Confirm current production support for your exact model and acquisition mode with the Metablify team before planning a project, since supported formats are validated per project.",
      },
    ],
    primaryCta: {
      tier: "assessment",
      proof: "Confirm support for your Orbitrap data and run a limited assessment.",
    },
    sources: [
      {
        label: "Makarov, Orbitrap mass analyzer, Analytical Chemistry (2000)",
        href: "https://pubs.acs.org/doi/10.1021/ac991131p",
      },
      {
        label: "Martens et al., mzML format, Molecular and Cellular Proteomics (2011)",
        href: "https://www.mcponline.org/article/S1535-9476(20)30146-9/fulltext",
      },
    ],
    relatedSlugs: ["sciex-qtof", "feature-detection", "large-cohort-processing"],
    author,
    lastReviewed,
  },
  {
    family: "instrument",
    slug: "sciex-qtof",
    status: "staged",
    intent: "commercial",
    vendor: "SCIEX",
    productionSupported: false,
    title: "SCIEX QTOF data with Metablify",
    metaTitle: "SCIEX QTOF LC/MS Data | Metablify",
    metaDescription:
      "How Metablify approaches SCIEX QTOF LC/MS data, including file formats, data characteristics, and where feature recovery and alignment matter at scale.",
    h1: "SCIEX QTOF data with Metablify",
    lead: "QTOF platforms provide fast, high resolution acquisition well suited to untargeted work. This page describes how Metablify approaches SCIEX QTOF data and is maintained as a roadmap page pending confirmation of production support.",
    tags: ["instrument", "SCIEX", "QTOF", "high resolution"],
    fileFormats: [
      { label: "Vendor format", value: "SCIEX wiff and wiff2" },
      { label: "Open format", value: "mzML via conversion" },
    ],
    dataCharacteristics:
      "Time of flight analyzers offer high acquisition speed with good resolving power, which suits fast chromatography and data independent acquisition schemes that record broad fragment coverage. The data is rich in features across a wide mass range, and the speed supports large cohorts, but it also means large files and dense maps where coelution and isomeric crowding are common. The combination of scale and density makes recovery and alignment at the feature layer especially relevant on this platform.",
    recoveryNotes:
      "QTOF data benefits from strong deconvolution because data independent acquisition mixes fragments from coeluting precursors, and from cohort alignment because fast, high throughput campaigns accumulate drift across many injections. Low abundance recovery again depends on separating reproducible signal from noise rather than on resolving power alone. These are the areas Metablify targets, independent of the instrument speed advantage.",
    ingestion:
      "Metablify is designed to work from open formats such as mzML produced by standard conversion of SCIEX files, so acquisition does not change. Production support for specific QTOF models and acquisition modes is confirmed on a per project basis.",
    uniqueValueBlocks: [
      {
        heading: "Speed suits large cohorts",
        body: "Fast time of flight acquisition supports high throughput campaigns, which is exactly the scale where recovery and cross cohort alignment matter most.",
      },
      {
        heading: "Deconvolution matters more",
        body: "Data independent acquisition mixes fragments from coeluting precursors, so feature grouping and deconvolution carry more weight on this platform.",
      },
      {
        heading: "Large files are the norm",
        body: "Dense maps and large files are expected. Metablify uses the cohort as evidence, so scale strengthens the analysis rather than obstructing it.",
      },
    ],
    faqs: [
      {
        question: "Does Metablify support data independent acquisition?",
        answer:
          "Data independent acquisition records fragments from multiple coeluting precursors, which raises the importance of deconvolution and feature grouping. Confirm current support for your specific acquisition scheme with the Metablify team, as this page is roadmap information.",
      },
      {
        question: "Will large QTOF files be a problem?",
        answer:
          "High throughput QTOF campaigns produce large files and large cohorts, which is exactly the scale Metablify is built for. Recovery and alignment use the cohort as evidence, so scale strengthens the analysis rather than obstructing it.",
      },
    ],
    primaryCta: {
      tier: "assessment",
      proof: "Confirm support for your QTOF data and run a limited assessment.",
    },
    sources: [
      {
        label: "Gillet et al., data independent acquisition (SWATH), Molecular and Cellular Proteomics (2012)",
        href: "https://www.mcponline.org/article/S1535-9476(20)32750-2/fulltext",
      },
      {
        label: "Martens et al., mzML format, Molecular and Cellular Proteomics (2011)",
        href: "https://www.mcponline.org/article/S1535-9476(20)30146-9/fulltext",
      },
    ],
    relatedSlugs: ["thermo-orbitrap", "deconvolution", "large-cohort-processing"],
    author,
    lastReviewed,
  },
];
