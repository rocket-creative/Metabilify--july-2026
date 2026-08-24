# Design Contract

Shared rules for the CEO design pass. Several sections are being rebuilt in
parallel, and the feedback we are answering is that the site does not feel
deliberately designed. Independently invented stroke weights, badge sizes, and
spacing rhythms would reproduce that problem at a larger scale. Follow this
document over your own judgment; if it is wrong, say so rather than diverging.

## The reference

The CEO built mockups and said he prefers their "spacing, sentence
visualization, font sizes" to what we shipped. The look to match:

- Bold, tightly-set headlines with generous line spacing.
- Forest-green bands with lime accents for platform messaging.
- Lab/scientific line art, not abstract geometric icons.
- Circular badges for step and category markers.
- Generous whitespace, narrow text measures.

## Tokens

Never hard-code a hex value. Everything is in `src/app/styles/base.css`.

| Purpose | Token | Value |
| --- | --- | --- |
| Primary text | `--color-ink` | `#1a1a1a` |
| Secondary text | `--color-muted` | `#5c5c5c` |
| Tertiary text / placeholders | `--color-faint` | `#9a9a9a` |
| Borders, hairlines | `--color-stone` | `#e6e6e6` |
| Grey section background | `--color-neutral` | `#f4f4f4` |
| Soft background | `--color-grey-soft` | `#fafafa` |
| Dark band background | `--color-forest` | `#123227` |
| Dark band hover | `--color-forest-deep` | `#0d2620` |
| Accent on forest | `--color-lime` | `#c4e86b` |
| Pale green wash | `--color-hero-green` | `#eef4e6` |

Fonts: `--font-display` and `--font-body` are both Plus Jakarta Sans;
`--font-mono` is IBM Plex Mono and is used **only** for eyebrows, ratios, and
other metadata.

Easing: `--ease-out-expo` for anything that moves. Do not introduce new curves.

## Type

Already set globally in `src/app/styles/typography.css` — **do not re-declare
these in a domain stylesheet.**

- `.display` is `font-weight: 700`, `line-height: 1.1`, `letter-spacing: -0.02em`.
  The line-height is load-bearing: at the previous `1.02` the descenders of one
  line collided with the caps of the next, which is the "hanging letters" note
  we are fixing. Never set a display line-height below `1.1`.
- Size classes: `.display-xl`, `.display-lg` (section headings), `.display-md`.
- `.eyebrow` — mono, uppercase, `0.14em` tracking. Every section starts with one.
- `.lead` — max measure `42rem`. Leads should set to about two lines.
- Body copy inside cards: `text-sm` with `leading-relaxed`.

On forest backgrounds the eyebrow is lime and the heading is white; both are
already handled by `.section-forest` descendant rules in `layout.css`.

## Spacing

Use the existing primitives rather than ad-hoc padding:

- `.section` — the standard content block, `max-width: 80rem`.
- `.section-wide` + `.band-y` — full-bleed background with vertical rhythm.
- `.gutter-x` — horizontal padding only.
- Section background alternation: white, then `.section-grey` or
  `.section-sage`, then `.section-forest` for emphasis. Never place two forest
  bands adjacent.
- Heading to body gap: `mb-4` after an eyebrow, `mb-5`/`mb-6` after a heading.
- Grid gaps: `gap-6` for cards, `gap-8` for wider columns.

## SVG visual language

This is the part most likely to drift, so it is specific.

- `viewBox="0 0 64 64"` for icons, `0 0 240 140` for diagram panels.
- `fill="none"`, `stroke="currentColor"`, `stroke-width="1.5"` for icons and
  `1.75` for diagram panels. No other stroke widths.
- `stroke-linecap="round"`, `stroke-linejoin="round"`.
- Always `aria-hidden="true"` — these are decorative, the adjacent heading
  carries the meaning.
- Colour comes from `currentColor` and the parent's text colour. The single
  permitted exception is the lime highlight on forest, which may be set
  explicitly to `var(--color-lime)` to mark "what is real".
- Chart geometry: axes as plain lines, peaks as paths, features as `r="2"`
  circles, noise as low-opacity (`0.3`-`0.4`) short strokes.
- Do not animate a diagram on load unless the section already animates. Respect
  `prefers-reduced-motion` via `motion.css`, which loads after every domain.

### Motion reveals once, then holds still

No `repeat: -1` in GSAP. Every scroll animation on the site is a one-time reveal
tied to a `ScrollTrigger` with `once: true`. A perpetual GSAP timeline keeps a
`requestAnimationFrame` loop alive while its section is off-screen, and it reads
as restless. If a looping effect seems necessary, raise it instead of adding it.

