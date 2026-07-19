import type { SolutionPage } from "@/types/content";

const author = "Metablify Science Team";
const lastReviewed = "2026-07-18";

export const solutions: SolutionPage[] = [
  {
    family: "solution",
    slug: "peak-splitting",
    status: "staged",
    intent: "informational",
    title: "Peak splitting in LC/MS feature detection",
    metaTitle: "Peak Splitting in LC/MS | Causes and Recovery",
    metaDescription:
      "Why LC/MS feature detection splits one compound into several peaks, what it costs your feature table, and how Metablify recovers the true feature.",
    h1: "Peak splitting in LC/MS feature detection",
    lead: "When a single compound is reported as two or more features, downstream statistics inherit the error. Peak splitting is one of the most common and most fixable sources of noise in a feature table.",
    tags: ["peak detection", "feature table", "chromatography", "alignment"],
    problem:
      "Peak splitting happens when the detection algorithm reports one analyte as several separate features. A compound that elutes as one chromatographic band gets carved into two or three narrow peaks, each with its own row in the feature table. The intensity of the real compound is divided across those rows, so every split feature looks weaker than the analyte actually is, and the same compound competes with itself in every statistical test that follows.",
    cause:
      "Conventional peak pickers fit an expected peak shape to the extracted ion chromatogram and cut on local minima. Real chromatography rarely gives a textbook shape. Fronting, tailing, saturation, and small dips at the apex all create false minima. When a run drifts or the mass tolerance is set tight, a single ion trace can break into fragments that the picker treats as independent. Aggressive smoothing hides the problem in one sample and exposes it in the next, so the split is inconsistent across a cohort, which is the worst case for alignment.",
    mechanism:
      "Metablify treats the cohort as evidence rather than scoring each sample in isolation. A feature that is real appears with consistent mass and retention behavior across many injections, so the platform amplifies that agreement and resolves fragments that belong to the same analyte back into one feature. Splits that are artifacts of one picker on one trace do not reproduce across the cohort and are suppressed. Because the decision is grounded in reproducibility, the merge is defensible rather than a cosmetic reshaping of peaks.",
    outcome:
      "The feature table carries one row per compound instead of several, intensities are whole rather than divided, and the same analyte stops appearing as multiple weakly correlated variables. Fold changes and multivariate models become easier to interpret because the variance that came from splitting is gone.",
    limits:
      "Metablify works on the data you already acquired, so it cannot recover a compound that coeluted completely and was never resolved at the instrument. Two isomers that share mass and retention will still require a chromatographic or ion mobility change to separate. The platform reduces detection artifacts; it does not add separation that the method did not provide.",
    uniqueValueBlocks: [
      {
        heading: "Split features divide real signal",
        body: "When one compound becomes several rows, its intensity is spread across them, so every split feature understates the analyte and competes with itself in downstream statistics.",
      },
      {
        heading: "Cohort agreement resolves the merge",
        body: "A real feature reproduces across injections. Metablify uses that agreement to merge fragments that belong together, so the correction is evidence based rather than a cosmetic reshaping of peaks.",
      },
      {
        heading: "Cleaner variance downstream",
        body: "Removing splits reduces artificial variables and correlated noise, which makes fold changes and multivariate models easier to read and easier to trust.",
      },
    ],
    faqs: [
      {
        question: "Is peak splitting the same as an isotope or adduct group?",
        answer:
          "No. Isotopes and adducts are real ions of the same compound at predictable mass offsets. Peak splitting is one ion trace broken into several features by the detection step. Both inflate a feature table, and both are handled at the feature layer, but the causes are different.",
      },
      {
        question: "Can I fix splitting by smoothing more aggressively?",
        answer:
          "Heavier smoothing can merge a split in one sample while distorting the apex or hiding a low abundance neighbor in another. Because the effect varies across a cohort, tuning smoothing per sample trades one inconsistency for another. Resolving splits from cohort agreement is more stable.",
      },
    ],
    primaryCta: {
      tier: "assessment",
      proof:
        "Send a subset of your existing data and see how many split features collapse back to single compounds.",
    },
    sources: [
      {
        label: "Smith et al., XCMS, Analytical Chemistry (2006)",
        href: "https://pubs.acs.org/doi/10.1021/ac051437y",
        note: "Foundational peak detection method and its shape assumptions.",
      },
      {
        label: "Myers et al., peak detection evaluation, Analytical Chemistry (2017)",
        href: "https://pubs.acs.org/doi/10.1021/acs.analchem.7b00947",
        note: "Comparison of peak detection behavior across tools.",
      },
    ],
    relatedSlugs: ["feature-detection", "retention-time-drift", "mzmine"],
    author,
    lastReviewed,
  },
  {
    family: "solution",
    slug: "retention-time-drift",
    status: "staged",
    intent: "informational",
    title: "Retention time drift across batches",
    metaTitle: "Retention Time Drift Across Batches | LC/MS",
    metaDescription:
      "Retention time drift breaks feature matching across large LC/MS cohorts. Learn the causes and how Metablify aligns features at cohort scale.",
    h1: "Retention time drift across batches",
    lead: "The same compound elutes at slightly different times from run to run. Over a large study, that drift breaks the assumption that a feature at a given time is the same molecule everywhere, and alignment quietly fails.",
    tags: ["alignment", "retention time", "batch effect", "cohort"],
    problem:
      "Retention time drift is the gradual shift in when a compound elutes across injections. Column aging, mobile phase preparation, temperature, and pressure all move peaks by seconds. Within a single plate the shift is small. Across hundreds of samples run over weeks it accumulates, so a feature that eluted at one time early in the study elutes noticeably later by the end. Any step that matches features by a fixed time window will then match the wrong things or fail to match at all.",
    cause:
      "Most alignment methods pick anchor peaks and warp each sample toward a reference. That works when drift is modest and anchors are abundant and unambiguous. In large cohorts the anchors themselves drift, low abundance features have no stable reference, and injecting in batches introduces steps rather than a smooth trend. Warping to a single reference sample also bakes that sample's idiosyncrasies into the whole study, and it degrades when the cohort is heterogeneous.",
    mechanism:
      "Metablify aligns by building a cohort wide model of how each feature moves, using the many injections as mutual references rather than trusting one reference sample. Consistent mass and elution behavior across the cohort identify which peaks are the same analyte even when absolute time has shifted. Because the model spans the whole study, batch steps and slow trends are handled together, and low abundance features borrow stability from the cohort instead of needing their own anchor.",
    outcome:
      "Features match correctly from the first plate to the last, missing values that were really alignment failures reappear, and batch structure stops dominating the first components of a multivariate model. The study reads as one experiment rather than a set of loosely joined batches.",
    limits:
      "Alignment cannot rescue a run where the gradient failed or where a compound moved outside the acquired window. If two compounds swap elution order under drift and share mass, separating them requires an orthogonal dimension. Metablify aligns what was measured; it does not reconstruct chromatography that was lost.",
    uniqueValueBlocks: [
      {
        heading: "Drift accumulates across a study",
        body: "Shifts that are trivial within a plate add up across weeks of acquisition, so a fixed time window that worked early in the study quietly matches the wrong features later.",
      },
      {
        heading: "The cohort as its own reference",
        body: "Rather than warping every sample toward one reference run, Metablify models movement across all injections, so low abundance features borrow stability from the whole cohort.",
      },
      {
        heading: "Missing values reappear",
        body: "Many apparent missing values are alignment failures, not true absence. Correct alignment recovers them and changes the statistics that follow.",
      },
    ],
    faqs: [
      {
        question: "How is this different from normalization?",
        answer:
          "Normalization adjusts intensities to make samples comparable. Alignment decides which peaks across samples are the same feature. Drift is an alignment problem. Normalizing intensities does nothing to fix features that were matched to the wrong molecule.",
      },
      {
        question: "Do I need QC injections for this to work?",
        answer:
          "Quality control injections help characterize drift and are good practice, but the cohort itself provides most of the evidence. Metablify uses agreement across all injections rather than depending on a small set of reference runs.",
      },
    ],
    primaryCta: {
      tier: "assessment",
      proof:
        "Send a multi batch dataset and see how many features align across the full study rather than within single batches.",
    },
    sources: [
      {
        label: "Tautenhahn et al., retention time correction, BMC Bioinformatics (2008)",
        href: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-9-504",
        note: "Nonlinear retention time alignment approach.",
      },
      {
        label: "Dunn et al., large scale metabolomics practice, Nature Protocols (2011)",
        href: "https://www.nature.com/articles/nprot.2011.335",
        note: "Batch structure and drift in large studies.",
      },
    ],
    relatedSlugs: [
      "retention-time-alignment",
      "batch-effect-alignment",
      "large-cohort-processing",
    ],
    author,
    lastReviewed,
  },
  {
    family: "solution",
    slug: "batch-effect-alignment",
    status: "staged",
    intent: "informational",
    title: "Batch effects and alignment in large cohorts",
    metaTitle: "Batch Effects and Alignment | Large LC/MS Cohorts",
    metaDescription:
      "Batch effects can dominate a large LC/MS study before biology is visible. See how feature level alignment reduces batch structure at cohort scale.",
    h1: "Batch effects and alignment in large cohorts",
    lead: "In a study large enough to answer a real question, the day a sample ran can explain more variance than the biology. Batch effects are not a nuisance to correct at the end. They are a feature matching problem to solve at the start.",
    tags: ["batch effect", "alignment", "cohort", "normalization"],
    problem:
      "A batch effect is systematic variation tied to how and when samples were processed rather than to the biology. In LC/MS it shows up as shifts in retention, response, and which features are detected at all, grouped by plate, day, or column. When a cohort spans many batches, these shifts can dominate the leading components of any unsupervised analysis, so the first thing a model learns is the schedule, not the phenotype.",
    cause:
      "Two things compound. First, features are matched within batches and only reconciled afterward, so a feature present in one batch and split or missed in another enters correction as a partly empty column. Second, statistical batch correction assumes the features are already the same across batches. If matching was imperfect, correction spreads that error rather than removing it, and it can erase real biology that happens to correlate with batch order.",
    mechanism:
      "Metablify resolves features across the entire cohort before any intensity correction, so every column in the table refers to the same analyte in every batch. Consistent mass and elution evidence spanning batches decides identity, which turns ragged, partly missing columns into complete features. With matching correct, downstream normalization has a sound basis and removes far less real signal.",
    outcome:
      "Batch structure recedes in unsupervised plots, missing values that were matching failures resolve, and biological contrasts survive correction instead of being flattened alongside the batch axis. The study behaves like one experiment.",
    limits:
      "If a batch was acquired under a genuinely different method, some differences are real measurement differences and cannot be aligned away. Feature level alignment reduces artifactual batch structure; it does not merge incompatible acquisitions, and it does not replace sound experimental design and randomization.",
    uniqueValueBlocks: [
      {
        heading: "Match before you correct",
        body: "Intensity based batch correction assumes features are already the same across batches. Aligning at the feature layer first gives correction a sound basis and removes far less real biology.",
      },
      {
        heading: "One study, not many",
        body: "Resolving features across the whole cohort turns ragged, partly missing columns into complete features, so the study behaves like one experiment rather than joined batches.",
      },
      {
        heading: "Biology survives correction",
        body: "Because identity is decided from mass and elution rather than intensity, correct alignment does not erase contrasts that happen to correlate with batch order.",
      },
    ],
    faqs: [
      {
        question: "Should I still randomize and run QC samples?",
        answer:
          "Yes. Good design cannot be added later. Randomization and quality control injections limit how far batch effects can reach and give you a way to verify the result. Alignment at the feature layer makes that design pay off rather than substituting for it.",
      },
      {
        question: "Will alignment remove biology that correlates with batch?",
        answer:
          "Correct alignment does not, because it decides feature identity from mass and elution, not from intensity. The risk of erasing biology comes from intensity based batch correction applied to poorly matched features. Getting matching right first reduces that risk.",
      },
    ],
    primaryCta: {
      tier: "assessment",
      proof:
        "Send a cohort that spans several batches and see how much batch structure remains after feature level alignment.",
    },
    sources: [
      {
        label: "Leek et al., batch effects, Nature Reviews Genetics (2010)",
        href: "https://www.nature.com/articles/nrg2825",
        note: "Batch effects and their impact on high dimensional studies.",
      },
      {
        label: "Dunn et al., large scale metabolomics practice, Nature Protocols (2011)",
        href: "https://www.nature.com/articles/nprot.2011.335",
        note: "Quality control and batch handling in metabolomics.",
      },
    ],
    relatedSlugs: [
      "retention-time-drift",
      "large-cohort-processing",
      "batch-effect",
    ],
    author,
    lastReviewed,
  },
  {
    family: "solution",
    slug: "low-abundance-recovery",
    status: "staged",
    intent: "informational",
    title: "Low abundance feature recovery",
    metaTitle: "Low Abundance Feature Recovery | LC/MS",
    metaDescription:
      "Low abundance features are the first to be lost to noise thresholds. Learn how cohort scale evidence recovers real signal near the baseline.",
    h1: "Low abundance feature recovery",
    lead: "The features that matter most are often the ones closest to the baseline. Thresholds that keep noise out also discard real low abundance signal, and the loss is invisible because a missing feature leaves no trace.",
    tags: ["low abundance", "sensitivity", "feature detection", "noise"],
    problem:
      "Low abundance features sit near the noise floor, where the choice of intensity threshold decides what survives. Set it high and real compounds vanish. Set it low and the table fills with noise that has to be cleaned later. Because a real but weak feature that falls below threshold simply does not appear, its absence is silent, and it can be the exact biomarker candidate a study was designed to find.",
    cause:
      "Single sample detection has to distinguish signal from noise using one trace, so a conservative threshold is the safe default. That default is applied uniformly, which penalizes the weakest real features hardest. Noise is random and does not reproduce across injections, but a per sample picker cannot use that fact because it never looks across the cohort.",
    mechanism:
      "Metablify uses reproducibility as the discriminant. A weak feature that appears at consistent mass and retention across many injections is unlikely to be noise, even when its intensity in any single run is small. By amplifying that agreement, the platform recovers low abundance features that a fixed threshold would reject, while random fluctuations that do not reproduce stay out. The law of large numbers does the work that a single trace cannot.",
    outcome:
      "More real features near the baseline enter the table with defensible evidence, fewer true positives are lost to a blunt threshold, and studies that depend on subtle differences keep the signal they were designed to detect.",
    limits:
      "A feature that was never sampled above noise in any injection cannot be recovered, because there is nothing consistent to amplify. Recovery improves with more injections and with a cohort that actually contains the feature. It does not lower the instrument's fundamental limit of detection.",
    uniqueValueBlocks: [
      {
        heading: "Silent losses are the danger",
        body: "A real feature below threshold simply does not appear, so its absence leaves no trace and can be the exact biomarker candidate a study was designed to find.",
      },
      {
        heading: "Reproducibility separates signal from noise",
        body: "Noise is random and does not recur. A weak feature seen at consistent mass and time across injections is unlikely to be noise, which is how recovery rises without lowering a threshold.",
      },
      {
        heading: "More injections, more evidence",
        body: "Because the discriminant is agreement across the cohort, larger and more replicated studies recover more low abundance features rather than fewer.",
      },
    ],
    faqs: [
      {
        question: "Does recovering weak features add noise to my table?",
        answer:
          "The point of using cohort agreement is to separate the two. Random noise does not reproduce across injections, so it is not amplified. Weak but reproducible features are, which raises recovery without simply lowering a threshold.",
      },
      {
        question: "How many samples do I need for this to help?",
        answer:
          "More injections give more evidence, so larger cohorts benefit most. Even modest replication helps, because the discriminant is reproducibility rather than raw intensity in a single run.",
      },
    ],
    primaryCta: {
      tier: "assessment",
      proof:
        "Send replicated data and see how many reproducible low abundance features are recovered against your current output.",
    },
    sources: [
      {
        label: "Mahieu and Patti, feature reliability, Analytical Chemistry (2017)",
        href: "https://pubs.acs.org/doi/10.1021/acs.analchem.7b01069",
        note: "How many features in untargeted data are real.",
      },
      {
        label: "Limit of detection, IUPAC recommendations",
        href: "https://iupac.org/",
        note: "Definitions for detection near the baseline.",
      },
    ],
    relatedSlugs: ["feature-detection", "signal-to-noise", "limit-of-detection"],
    author,
    lastReviewed,
  },
  {
    family: "solution",
    slug: "large-cohort-processing",
    status: "staged",
    intent: "commercial",
    title: "Processing studies above one thousand samples",
    metaTitle: "Processing LC/MS Studies Above 1000 Samples",
    metaDescription:
      "Above a thousand samples, LC/MS processing choices that worked at small scale start to fail. See how Metablify processes large cohorts as one study.",
    h1: "Processing studies above one thousand samples",
    lead: "At small scale almost any workflow looks fine. Above a thousand samples the assumptions that held quietly break, and the study fragments into batches that no longer speak to each other. Scale is where feature recovery and alignment stop being academic.",
    tags: ["cohort", "scale", "alignment", "throughput"],
    problem:
      "Large cohorts change the problem qualitatively. Drift accumulates beyond the reach of simple correction, batches multiply, memory and runtime for classic peak matching grow faster than the sample count, and the fraction of features that are missing in at least one sample climbs until a complete case table is nearly empty. The result is a study that was expensive to acquire and cannot be analyzed as a whole.",
    cause:
      "Pipelines built and validated on tens of samples carry hidden quadratic steps and single reference assumptions. Pairwise alignment and per sample thresholds behave well until the cohort is large, then they either fail to finish or produce a table dominated by batch order and missing values. Splitting the study into manageable batches reintroduces exactly the cross batch matching problem the analysis was meant to avoid.",
    mechanism:
      "Metablify is built to treat a large cohort as a single body of evidence. Feature identity is decided from agreement across all injections at once, so drift and batch steps are modeled together and low abundance features borrow stability from the whole study. Because the design uses the cohort as its own reference, adding samples strengthens the evidence rather than compounding the matching burden.",
    outcome:
      "The full study aligns as one experiment, missing values that were matching failures resolve, and the analysis runs to completion at a scale where conventional matching stalls. The money spent on acquisition produces one coherent table instead of many partial ones.",
    limits:
      "Scale does not repair method problems. If acquisition changed midway or samples degraded, those are real differences. Metablify recovers and aligns what was measured well; it cannot manufacture comparability between fundamentally different acquisitions, and it does not replace planning for storage, randomization, and quality control at scale.",
    uniqueValueBlocks: [
      {
        heading: "Scale changes the problem",
        body: "Above a thousand samples, drift, batch count, and missing values grow until a complete case table is nearly empty and classic pairwise matching stalls or fails to finish.",
      },
      {
        heading: "The cohort strengthens the evidence",
        body: "Because feature identity is decided from agreement across all injections at once, adding samples reinforces the analysis rather than compounding the matching burden.",
      },
      {
        heading: "Feeds your existing stack",
        body: "Metablify produces one clean, aligned, quantified table that flows into the statistical and annotation tools you already use, so acquisition investment yields a coherent result.",
      },
    ],
    faqs: [
      {
        question: "Can Metablify feed my existing downstream stack?",
        answer:
          "Yes. Metablify produces a cleaner, aligned, quantified feature table that flows into the statistical and annotation tools you already use. It sits at the processing layer rather than replacing your downstream analysis.",
      },
      {
        question: "What counts as large for this to matter?",
        answer:
          "The problems described here begin to bite in the hundreds and become acute above a thousand samples, especially across many batches. Smaller studies still benefit, but scale is where the difference is most visible.",
      },
    ],
    primaryCta: {
      tier: "discuss",
      proof:
        "Metablify was developed at the Donald Danforth Plant Science Center to process large LC/MS cohorts.",
    },
    sources: [
      {
        label: "Dunn et al., large scale metabolomics practice, Nature Protocols (2011)",
        href: "https://www.nature.com/articles/nprot.2011.335",
        note: "Practical constraints of large studies.",
      },
      {
        label: "Mahieu and Patti, feature reliability, Analytical Chemistry (2017)",
        href: "https://pubs.acs.org/doi/10.1021/acs.analchem.7b01069",
        note: "Feature counts and reliability at scale.",
      },
    ],
    relatedSlugs: [
      "batch-effect-alignment",
      "retention-time-drift",
      "low-abundance-recovery",
    ],
    author,
    lastReviewed,
  },
];
