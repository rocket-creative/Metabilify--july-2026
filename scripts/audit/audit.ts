import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { allContent } from "../../src/content/registry";
import { getAnyBySlug } from "../../src/content/registry";
import type { ContentPage } from "../../src/types/content";

const BANNED_PHRASES = [
  "clean and professional",
  "this framing",
  "happy to",
  "through line",
  "operationally",
  "dive into",
  "leverage",
  "utilize",
  "in order to",
  "due to the fact that",
  "it is important to note",
];

const UNSAFE_CLAIMS = [
  "compliance",
  "diagnostic",
  "certified",
  "guaranteed",
  "fda",
];

const HYPHEN_ALLOWLIST = ["MS-DIAL"];

const WORD_MIN: Record<ContentPage["family"], number> = {
  glossary: 200,
  instrument: 400,
  solution: 600,
  compare: 600,
  application: 500,
  "analyte-class": 500,
  resource: 400,
};
const SIMILARITY_MAX = 0.6;

type Finding = { level: "hard" | "soft"; message: string };

function proseFields(page: ContentPage): string[] {
  const out: string[] = [
    page.title,
    page.metaTitle,
    page.metaDescription,
    page.h1,
    page.lead,
  ];
  for (const b of page.uniqueValueBlocks) out.push(b.heading, b.body);
  if (page.primaryCta.proof) out.push(page.primaryCta.proof);

  const p = page as unknown as Record<string, unknown>;
  const maybe = [
    "problem",
    "cause",
    "mechanism",
    "outcome",
    "limits",
    "overview",
    "whenOther",
    "complement",
    "definition",
    "example",
    "dataCharacteristics",
    "recoveryNotes",
    "ingestion",
    "characteristics",
    "challenges",
    "approach",
    "audience",
    "body",
    "term",
    "competitor",
    "vendor",
    "field",
    "analyteClass",
  ];
  for (const key of maybe) {
    if (typeof p[key] === "string") out.push(p[key] as string);
  }
  if (Array.isArray(p.otherStrengths)) {
    out.push(...(p.otherStrengths as string[]));
  }
  if (Array.isArray(p.comparison)) {
    for (const row of p.comparison as {
      criterion: string;
      metablify: string;
      other: string;
    }[]) {
      out.push(row.criterion, row.metablify, row.other);
    }
  }
  if (Array.isArray(p.faqs)) {
    for (const f of p.faqs as { question: string; answer: string }[]) {
      out.push(f.question, f.answer);
    }
  }
  return out;
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function wordSet(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

function auditPage(page: ContentPage, all: ContentPage[]): Finding[] {
  const findings: Finding[] = [];
  const prose = proseFields(page);
  const joined = prose.join(" ");
  const lower = joined.toLowerCase();

  for (const phrase of BANNED_PHRASES) {
    if (lower.includes(phrase)) {
      findings.push({ level: "hard", message: `Banned phrase: "${phrase}"` });
    }
  }

  for (let text of prose) {
    for (const allowed of HYPHEN_ALLOWLIST) {
      text = text.split(allowed).join(" ");
    }
    if (/[A-Za-z]-[A-Za-z]/.test(text)) {
      const m = text.match(/\b\w+-\w+\b/);
      findings.push({
        level: "hard",
        message: `Hyphen in body copy near "${m?.[0] ?? "?"}"`,
      });
      break;
    }
    if (/[—–]/.test(text)) {
      findings.push({ level: "hard", message: "Em or en dash in body copy" });
      break;
    }
  }

  const words = wordCount(joined);
  const target = WORD_MIN[page.family];
  if (words < target) {
    findings.push({
      level: "soft",
      message: `Thin: ${words} words (target ${target})`,
    });
  }
  if (page.uniqueValueBlocks.length < 3) {
    findings.push({ level: "hard", message: "Fewer than three value blocks" });
  }

  const mine = wordSet(joined);
  for (const sibling of all) {
    if (sibling === page || sibling.family !== page.family) continue;
    const sim = jaccard(mine, wordSet(proseFields(sibling).join(" ")));
    if (sim > SIMILARITY_MAX) {
      findings.push({
        level: "hard",
        message: `Too similar to ${sibling.slug} (${(sim * 100).toFixed(0)}%)`,
      });
    }
  }

  const dupTitle = all.find(
    (o) => o !== page && o.metaTitle === page.metaTitle,
  );
  if (dupTitle) {
    findings.push({ level: "hard", message: `Duplicate metaTitle with ${dupTitle.slug}` });
  }
  const dupDesc = all.find(
    (o) => o !== page && o.metaDescription === page.metaDescription,
  );
  if (dupDesc) {
    findings.push({
      level: "hard",
      message: `Duplicate metaDescription with ${dupDesc.slug}`,
    });
  }

  for (const claim of UNSAFE_CLAIMS) {
    if (lower.includes(claim)) {
      findings.push({
        level: "soft",
        message: `Review claim wording: "${claim}"`,
      });
    }
  }
  if (/\b\d{1,3}\s?%/.test(joined)) {
    findings.push({
      level: "soft",
      message: "Absolute percentage claim, confirm it has a source",
    });
  }

  const resolved = page.relatedSlugs.filter((s) => getAnyBySlug(s));
  if (resolved.length < 3) {
    findings.push({
      level: "hard",
      message: `Only ${resolved.length} resolvable related links (need 3)`,
    });
  }
  const broken = page.relatedSlugs.filter((s) => !getAnyBySlug(s));
  if (broken.length > 0) {
    findings.push({
      level: "hard",
      message: `Broken related links: ${broken.join(", ")}`,
    });
  }
  if (!page.primaryCta) {
    findings.push({ level: "hard", message: "Missing CTA" });
  }

  if (page.metaTitle.length > 60) {
    findings.push({
      level: "soft",
      message: `metaTitle ${page.metaTitle.length} chars (aim <= 60)`,
    });
  }
  if (page.sources.length < 2) {
    findings.push({ level: "hard", message: "Fewer than two sources" });
  }

  return findings;
}

function verdict(findings: Finding[]): "ship" | "revise" | "cut" {
  const hard = findings.filter((f) => f.level === "hard").length;
  const soft = findings.filter((f) => f.level === "soft").length;
  if (hard >= 3) return "cut";
  if (hard > 0) return "revise";
  if (soft > 1) return "revise";
  return "ship";
}

function main() {
  const all = allContent();
  const lines: string[] = [];
  lines.push("# Metablify content audit report");
  lines.push("");
  lines.push(`Generated ${new Date().toISOString().slice(0, 10)}.`);
  lines.push("");

  const byStatus = {
    live: all.filter((p) => p.status === "live").length,
    staged: all.filter((p) => p.status === "staged").length,
    draft: all.filter((p) => p.status === "draft").length,
  };
  lines.push("## Status");
  lines.push("");
  lines.push(`- live: ${byStatus.live}`);
  lines.push(`- staged: ${byStatus.staged}`);
  lines.push(`- draft: ${byStatus.draft}`);
  lines.push("");

  const results = all.map((page) => ({
    page,
    findings: auditPage(page, all),
  }));

  const proposedLive = results
    .filter((r) => verdict(r.findings) === "ship")
    .map((r) => `${r.page.family}/${r.page.slug}`);

  lines.push("## Pages proposed for live");
  lines.push("");
  lines.push(
    "These pass the automated gate with no hard violations. The client approves this list before any status is promoted to live.",
  );
  lines.push("");
  if (proposedLive.length === 0) {
    lines.push("_None yet. See per page notes below._");
  } else {
    for (const slug of proposedLive) lines.push(`- ${slug}`);
  }
  lines.push("");

  lines.push("## Per page verdict");
  lines.push("");
  let liveHardViolations = 0;
  for (const { page, findings } of results) {
    const v = verdict(findings);
    lines.push(`### ${page.family}/${page.slug} — ${v.toUpperCase()}`);
    lines.push("");
    lines.push(`Status: ${page.status}`);
    lines.push("");
    if (findings.length === 0) {
      lines.push("No issues found.");
    } else {
      for (const f of findings) {
        lines.push(`- [${f.level}] ${f.message}`);
        if (page.status === "live" && f.level === "hard") {
          liveHardViolations++;
        }
      }
    }
    lines.push("");
  }

  const outDir = join(process.cwd(), "docs");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "AUDIT-REPORT.md"), lines.join("\n"), "utf8");

  const shipCount = results.filter((r) => verdict(r.findings) === "ship").length;
  const reviseCount = results.filter(
    (r) => verdict(r.findings) === "revise",
  ).length;
  const cutCount = results.filter((r) => verdict(r.findings) === "cut").length;

  console.log(
    `Audit complete: ${shipCount} ship, ${reviseCount} revise, ${cutCount} cut. Report at docs/AUDIT-REPORT.md`,
  );

  if (liveHardViolations > 0) {
    console.error(
      `FAIL: ${liveHardViolations} hard violation(s) on live pages.`,
    );
    process.exitCode = 1;
  }
}

main();