**The announcement ribbon is the one sanctioned exception**, added at the
client's request: it rotates through news items every 5 seconds. It is allowed
because it is content rotation rather than decoration, and because it is
bounded — no `requestAnimationFrame`, just a `setInterval` that stops on hover,
on focus, when the tab is hidden, and entirely under
`prefers-reduced-motion`. Any future looping motion must clear the same four
bars.

### Circular badges

Two variants, because the CEO's mockups use two. An earlier version of this
document specified only the outlined one, which was an error on our part — both
of the following are correct, and the choice is driven by what the badge is
doing, not by preference.

Shared: perfect circle (`border-radius: 999px`), diameter
`clamp(3rem, 5vw, 4rem)`, icon at 45% of the badge diameter.

| Variant | Fill | Border | Icon | Use |
| --- | --- | --- | --- | --- |
| Outlined | white | `1.5px solid var(--color-stone)` | forest | Sequence markers on a rail — process steps |
| Filled | `var(--color-forest)` | none | white | Category marks on a card — service cards |
| On forest | `var(--color-lime)` | none | forest | Either, inside a dark band |

The distinction is worth keeping: an outlined badge recedes so the connecting
rail reads as one continuous line, while a filled badge anchors a card that has
no rail to belong to.

## Placeholders

Photography is deliberately unsourced this pass. Use the shared components in
`src/components/ImagePlaceholder.tsx` — do not roll your own box.

```tsx
<ImagePlaceholder ratio="16/9" label="Scientists reviewing LC/MS data on screen" />
<ImagePlaceholder ratio="1/1" label="Headshot — Michael Bielski" />
<CopyPlaceholder label="Short bio — Allen Hubbard, PhD" />
```

- `tone="dark"` on forest backgrounds.
- The `label` is the asset brief. Write what should be photographed, concretely
  and without plant references. "96-well microplate on an autosampler" is
  useful; "platform image" is not.

### A dashed border always means "provisional"

One visual rule covers every unfinished state, so the site reads as
deliberately mid-flight rather than broken in three unrelated ways:

- Unsourced image → `ImagePlaceholder`.
- Unwritten copy → `CopyPlaceholder`.
- A real capability we do not sell yet → `.card` plus `.card-provisional`
  (dashed border, transparent fill). Used on the "Other omics" card.

Do not use a dashed border for anything that is finished.

## De-planting

The core note from the CEO: Metablify is at the Danforth Center but is **not** a
plant company. LC/MS serves drug discovery, environmental, agricultural, and
clinical work.

- In files you own, remove plant framing from copy, headings, and `alt` text.
- Keep "developed at the Donald Danforth Plant Science Center" wherever it
  appears. It is factual and carries credibility.
- Do not add new plant examples. When you need breadth, reach for drug
  discovery, environmental, agriculture, or clinical.

## Cross-file rules

- **You own only the files in your brief.** If you need a change in someone
  else's file, describe it in your final report instead of editing it.
- `src/app/globals.css` is a manifest of `@import` lines and nothing else. Its
  order is the cascade order and reproduces a previously-single stylesheet
  exactly. Do not reorder it. If you add a stylesheet, append the import and say
  so in your report.
- `src/app/styles/motion.css` is shared. It holds the global
  `prefers-reduced-motion` block. Do not move it or add domain rules to it.
- **Domain stylesheets outrank Tailwind utilities.** None of the files under
  `src/app/styles/` are wrapped in `@layer`, so a plain class selector like
  `.card` beats a utility like `bg-transparent`, regardless of source order.
  This is why `Header.tsx` needs `!hidden` to hide an element a stylesheet
  styles. When a utility mysteriously does nothing, this is why. Fix it by
  adding a modifier class to the domain stylesheet, not by escalating to `!`.
- `src/lib/site.ts` is frozen for this pass. `navLinks`, `founders`,
  `managementTeam`, `scientificFounders`, and `supporters` are already updated.
- Do not run `npm run build` while parallel work is in flight; concurrent builds
  race on `.next/`. Use `npx tsc --noEmit` to typecheck. (The parallel pass is
  complete, so this now only applies to future parallel work.)

## Component interfaces fixed in advance

So parallel work composes without coordination:

```tsx
// src/components/StaticHero.tsx — built by the hero agent, mounted by the home agent
export function StaticHero(): React.JSX.Element;
```

`StaticHero` takes no props and renders its own `<section>`, replacing
`<DiveReel />` in `src/app/page.tsx`.

## Known pre-existing issues — not yours to fix

- `src/components/ParticleField.tsx` has an ESLint error ("Cannot update ref
  during render") and three warnings. It predates this work and the component is
  being unmounted. Leave it.
