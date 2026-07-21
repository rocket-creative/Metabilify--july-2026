import type { GlossaryTerm } from "@/types/content";

const author = "Metablify Science Team";
const lastReviewed = "2026-07-18";

function benchmarkCta() {
  return {
    tier: "benchmark" as const,
    proof: "Grounded in the same first principles that Metablify is built on.",
  };
}

export const glossary: GlossaryTerm[] = [
  {
    family: "glossary",
    slug: "mass-feature",
    status: "staged",
    intent: "informational",
    term: "Mass feature",
    title: "Mass feature",
    metaTitle: "Mass Feature | LC/MS Glossary",
    metaDescription:
      "A mass feature is a detected signal defined by mass to charge ratio and retention time. Learn what it represents and why it is the unit of untargeted LC/MS.",
    h1: "Mass feature",
    lead: "The mass feature is the working unit of untargeted LC/MS. Before a compound has a name, it exists in your data as a feature, and the quality of every result depends on how well those features are detected and aligned.",
    tags: ["feature", "fundamentals", "detection"],
    definition:
      "A mass feature is a signal in LC/MS data localized by two coordinates, a mass to charge ratio and a retention time, with an associated intensity. It represents an ion observed at a particular mass eluting at a particular time. A single compound can give rise to several features, because it may form multiple adducts, carry isotopes, and appear in more than one charge state. Untargeted analysis works at the feature layer because most detected ions are not yet identified, so the feature, not the named compound, is what gets detected, aligned, and quantified across a study.",
    example:
      "A metabolite eluting at ninety seconds might appear as a protonated feature and a sodium adduct feature, each with its own isotope pattern, so one compound contributes several rows to a feature table before any annotation is attempted.",
    uniqueValueBlocks: [
      {
        heading: "Why the feature is the unit",
        body: "In untargeted work most ions are unidentified, so the analysis has to operate on detected signals rather than named compounds. The feature is the object that can be measured consistently before identity is known.",
      },
      {
        heading: "One compound, several features",
        body: "Adducts, isotopes, and charge states mean a single molecule can generate multiple features. Grouping them correctly is part of turning a feature table into a compound level result.",
      },
      {
        heading: "Where quality is won or lost",
        body: "Detection and alignment at the feature layer set the ceiling for everything downstream. Errors here propagate into every statistic, so this is where Metablify concentrates.",
      },
    ],
    primaryCta: benchmarkCta(),
    sources: [
      {
        label: "Smith et al., XCMS, Analytical Chemistry (2006)",
        href: "https://pubs.acs.org/doi/10.1021/ac051437y",
      },
      {
        label: "Mahieu and Patti, feature reliability, Analytical Chemistry (2017)",
        href: "https://pubs.acs.org/doi/10.1021/acs.analchem.7b01069",
      },
    ],
    relatedSlugs: ["feature-detection", "mz", "retention-time-alignment"],
    author,
    lastReviewed,
  },
  {
    family: "glossary",
    slug: "mz",
    status: "staged",
    intent: "informational",
    term: "Mass to charge ratio (m/z)",
    title: "Mass to charge ratio (m/z)",
    metaTitle: "Mass to Charge Ratio (m/z) | LC/MS Glossary",
    metaDescription:
      "The m/z value is the mass of an ion divided by its charge. Learn why it anchors LC/MS feature detection and how charge state changes what you measure.",
    h1: "Mass to charge ratio (m/z)",
    lead: "Every feature in mass spectrometry is anchored by an m/z value. Understanding what it is, and why charge state matters, is the difference between reading a spectrum and misreading it.",
    tags: ["fundamentals", "mass spectrometry"],
    definition:
      "The mass to charge ratio, written m/z, is the mass of an ion divided by the number of charges it carries. A mass spectrometer separates ions by this ratio rather than by mass alone, so a doubly charged ion appears at roughly half the m/z of the singly charged form of the same molecule. Because the measured coordinate is a ratio, interpreting a spectrum requires knowing or inferring the charge state. High resolution instruments measure m/z precisely enough to constrain elemental composition, which is why mass accuracy is central to confident feature work.",
    example:
      "A peptide carrying two protons appears near half the m/z of its singly charged form, so mistaking the charge state would place its mass off by a factor of two and derail any formula assignment.",
    uniqueValueBlocks: [
      {
        heading: "A ratio, not a mass",
        body: "The instrument reports mass divided by charge, so the same molecule appears at different m/z depending on how many charges it carries. Charge state has to be resolved to recover the true mass.",
      },
      {
        heading: "Why mass accuracy matters",
        body: "Precise m/z narrows the set of possible elemental formulas for a feature, which is the first constraint on annotation. Poor accuracy widens the candidate list and weakens every downstream identity claim.",
      },
      {
        heading: "Its role in detection",
        body: "Feature detection extracts ion signals within a tolerance around an m/z. Set the window wrong and you split real features or merge distinct ones, which is why tolerance and calibration are practical concerns, not details.",
      },
    ],
    primaryCta: benchmarkCta(),
    sources: [
      {
        label: "IUPAC recommendations for mass spectrometry terms",
        href: "https://iupac.org/",
      },
      {
        label: "Murray et al., mass spectrometry terminology, Pure and Applied Chemistry (2013)",
        href: "https://www.degruyter.com/document/doi/10.1351/PAC-REC-06-04-06/html",
      },
    ],
    relatedSlugs: ["mass-feature", "feature-detection", "deconvolution"],
    author,
    lastReviewed,
  },
  {
    family: "glossary",
    slug: "feature-detection",
    status: "staged",
    intent: "informational",
    term: "Feature detection",
    title: "Feature detection",
    metaTitle: "Feature Detection | LC/MS Glossary",
    metaDescription:
      "Feature detection finds real ion signals in LC/MS data and separates them from noise. Learn how it works and where it commonly fails.",
    h1: "Feature detection",
    lead: "Feature detection is the step that decides what counts as signal. Every later result is built on its output, so its false positives and false negatives set the boundaries of what a study can find.",
    tags: ["detection", "peak picking", "fundamentals"],
    definition:
      "Feature detection is the process of finding real ion signals in raw LC/MS data and distinguishing them from background noise. It typically extracts ion chromatograms within a mass tolerance, locates chromatographic peaks, and records each as a feature with an m/z, a retention time, and an intensity. The step must balance sensitivity against specificity, because a threshold that admits weak real signals also admits noise, and a threshold that excludes noise also discards real low abundance features. The choices made here define both the size and the reliability of the resulting feature table.",
    example:
      "Lowering an intensity threshold to catch a faint metabolite can double the feature count while filling the table with noise, which shows why detection is a balance rather than a single setting.",
    uniqueValueBlocks: [
      {
        heading: "The sensitivity and specificity balance",
        body: "Detection lives on a tradeoff. Admitting weak signal raises recovery and noise together, so the discriminant used to separate them, not the threshold alone, determines quality.",
      },
      {
        heading: "Common failure modes",
        body: "Peak splitting, missed low abundance features, and noise admitted as features are the recurring failures. Each has a different cause and a different fix at the feature layer.",
      },
      {
        heading: "Reproducibility as evidence",
        body: "A feature that recurs across many injections is unlikely to be noise. Using cohort agreement as the discriminant is how Metablify raises recovery without simply lowering a threshold.",
      },
    ],
    primaryCta: benchmarkCta(),
    sources: [
      {
        label: "Smith et al., XCMS, Analytical Chemistry (2006)",
        href: "https://pubs.acs.org/doi/10.1021/ac051437y",
      },
      {
        label: "Myers et al., peak detection evaluation, Analytical Chemistry (2017)",
        href: "https://pubs.acs.org/doi/10.1021/acs.analchem.7b00947",
      },
    ],
    relatedSlugs: ["mass-feature", "signal-to-noise", "peak-splitting"],
    author,
    lastReviewed,
  },
  {
    family: "glossary",
    slug: "retention-time-alignment",
    status: "staged",
    intent: "informational",
    term: "Retention time alignment",
    title: "Retention time alignment",
    metaTitle: "Retention Time Alignment | LC/MS Glossary",
    metaDescription:
      "Retention time alignment matches the same feature across samples despite elution shifts. Learn why it is essential for comparing LC/MS runs.",
    h1: "Retention time alignment",
    lead: "Alignment is what lets many separate injections be compared as one study. Without it, a feature at a given time in one sample is not necessarily the same molecule in the next.",
    tags: ["alignment", "retention time", "cohort"],
    definition:
      "Retention time alignment is the process of correcting for shifts in when a compound elutes so the same feature can be matched across samples. Elution times move between injections because of column aging, temperature, mobile phase, and pressure. Alignment estimates and removes these shifts, either by warping each sample toward a reference or by modeling movement across the whole cohort, so that a feature detected in different runs is recognized as one entity. It is a prerequisite for building a feature table where every column refers to the same analyte in every sample.",
    example:
      "If a compound drifts from ninety to ninety four seconds over a long study, alignment ensures it is treated as one feature rather than two, so its intensities are compared correctly across samples.",
    uniqueValueBlocks: [
      {
        heading: "Why comparison needs it",
        body: "A feature table assumes each column is one analyte across all samples. Elution drift breaks that assumption, so alignment is what makes cross sample comparison valid at all.",
      },
      {
        heading: "Reference warping versus cohort models",
        body: "Warping to a single reference works when drift is small and anchors are abundant. Large heterogeneous cohorts do better with a model that uses all injections as mutual references.",
      },
      {
        heading: "Alignment and missing values",
        body: "Many apparent missing values are alignment failures rather than true absence. Correct alignment recovers them, which changes the shape of the table and the statistics that follow.",
      },
    ],
    primaryCta: benchmarkCta(),
    sources: [
      {
        label: "Tautenhahn et al., retention time correction, BMC Bioinformatics (2008)",
        href: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-9-504",
      },
      {
        label: "Smith et al., XCMS, Analytical Chemistry (2006)",
        href: "https://pubs.acs.org/doi/10.1021/ac051437y",
      },
    ],
    relatedSlugs: ["retention-time-drift", "batch-effect", "mass-feature"],
    author,
    lastReviewed,
  },
  {
    family: "glossary",
    slug: "batch-effect",
    status: "staged",
    intent: "informational",
    term: "Batch effect",
    title: "Batch effect",
    metaTitle: "Batch Effect | LC/MS Glossary",
    metaDescription:
      "A batch effect is systematic variation tied to how and when samples were processed. Learn why it matters in large LC/MS studies and how to limit it.",
    h1: "Batch effect",
    lead: "In a large study, the batch a sample ran in can explain more variance than the biology. Recognizing and limiting batch effects is part of designing a study that can actually be analyzed.",
    tags: ["batch effect", "cohort", "study design"],
    definition:
      "A batch effect is systematic, nonbiological variation associated with how and when samples were prepared and measured. In LC/MS it appears as shifts in retention, response, and detected features grouped by plate, day, operator, or column. Batch effects are a problem because they can dominate the leading components of an unsupervised analysis, so patterns that look biological may reflect the processing schedule instead. They are limited by randomization and quality control during acquisition and by correct feature matching and normalization during analysis, but they cannot be fully removed after the fact if design was poor.",
    example:
      "If cases were run in one week and controls in the next, a difference between groups may reflect the two weeks of instrument state rather than disease, which is why randomization across batches matters.",
    uniqueValueBlocks: [
      {
        heading: "Design first",
        body: "Randomization and quality control injections limit how far batch effects reach. No correction fully substitutes for design, because some batch differences are confounded with the contrast of interest.",
      },
      {
        heading: "Matching before correction",
        body: "Intensity based batch correction assumes features are already matched across batches. If matching is imperfect, correction spreads the error, so feature level alignment should come first.",
      },
      {
        heading: "How to spot it",
        body: "Color an unsupervised plot by batch. If samples cluster by run order rather than biology, batch effects are dominating and need to be addressed before interpretation.",
      },
    ],
    primaryCta: benchmarkCta(),
    sources: [
      {
        label: "Leek et al., batch effects, Nature Reviews Genetics (2010)",
        href: "https://www.nature.com/articles/nrg2825",
      },
      {
        label: "Dunn et al., large scale metabolomics, Nature Protocols (2011)",
        href: "https://www.nature.com/articles/nprot.2011.335",
      },
    ],
    relatedSlugs: [
      "batch-effect-alignment",
      "retention-time-alignment",
      "retention-time-drift",
    ],
    author,
    lastReviewed,
  },
  {
    family: "glossary",
    slug: "signal-to-noise",
    status: "staged",
    intent: "informational",
    term: "Signal to noise ratio",
    title: "Signal to noise ratio",
    metaTitle: "Signal to Noise Ratio | LC/MS Glossary",
    metaDescription:
      "Signal to noise ratio compares a peak against the background around it. Learn how it governs detection limits and low abundance feature recovery.",
    h1: "Signal to noise ratio",
    lead: "Signal to noise sets the floor of what an instrument can see in a single run. How you treat that floor decides whether real low abundance features are recovered or discarded.",
    tags: ["noise", "sensitivity", "detection"],
    definition:
      "The signal to noise ratio compares the intensity of a peak against the magnitude of the background fluctuation around it. It governs whether a feature is judged detectable, because peaks near the level of the noise are hard to distinguish from random variation in a single measurement. Thresholds are often expressed as a signal to noise cutoff, which makes the ratio a practical control over the sensitivity and specificity of detection. Because noise is random and does not reproduce, agreement across replicate injections provides evidence that a low ratio feature is real even when any single run is ambiguous.",
    example:
      "A peak just above the noise in one injection is uncertain, but the same peak appearing at the same m/z and time across ten injections is very unlikely to be random, which raises confidence without changing the instrument.",
    uniqueValueBlocks: [
      {
        heading: "A single run limit",
        body: "In one measurement, low ratio features are genuinely ambiguous. That is why a per sample threshold is conservative by default and why it discards the weakest real signal.",
      },
      {
        heading: "Reproducibility beats thresholds",
        body: "Noise does not repeat. Consistency across injections is stronger evidence than raw intensity, so cohort agreement recovers weak features a fixed cutoff would reject.",
      },
      {
        heading: "Relation to detection limits",
        body: "Signal to noise underlies common definitions of the limit of detection, so how it is handled directly shapes what a study can and cannot find near the baseline.",
      },
    ],
    primaryCta: benchmarkCta(),
    sources: [
      {
        label: "IUPAC recommendations on detection limits",
        href: "https://iupac.org/",
      },
      {
        label: "Mahieu and Patti, feature reliability, Analytical Chemistry (2017)",
        href: "https://pubs.acs.org/doi/10.1021/acs.analchem.7b01069",
      },
    ],
    relatedSlugs: [
      "limit-of-detection",
      "low-abundance-recovery",
      "feature-detection",
    ],
    author,
    lastReviewed,
  },
  {
    family: "glossary",
    slug: "limit-of-detection",
    status: "staged",
    intent: "informational",
    term: "Limit of detection",
    title: "Limit of detection",
    metaTitle: "Limit of Detection | LC/MS Glossary",
    metaDescription:
      "The limit of detection is the smallest amount that can be reliably distinguished from background. Learn how it constrains untargeted LC/MS discovery.",
    h1: "Limit of detection",
    lead: "The limit of detection defines the smallest amount that can be reliably told apart from nothing. It is a hard boundary of the measurement, and it is often confused with what a processing choice can and cannot recover.",
    tags: ["detection", "sensitivity", "fundamentals"],
    definition:
      "The limit of detection is the lowest quantity of an analyte that can be reliably distinguished from the background at a stated confidence. It is commonly defined in terms of a signal to noise ratio or the standard deviation of blank measurements. In untargeted LC/MS the concept is practical rather than certified, because most features are unidentified and no calibration standard is available, but the idea still bounds discovery, since a compound present below the detection limit in every injection leaves no reproducible signal to recover. Distinguishing this hard instrument boundary from processing induced loss is important, because they have different remedies.",
    example:
      "A compound never sampled above the noise in any run cannot be recovered by processing, whereas a compound present above noise but discarded by a conservative threshold can be, which is a processing problem, not a detection limit.",
    uniqueValueBlocks: [
      {
        heading: "A boundary of the measurement",
        body: "The detection limit is set by the instrument and method. No processing step lowers it, so it defines the outer edge of what any analysis can find.",
      },
      {
        heading: "Detection limit versus processing loss",
        body: "Many lost features are above the detection limit but discarded by thresholds. That loss is recoverable at the feature layer, unlike a compound that was never measurable.",
      },
      {
        heading: "Why standards complicate it",
        body: "Formal detection limits assume a calibrated analyte. In untargeted work most features are unknown, so the term is used as a practical bound rather than a certified value.",
      },
    ],
    primaryCta: benchmarkCta(),
    sources: [
      {
        label: "IUPAC recommendations on detection limits",
        href: "https://iupac.org/",
      },
      {
        label: "Armbruster and Pry, limit of detection, Clinical Biochemist Reviews (2008)",
        href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2556583/",
      },
    ],
    relatedSlugs: [
      "signal-to-noise",
      "low-abundance-recovery",
      "feature-detection",
    ],
    author,
    lastReviewed,
  },
  {
    family: "glossary",
    slug: "deconvolution",
    status: "staged",
    intent: "informational",
    term: "Spectral deconvolution",
    title: "Spectral deconvolution",
    metaTitle: "Spectral Deconvolution | LC/MS Glossary",
    metaDescription:
      "Deconvolution separates overlapping signals so each belongs to the right compound. Learn why coelution makes it essential in complex LC/MS data.",
    h1: "Spectral deconvolution",
    lead: "Real samples are crowded. When compounds elute together, their signals overlap, and deconvolution is what assigns each fragment and ion to the compound it actually came from.",
    tags: ["deconvolution", "coelution", "spectra"],
    definition:
      "Deconvolution is the process of separating overlapping signals in LC/MS data so that each is attributed to the correct compound. When two or more analytes elute at nearly the same time, their ions and fragments mix in the recorded spectra, and grouping them by shared elution profile is what reconstructs a clean spectrum for each compound. Deconvolution is closely tied to feature grouping, because a real compound produces a set of correlated ions, isotopes, and adducts that rise and fall together. Getting it right reduces false features and improves the quality of any annotation attempted afterward.",
    example:
      "Two coeluting metabolites can produce a mixed spectrum, and deconvolution uses the shared rise and fall of each compound's ions over time to split that spectrum into two interpretable ones.",
    uniqueValueBlocks: [
      {
        heading: "Coelution is the norm",
        body: "Complex matrices rarely resolve every compound chromatographically, so overlapping signals are expected. Deconvolution is how mixed spectra become compound level information.",
      },
      {
        heading: "Grouping correlated ions",
        body: "A compound produces isotopes, adducts, and fragments that share an elution profile. Grouping by that shared profile reduces the feature count to something closer to real compounds.",
      },
      {
        heading: "Effect on annotation",
        body: "Clean, deconvolved spectra give annotation tools a better target than a mixed spectrum, so deconvolution quality propagates into identification confidence.",
      },
    ],
    primaryCta: benchmarkCta(),
    sources: [
      {
        label: "Tsugawa et al., MS-DIAL, Nature Methods (2015)",
        href: "https://www.nature.com/articles/nmeth.3393",
      },
      {
        label: "Domingo-Almenara et al., deconvolution review, Analytical Chemistry (2018)",
        href: "https://pubs.acs.org/doi/10.1021/acs.analchem.7b04184",
      },
    ],
    relatedSlugs: ["feature-detection", "mass-feature", "ms-dial"],
    author,
    lastReviewed,
  },
];
