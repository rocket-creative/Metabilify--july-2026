# CEO design review — what changed, what is still needed

This pass answers the annotated deck (`Metablify Website_2026-8-9.pptx`) and the
fact-checked About copy draft (v0.2). It is a design and structure pass. Two
things are deliberately unfinished and are listed below: photography, and one
diagram the CEO asked to rebuild.

## What was addressed

| CEO note | Where it landed |
| --- | --- |
| Header is two rows and feels heavy | One row at every width: logo, nav, search, CTA. `Header.tsx` |
| Add search and a ribbon, like the ITL site | Announcement ribbon above the header; Cmd/Ctrl+K search palette |
| Hero headline breaks awkwardly, letters hang | Headline sizes to two lines; display line-height raised to clear descenders |
| Slide 8 — three-panel mass-feature band | Rebuilt as a forest band with three line-art diagrams. `CapabilitiesBand.tsx` |
| Slide 10 — Work With Metablify | Rebuilt as a split green band with three category cards |
| Slide 12 — Getting started steps | Rebuilt with circular badges on a rail; copy is verbatim from the deck |
| Site reads as a plant company | Plant imagery and plant framing removed throughout |
| About page needs the new copy | Rebuilt as 15 sections from the v0.2 draft, copy verbatim |
| Applications needs structure | Three sections: what we enable, the omics, specific applications |

The Danforth Plant Science Center references are intact everywhere. They are
factual and carry credibility — only the *visual* plant language was removed.

## Photography needed

Every slot below renders as a labelled outline box today. The label in the code
is the art brief. None of these should include plants.

| Page | Slot | Ratio | Brief |
| --- | --- | --- | --- |
| Home | Hero | 4/3 | Gloved hands loading a 96-well microplate into an LC/MS autosampler |
| Home | Work With Metablify band | 3/2 | Metablify scientists at work between the LC/MS instrument bay and the data workspace |
| Home | Analytical Services card | 4/3 | Amber LC/MS sample vials loaded in an autosampler tray |
| Home | Platform Development card | 4/3 | Scientist writing analysis code beside a chromatogram on a second monitor |
| Home | Strategic Collaborations card | 4/3 | Two researchers reviewing LC/MS results together at a lab bench workstation |
| Home | Origin section | 16/9 | 96-well microplate being prepared for LC/MS analysis on an autosampler deck |
| About | Headshots ×4 | 1/1 | Bielski, Baxter, Hubbard, Connelly |

All diagrams and icons are real, finished SVG — they are not placeholders and
need nothing from the client.

## Copy needed

Rendered as visible "Copy needed" boxes on the About page:

1. Short bios ×4 — Bielski, Baxter, Hubbard, Connelly.
2. One additional management team member — name, title, bio.
3. Advisors ×3 — names and titles. None are currently named.
4. Any additional approved investors or supporters, with links.

QRM Capital renders as an unlinked tile because we have no confirmed URL.

## Deferred, by agreement

- **The comparison diagram** (three overlapping circles, "Don't leave real mass
  features in the noise"). This content was rescued off the parked hero
  animation and rehoused on the home page so the message was not lost. The
  geometry now shows the third circle straddling the boundary, which is the
  false-positive point from slide 7. It is agreed this gets a full rebuild with
  new imagery in the next pass — treat what is live as a holding position.
- **The hero dive animation.** `ParallaxHero.tsx`, `ParticleField.tsx`, and
  `DiveReel.tsx` are unmounted but kept in the repository as the reference for
  that rebuild. They are dead code today. `ParticleField.tsx` carries one
  pre-existing ESLint error; it is the only lint error in the project and it is
  in unmounted code.

## Decisions worth a second opinion

- **The ribbon does not scroll.** It was built as a static announcement rather
  than a marquee: a permanent animation directly above a sticky header competes
  with the navigation it sits on. It ships no JavaScript as a result. Easy to
  reverse if motion was the point.
- **`/news` now has real content.** The ribbon links to it, so a "coming soon"
  stub would have been a dead end. It lists the two milestones the ribbon
  advertises — the 2025 INNO Startup to Watch recognition and the 2024 Arch
  Grants award — using the fact-checked About copy verbatim so the two pages
  cannot drift. Years only; no publication dates were invented.
- **Search covers staged content.** Every hub page (`/solutions`, `/compare`,
  `/learn/glossary`) already lists pages with `status: "staged"`, so search
  matches that rule rather than a stricter one. Pages marked `draft` are
  excluded. All 23 registry pages are currently `staged`, and per the content
  audit they still need client approval.
- **Four plant photos are now unused** (`hero-leaf-interior`, `hero-leaf-wash`,
  `origin-growth-chamber`, `service-*`). They are left in `public/images` rather
  than deleted — removing client assets is not our call. Nothing links to them,
  so no visitor downloads them, though they are still copied into the deployment
  as static files.

## Verification

`npm run build` passes: 74 static routes. `npx tsc --noEmit` is clean.
`npm run lint` reports only the pre-existing `ParticleField.tsx` error noted
above. Checked at 393px, 768px, and 1440px: the header holds one row, the hero
holds two lines, no descenders clip, and there is no horizontal overflow at
phone width (`document.scrollWidth` equals the viewport at 393px).
