# Change: Design pass: illustrated hero, icon cards, lighter header, warmer footer, section rhythm (REQ-REMD-014)

## Why
The site passes every functional and accessibility check but reads as a plain document. The home
page repeats «REMEDY FOR ALL» directly under a logo that already says it. The «Together in
Support» tagline inside the logo image is too small to read. «What we do» is eleven long items,
which is tiring at phone width.

## What Changes
- **Home hero.** His illustration, with the headline «Προστατεύουμε και στηρίζουμε ευάλωτες
  ομάδες του πληθυσμού.» / "We protect and support vulnerable groups." on its cream left half,
  «Together in Support» as real text, and one primary link to the What we do cards. It replaces
  the large «REMEDY FOR ALL» heading. The purpose paragraph stays below. At phone width the image
  sits under the text, with a cream fade.
- **Image delivery.** Astro `<Picture>`: AVIF and WebP at 800 and 1600 px with a JPEG fallback,
  each 250 KB or less, with explicit dimensions and empty `alt`. Source copied to `src/assets/`.
- **What we do as six icon cards.** Lucide line icons (ISC), self-hosted inline SVG, a short
  title and one line each, written from Art. 4.2 items 1 to 9 and 12. The full list stays below
  under «Όπως ορίζει το καταστατικό» / "As set out in the statute". The home page shows the six
  cards, each linking to its card on What we do.
- **Lighter header.** The logo is cropped just above its tagline. The header is sticky and
  becomes compact on scroll. The language switch is plain text «EL / EN» with the current
  language marked, top right, and repeated in the footer.
- **Warmer footer and section rhythm.** The CSSA credit moves inside the navy band, with its logo
  on a light chip. The legal line is on two short lines. Page sections alternate cream and white
  bands, and all cards share one radius and one shadow.

- **Graphics (addendum of 2026-10-29, requirements 6 to 12).**
  - A thin blue curved line motif crossing section boundaries.
  - Soft paper-cut background shapes.
  - Icons in round badges, also on the contact fields and the under-construction notes.
  - A full-width navy quote band on the home page carrying the purpose sentence.
  - A pale-blue marker behind key words in each main heading.
  - An offset blue frame behind one featured block per page.
  - Art on the under-construction notes.
  - Restraint throughout: the same few devices, palette colours and their tints only, no motion
    beyond hover.

## Impact
- Affected specs: `site-pages` (MODIFIED: content rule scenarios, brand logo; ADDED: home hero,
  areas of work, header and footer, section rhythm), `site-i18n` (MODIFIED: language switch)
- Affected code: `src/assets/`, `src/icons/`, `scripts/build-brand-assets.py`, `public/brand/`,
  `src/i18n/*`, `src/layouts/Base.astro`, `src/components/`, `src/styles/global.css`, `tests/`,
  `README.md`, `CHANGELOG.md`, `.claude/project.md`
