import type { ComparisonPage } from "@/types/content";

const author = "Metablify Science Team";
const lastReviewed = "2026-07-18";

function assessmentCta(proof: string) {
  return { tier: "assessment" as const, proof };
}

export const comparisons: ComparisonPage[] = [
  {
    family: "compare",
    slug: "mzmine",
    status: "staged",
    intent: "commercial",
    competitor: "MZmine",
    title: "Metablify and MZmine",
    metaTitle: "Metablify vs MZmine | LC/MS Processing",
    metaDescription:
      "An honest look at MZmine and where Metablify fits. MZmine is a strong open source processor; Metablify targets recovery and alignment at cohort scale.",
    h1: "Metablify and MZmine",
    lead: "MZmine is a capable, widely used open source processor, and for many projects it is the right tool. The question worth answering is where it strains, which is usually recovery near the baseline and alignment across very large cohorts.",
    tags: ["comparison", "open source", "alignment", "feature detection"],
    overview:
      "MZmine is an open source framework for LC/MS feature detection, alignment, and annotation, now in its third major generation with a modular design and an active community. It is free, runs locally, supports many vendor formats through conversion, and gives an analyst fine control over each processing step. For labs that want a transparent, no license pipeline and have the expertise to tune it, MZmine is a reasonable default and a genuinely good tool.",
    otherStrengths: [
      "Free and open source, with no license cost and full transparency into every processing step.",
      "Modular and highly configurable, so an experienced analyst can tune detection and alignment in detail.",
      "Active development and community, with broad vendor format support through open conversion.",
    ],
    comparison: [
      {
        criterion: "Cost and access",
        metablify: "Commercial service and platform, delivered as a project",
        other: "Free and open source, self operated",
      },
      {
        criterion: "Primary design goal",
        metablify: "Recovery and alignment at cohort scale on data you already have",
        other: "Flexible, configurable processing under analyst control",
      },
      {
        criterion: "Large cohort behavior",
        metablify: "Cohort wide evidence used to align and recover across batches",
        other: "Capable, but tuning and scale handling fall to the analyst",
      },
      {
        criterion: "Effort model",
        metablify: "Metablify runs the analysis and reports results",
        other: "Your team configures, runs, and validates the pipeline",
      },
    ],
    whenOther:
      "Choose MZmine when you want a free local pipeline, you have the in house expertise to configure and validate it, and your studies are small enough that manual tuning of detection and alignment is manageable. For exploratory work, teaching, and budget constrained labs, it is often the sensible choice, and its transparency is a real advantage for methods development.",
    complement:
      "Metablify does not require you to abandon MZmine. A common pattern is to use Metablify for the recovery and alignment layer on a large or difficult cohort, then carry the resulting feature table into the annotation and statistics you already run, whether that is inside MZmine or downstream. The two can be complementary rather than mutually exclusive.",
    uniqueValueBlocks: [
      {
        heading: "Where free stops being cheap",
        body: "MZmine has no license cost, but tuning and validating it at cohort scale consumes analyst time. The real comparison is total effort and recovery, not the price of the software.",
      },
      {
        heading: "Recovery as the deciding test",
        body: "The honest way to choose is to compare recovered and aligned features on a study you have already processed, rather than trusting either description of what each tool does.",
      },
      {
        heading: "A layer, not a replacement",
        body: "Metablify can sit ahead of your existing MZmine steps, handing a cleaner feature table to the annotation and statistics you already run.",
      },
    ],
    faqs: [
      {
        question: "Is Metablify just MZmine with a service wrapper?",
        answer:
          "No. Metablify is a distinct platform built to decide feature identity from agreement across a whole cohort, delivered as an analysis rather than software you operate. It can hand its output to tools you already use, including MZmine, but the processing approach is its own.",
      },
      {
        question: "Can I compare them on my own data?",
        answer:
          "Yes, and that is the honest way to decide. Send a subset of a study you have already processed and compare recovered and aligned features against your MZmine output rather than relying on either side's description.",
      },
    ],
    primaryCta: assessmentCta(
      "Compare recovered features on your own data against your current MZmine output.",
    ),
    sources: [
      {
        label: "Schmid et al., MZmine 3, Nature Biotechnology (2023)",
        href: "https://www.nature.com/articles/s41587-023-01690-2",
      },
      {
        label: "Pluskal et al., MZmine 2, BMC Bioinformatics (2010)",
        href: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-11-395",
      },
    ],
    relatedSlugs: ["xcms", "peak-splitting", "large-cohort-processing"],
    author,
    lastReviewed,
  },
  {
    family: "compare",
    slug: "xcms",
    status: "staged",
    intent: "commercial",
    competitor: "XCMS",
    title: "Metablify and XCMS",
    metaTitle: "Metablify vs XCMS | LC/MS Processing",
    metaDescription:
      "XCMS is the reference open source metabolomics processor. See where it excels and where Metablify adds recovery and alignment at cohort scale.",
    h1: "Metablify and XCMS",
    lead: "XCMS is the reference implementation much of the field grew up on, and many cores run it well. The honest objection it raises is real: it is free and already installed. The answer is not that XCMS is bad, it is where scale and recovery start to cost you.",
    tags: ["comparison", "open source", "alignment", "feature detection"],
    overview:
      "XCMS is an open source R package for LC/MS data processing, one of the earliest and most cited, with well characterized peak detection and retention time correction and a large body of published use. It integrates with the R and Bioconductor ecosystem, which makes it powerful for analysts who work there, and its methods are transparent and reproducible. For many published studies XCMS is entirely sufficient and remains a sound, defensible choice.",
    otherStrengths: [
      "Mature, transparent, and heavily cited, with methods the field understands and trusts.",
      "Deep integration with R and Bioconductor for statistics and downstream analysis.",
      "Free and reproducible, with published parameter guidance for common study types.",
    ],
    comparison: [
      {
        criterion: "Ecosystem",
        metablify: "Delivered as an analysis, output ready for any downstream stack",
        other: "R and Bioconductor native, scripted by the analyst",
      },
      {
        criterion: "Recovery focus",
        metablify: "Cohort agreement used to recover reproducible low abundance features",
        other: "Per sample detection with parameters set by the analyst",
      },
      {
        criterion: "Scale handling",
        metablify: "Designed for cohorts in the thousands across many batches",
        other: "Capable at scale with expertise and compute, tuned manually",
      },
      {
        criterion: "Expertise required",
        metablify: "Metablify team runs and validates the processing",
        other: "Requires R fluency and parameter tuning in house",
      },
    ],
    whenOther:
      "Choose XCMS when your team lives in R, values a transparent and citable method, and runs studies where its detection and alignment are well matched to the data. For reproducible academic work and pipelines that already sit in Bioconductor, XCMS is a strong and cost free choice, and switching for its own sake would be a poor trade.",
    complement:
      "Metablify output is a feature table, so it moves naturally into R for the statistics and visualization your team already writes. Labs can use Metablify for recovery and alignment on a demanding cohort and keep XCMS or Bioconductor for everything downstream, rather than choosing one for the entire pipeline.",
    uniqueValueBlocks: [
      {
        heading: "The already installed objection",
        body: "XCMS is free and often already running in a core, which is a real reason to keep it. The question is where per sample detection and reference alignment cost you as cohorts grow.",
      },
      {
        heading: "A different discriminant",
        body: "Rather than asking for better manual parameters, Metablify changes the basis of detection to agreement across the whole cohort, which is what tuning alone cannot provide at scale.",
      },
      {
        heading: "Keeps your R workflow",
        body: "Metablify hands a clean, aligned table to your existing Bioconductor analysis, so your downstream code and figures stay exactly as they are.",
      },
    ],
    faqs: [
      {
        question: "Why not just tune XCMS parameters harder?",
        answer:
          "Careful tuning helps, and skilled users get a lot from XCMS. The limit is that per sample detection and reference based alignment become harder to tune as cohorts grow and drift accumulates. Metablify changes the discriminant to cohort agreement rather than asking for better manual settings.",
      },
      {
        question: "Does Metablify replace my R workflow?",
        answer:
          "No. It targets the processing layer and hands a clean, aligned table to your existing R and Bioconductor analysis, so your downstream code stays.",
      },
    ],
    primaryCta: assessmentCta(
      "Send a cohort you processed in XCMS and compare recovery and alignment side by side.",
    ),
    sources: [
      {
        label: "Smith et al., XCMS, Analytical Chemistry (2006)",
        href: "https://pubs.acs.org/doi/10.1021/ac051437y",
      },
      {
        label: "Tautenhahn et al., XCMS retention time correction, BMC Bioinformatics (2008)",
        href: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-9-504",
      },
    ],
    relatedSlugs: ["mzmine", "retention-time-drift", "large-cohort-processing"],
    author,
    lastReviewed,
  },
  {
    family: "compare",
    slug: "ms-dial",
    status: "staged",
    intent: "commercial",
    competitor: "MS-DIAL",
    title: "Metablify and MS-DIAL",
    metaTitle: "Metablify vs MS-DIAL | LC/MS Processing",
    metaDescription:
      "MS-DIAL is a strong free processor with excellent deconvolution and spectral libraries. See where Metablify complements it on recovery and scale.",
    h1: "Metablify and MS-DIAL",
    lead: "MS-DIAL is one of the best free tools available, especially for deconvolution and library based annotation. Comparing it fairly means naming those strengths first, then being precise about where recovery and cohort scale still ask for more.",
    tags: ["comparison", "deconvolution", "annotation", "alignment"],
    overview:
      "MS-DIAL is a free processor for untargeted metabolomics and lipidomics with strong spectral deconvolution and extensive built in libraries, supporting both data dependent and data independent acquisition. It has a graphical interface, active development, and a large user base, and its lipidomics annotation in particular is widely respected. For many labs MS-DIAL delivers a complete path from raw data to annotated features at no cost.",
    otherStrengths: [
      "Excellent spectral deconvolution, including strong handling of data independent acquisition.",
      "Extensive built in spectral libraries, with especially strong lipid annotation.",
      "Free, actively developed, and approachable through a graphical interface.",
    ],
    comparison: [
      {
        criterion: "Annotation libraries",
        metablify: "Feature layer processing, output ready for your annotation tools",
        other: "Rich built in libraries, strong for lipids and common classes",
      },
      {
        criterion: "Deconvolution",
        metablify: "Feature grouping from cohort wide agreement",
        other: "Mature deconvolution, a core strength",
      },
      {
        criterion: "Cohort scale recovery",
        metablify: "Designed for recovery and alignment across large cohorts",
        other: "Capable, with scale and tuning managed by the analyst",
      },
      {
        criterion: "Delivery",
        metablify: "Run as a project by the Metablify team",
        other: "Self operated desktop application",
      },
    ],
    whenOther:
      "Choose MS-DIAL when annotation coverage matters most, especially in lipidomics, when you want a free tool with a graphical interface, and when your studies fit comfortably on a workstation. Its deconvolution and libraries are genuine strengths, and for many untargeted projects it is an excellent and complete solution on its own.",
    complement:
      "Because MS-DIAL is strong at deconvolution and annotation, a natural division of labor is to use Metablify for recovery and alignment on a large or difficult cohort and MS-DIAL for annotation of the resulting features. The two address different parts of the problem, so pairing them is often more sensible than replacing one with the other.",
    uniqueValueBlocks: [
      {
        heading: "Annotation is a real strength",
        body: "MS-DIAL libraries, especially for lipids, are excellent. A comparison that ignored that would not be credible with anyone who has used the tool.",
      },
      {
        heading: "Recovery is a separate problem",
        body: "Deconvolution and annotation still depend on which real features enter the table. Metablify concentrates on recovery and cross cohort alignment, ahead of annotation.",
      },
      {
        heading: "Pair, do not replace",
        body: "Use Metablify to recover and align a large cohort, then annotate the result in MS-DIAL. The two address different parts of the pipeline.",
      },
    ],
    faqs: [
      {
        question: "Does Metablify annotate compounds like MS-DIAL?",
        answer:
          "Metablify concentrates on recovery, alignment, and quantification at the feature layer. It produces a clean feature table you can annotate in the tool of your choice, including MS-DIAL, whose libraries are a real strength.",
      },
      {
        question: "Which is better for lipidomics?",
        answer:
          "MS-DIAL has excellent lipid annotation and is hard to beat there. Metablify can improve recovery and alignment of lipid features across a large cohort, then hand those features to MS-DIAL for annotation, so the honest answer is that they work well together.",
      },
    ],
    primaryCta: assessmentCta(
      "Send a cohort and compare recovered, aligned features against your MS-DIAL output.",
    ),
    sources: [
      {
        label: "Tsugawa et al., MS-DIAL, Nature Methods (2015)",
        href: "https://www.nature.com/articles/nmeth.3393",
      },
      {
        label: "Tsugawa et al., MS-DIAL 4, Nature Biotechnology (2020)",
        href: "https://www.nature.com/articles/s41587-020-0531-2",
      },
    ],
    relatedSlugs: ["mzmine", "deconvolution", "lipidomics"],
    author,
    lastReviewed,
  },
  {
    family: "compare",
    slug: "ai-metabolomics-platforms",
    status: "staged",
    intent: "commercial",
    competitor: "AI metabolomics platforms",
    title: "Metablify and the new AI metabolomics platforms",
    metaTitle: "Metablify vs AI Metabolomics Platforms",
    metaDescription:
      "Newer AI metabolomics platforms promise standard free identification. See an honest positioning of where Metablify differs and what to verify.",
    h1: "Metablify and the new AI metabolomics platforms",
    lead: "A newer group of commercial platforms markets machine learning for identification and quantification without standards. They are serious efforts. The useful comparison is about what each actually claims, what is verifiable, and what you can test on your own data.",
    tags: ["comparison", "commercial", "identification", "quantification"],
    overview:
      "Several venture backed companies now offer machine learning platforms for metabolomics, positioning around identification or quantification without physical standards and around large reference databases. These are credible, well funded efforts with real science behind them, and some publish validation. Because the category is new and the claims are broad, the responsible approach is to compare on specifics rather than on marketing, and to insist on evidence for any figure that would drive a purchase.",
    otherStrengths: [
      "Serious investment and engineering, often with polished software and support.",
      "Real research behind machine learning approaches to annotation and quantification.",
      "Growing published validation for specific compound classes and use cases.",
    ],
    comparison: [
      {
        criterion: "Core claim",
        metablify: "Recovery and alignment on data you already acquired",
        other: "Often identification or quantification with reduced reliance on standards",
      },
      {
        criterion: "What to verify",
        metablify: "Test recovery against your current output on your data",
        other: "Ask for validation data and the boundaries of any accuracy claim",
      },
      {
        criterion: "Change to acquisition",
        metablify: "None, works on your existing files",
        other: "Varies by platform, confirm before committing",
      },
      {
        criterion: "Evidence model",
        metablify: "Cohort agreement, testable on a subset you provide",
        other: "Model based, verify performance on data like yours",
      },
    ],
    whenOther:
      "One of these platforms may be the right choice when your primary need is annotation or quantification within the classes they have validated, when their software fits your workflow, and when they can show performance on data resembling yours. If identification is the bottleneck and a vendor can prove it on your matrix, that is a legitimate reason to choose them.",
    complement:
      "Recovery and annotation are different problems. Metablify can improve which real features enter the table and how well they align across a cohort, and a strong annotation platform can then work on that cleaner input. Framing the decision as recovery versus identification, rather than one platform against another, often serves the science better.",
    uniqueValueBlocks: [
      {
        heading: "Compare specifics, not marketing",
        body: "The category is new and the claims are broad. Ask exactly what is being claimed, for which compound classes, and with what validation on data like yours.",
      },
      {
        heading: "Testable on your own data",
        body: "Metablify leads with recovery you can measure on a subset you provide, rather than with identification claims that require independent validation to trust.",
      },
      {
        heading: "Recovery versus identification",
        body: "If annotation is your bottleneck, one of these platforms may fit. If which real features reach the table is the problem, that is a different and complementary need.",
      },
    ],
    faqs: [
      {
        question: "Does Metablify use AI?",
        answer:
          "Metablify is built on first principles and on using agreement across a cohort as evidence. The emphasis is on recovery and alignment that you can test on your own data, rather than on identification claims that require independent validation.",
      },
      {
        question: "How do I evaluate any of these claims?",
        answer:
          "Ask for validation on data like yours, define exactly what is being claimed, and run a test on a subset you control. Any platform confident in its results, including Metablify, should welcome a comparison on your own data.",
      },
    ],
    primaryCta: assessmentCta(
      "Test recovery on your own data rather than comparing marketing claims.",
    ),
    sources: [
      {
        label: "Mahieu and Patti, feature reliability, Analytical Chemistry (2017)",
        href: "https://pubs.acs.org/doi/10.1021/acs.analchem.7b01069",
      },
      {
        label: "Sumner et al., annotation confidence standards, Metabolomics (2007)",
        href: "https://link.springer.com/article/10.1007/s11306-007-0082-2",
      },
    ],
    relatedSlugs: ["xcms", "mzmine", "large-cohort-processing"],
    author,
    lastReviewed,
  },
];
