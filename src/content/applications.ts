import type { ApplicationPage } from "@/types/content";

const author = "Metablify Science Team";
const lastReviewed = "2026-07-18";

export const applicationPages: ApplicationPage[] = [
  {
    family: "application",
    slug: "pfas-environmental",
    status: "staged",
    intent: "commercial",
    field: "PFAS and environmental unknowns",
    title: "PFAS and environmental unknowns",
    metaTitle: "PFAS and Environmental Unknowns | Metablify",
    metaDescription:
      "Targeted methods quantify a few dozen PFAS while thousands exist without standards. Metablify supports discovery and characterization of unknown features.",
    h1: "PFAS and environmental unknowns",
    lead: "Regulatory PFAS methods quantify a few dozen compounds. Thousands of structures are known and most have no commercial standard. The gap between what is measured and what is present is exactly where feature level recovery helps.",
    tags: ["PFAS", "environmental", "unknowns", "discovery"],
    problem:
      "Targeted PFAS methods are built around authentic standards, so they quantify a small, fixed panel accurately and ignore everything outside it. The known PFAS universe is far larger than any standard list, and many environmentally relevant structures are transformation products or novel compounds with no reference material. A lab that needs to characterize what is actually in a water, soil, or serum sample cannot do it by extending a targeted panel, because the compounds of interest are unknown features by definition.",
    approach:
      "Metablify operates at the feature layer on the data you already acquired, recovering reproducible mass features and aligning them across a cohort so that unknown, standard free signals become tractable objects for characterization. Diagnostic behaviors that suggest fluorinated compounds, such as mass defect patterns, can then be examined on a cleaner, more complete feature table. This is positioned strictly as discovery and characterization, not as regulatory compliance measurement, which requires validated methods and authentic standards.",
    audience:
      "Environmental testing labs, consultancies, water utilities, and litigation support teams that need to characterize unknown fluorinated features beyond a regulated panel, and that have budget and urgency to understand exposure and contamination.",
    uniqueValueBlocks: [
      {
        heading: "The panel is smaller than the problem",
        body: "Targeted methods quantify a few dozen PFAS accurately, but the known universe is far larger and full of transformation products with no standard. The compounds of interest are unknown features by definition.",
      },
      {
        heading: "Discovery, not compliance",
        body: "Metablify characterizes unknown features on data you already acquired. It is a discovery layer, not a validated regulatory method, and it does not replace accredited targeted testing.",
      },
      {
        heading: "No change to acquisition",
        body: "Diagnostic behaviors such as mass defect patterns can be examined on a cleaner, more complete feature table without reacquiring samples or changing the instrument method.",
      },
    ],
    faqs: [
      {
        question: "Can Metablify report regulatory PFAS results?",
        answer:
          "No. Regulatory PFAS quantification requires validated methods and certified reference standards. Metablify is a discovery and characterization layer that helps you find and align unknown features. It does not replace an accredited targeted method for compliance reporting.",
      },
      {
        question: "Do I need to change how I acquire data?",
        answer:
          "No. Metablify works on your existing high resolution LC/MS files. You do not need to reacquire samples or change your instrument method to explore what a targeted panel leaves out.",
      },
    ],
    primaryCta: {
      tier: "discuss",
      proof:
        "Discuss a characterization project for unknown environmental features.",
    },
    sources: [
      {
        label: "US EPA, PFAS analytical methods overview",
        href: "https://www.epa.gov/water-research/pfas-analytical-methods-development-and-sampling-research",
      },
      {
        label: "OECD, comprehensive list of PFAS (2018)",
        href: "https://www.oecd.org/chemicalsafety/portal-perfluorinated-chemicals/",
      },
    ],
    relatedSlugs: [
      "low-abundance-recovery",
      "large-cohort-processing",
      "feature-detection",
    ],
    author,
    lastReviewed,
  },
  {
    family: "application",
    slug: "lipidomics",
    status: "staged",
    intent: "commercial",
    field: "Lipidomics",
    title: "Lipidomics at cohort scale",
    metaTitle: "Lipidomics at Cohort Scale | Metablify",
    metaDescription:
      "Lipidomics carries large feature counts and heavy isomer and alignment burden. See how Metablify supports recovery and alignment across large lipid cohorts.",
    h1: "Lipidomics at cohort scale",
    lead: "Lipidomics produces large feature counts with a heavy isomer and alignment burden. As cohorts grow, keeping lipid features matched and complete across samples becomes the limiting step long before annotation does.",
    tags: ["lipidomics", "isomers", "alignment", "cohort"],
    problem:
      "Lipids are numerous, structurally similar, and prone to coelution, so a lipidomics run generates many features that must be kept distinct and correctly matched across samples. Isomeric and isobaric species crowd narrow regions of the map, retention shifts move them relative to each other, and low abundance species sit near the noise. Across a large cohort these pressures combine, and the feature table fills with splits, misalignments, and missing values that obscure the biology the study was meant to reveal.",
    approach:
      "Metablify recovers reproducible lipid features and aligns them across the full cohort using agreement between injections, which stabilizes matching for crowded isomeric regions and recovers low abundance species that a fixed threshold would drop. The output is a cleaner, more complete lipid feature table that flows into the annotation tools with strong lipid libraries, so recovery and annotation each play to their strengths rather than competing.",
    audience:
      "Research groups and core facilities running lipidomics at scale in areas such as metabolic disease, nutrition, and translational studies, where large cohorts and isomer complexity make alignment the bottleneck.",
    uniqueValueBlocks: [
      {
        heading: "Crowded maps, many isomers",
        body: "Isomeric and isobaric lipids crowd narrow regions of the map, and retention shifts move them relative to each other, so keeping features distinct and matched is the hard part.",
      },
      {
        heading: "Alignment before annotation",
        body: "As cohorts grow, matching lipid features across samples limits results long before annotation does. Metablify stabilizes that layer, then hands features to your lipid libraries.",
      },
      {
        heading: "Low abundance species recovered",
        body: "Reproducibility across the cohort recovers low abundance lipids that a fixed threshold would drop, without inflating the table with noise.",
      },
    ],
    faqs: [
      {
        question: "Does Metablify annotate lipids?",
        answer:
          "Metablify focuses on recovery, alignment, and quantification at the feature layer. Its output is designed to feed annotation tools with strong lipid libraries, so you keep the annotation you trust while improving the features that reach it.",
      },
      {
        question: "How does it handle isomers?",
        answer:
          "Metablify aligns and recovers features that were measured. Isomers separated by your method are kept distinct and matched across samples. Isomers that fully coeluted at the instrument still require an orthogonal separation, which processing cannot add after the fact.",
      },
    ],
    primaryCta: {
      tier: "discuss",
      proof: "Discuss a lipidomics cohort where alignment is the bottleneck.",
    },
    sources: [
      {
        label: "Tsugawa et al., MS-DIAL lipidomics, Nature Biotechnology (2020)",
        href: "https://www.nature.com/articles/s41587-020-0531-2",
      },
      {
        label: "Liebisch et al., lipid nomenclature, Journal of Lipid Research (2020)",
        href: "https://www.jlr.org/article/S0022-2275(20)60017-7/fulltext",
      },
    ],
    relatedSlugs: ["ms-dial", "deconvolution", "large-cohort-processing"],
    author,
    lastReviewed,
  },
  {
    family: "application",
    slug: "plant-agricultural-science",
    status: "staged",
    intent: "commercial",
    field: "Plant and agricultural science",
    title: "Plant and agricultural science",
    metaTitle: "Plant and Agricultural Metabolomics | Metablify",
    metaDescription:
      "Breeding panels and diversity populations push LC/MS to cohort scale. Metablify was developed at the Danforth Center to recover and align features at that scale.",
    h1: "Plant and agricultural science",
    lead: "Breeding panels and diversity populations are large by design. Metablify was developed at the Donald Danforth Plant Science Center precisely to make LC/MS analysis of cohorts at that scale tractable, which makes plant science its home turf.",
    tags: ["plant science", "agriculture", "breeding", "cohort"],
    problem:
      "Plant metabolomics often means hundreds or thousands of genotypes, replicates, and conditions, because the questions are about diversity and inheritance. That scale produces exactly the failures large cohorts are prone to, drift across long acquisition campaigns, batch structure by planting or harvest, and low abundance specialized metabolites that vary across a population. When features are not recovered and aligned across the whole panel, association between metabolite and genotype is weakened by processing artifacts rather than biology.",
    approach:
      "Metablify treats the panel as one body of evidence, recovering reproducible features and aligning them across the entire population so that a metabolite measured in one genotype is matched correctly in all of them. Because the approach uses the cohort as its own reference, larger panels strengthen the analysis rather than fragmenting it, which suits diversity populations and breeding trials where scale is the point.",
    audience:
      "Plant science researchers, breeding programs, seed and agriculture companies, and core facilities analyzing diversity panels and populations where cohort scale and specialized metabolites make recovery and alignment critical.",
    uniqueValueBlocks: [
      {
        heading: "Diversity means scale",
        body: "Questions about inheritance and diversity require hundreds or thousands of genotypes and replicates, which produces exactly the drift and batch structure large cohorts are prone to.",
      },
      {
        heading: "Association needs clean features",
        body: "When features are not recovered and aligned across the whole panel, links between metabolite and genotype weaken from processing artifacts rather than biology.",
      },
      {
        heading: "Built for this",
        body: "Metablify was developed at the Donald Danforth Plant Science Center, so the platform was shaped by the demands of plant diversity panels and breeding trials from the start.",
      },
    ],
    faqs: [
      {
        question: "Why is plant science a particular fit?",
        answer:
          "Metablify was developed at the Donald Danforth Plant Science Center to solve large scale LC/MS challenges, so the platform was shaped by the demands of plant diversity panels and breeding populations from the start.",
      },
      {
        question: "Can it handle specialized metabolites?",
        answer:
          "Specialized metabolites are often low in abundance and variable across a population. Metablify recovers reproducible features across the cohort, which helps surface these compounds where a per sample threshold would lose them.",
      },
    ],
    primaryCta: {
      tier: "discuss",
      proof:
        "Metablify was developed at the Donald Danforth Plant Science Center for cohort scale plant metabolomics.",
    },
    sources: [
      {
        label: "Fernie and Tohge, plant metabolomics review, Annual Review of Plant Biology (2017)",
        href: "https://www.annualreviews.org/doi/10.1146/annurev-arplant-042916-040854",
      },
      {
        label: "Alseekh et al., metabolomics for crop improvement, The Plant Cell (2021)",
        href: "https://academic.oup.com/plcell/article/33/1/16/6041657",
      },
    ],
    relatedSlugs: [
      "large-cohort-processing",
      "batch-effect-alignment",
      "mass-feature",
    ],
    author,
    lastReviewed,
  },
];
