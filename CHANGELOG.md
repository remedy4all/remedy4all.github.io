# Changelog

All notable changes to the site. Versions follow [Semantic Versioning](https://semver.org/); each
release is tagged `vX.Y.Z`.

## [0.6.0] - 2026-10-30

Contact email (REQ-REMD-021).

### Changed
- The contact pages show the email remedy4all@csl.gr as a `mailto:` link.
- Phone and postal address are no longer listed while they have no value: no label and no
  «Σύντομα διαθέσιμο» / "Coming soon". Each row appears once its value is set in `site.config.mjs`.

## [0.5.0] - 2026-10-29

Spot illustrations (REQ-REMD-016).

### Added
- His seven spot illustrations: one on each of the six area cards (What we do and the home page),
  and one on the Actions and News under-construction notes in both languages. Background keyed
  to transparency, served as AVIF and WebP at 300 and 600 px. A missing image falls back to the
  badge icon.
- `scripts/build-spot-illustrations.py`, rerun whenever a source illustration is replaced.

## [0.4.0] - 2026-10-29

Design pass (REQ-REMD-014, including its graphics addendum).

### Added
- Home hero with his illustration: the headline «Προστατεύουμε και στηρίζουμε ευάλωτες ομάδες του
  πληθυσμού.» / "We protect and support vulnerable groups.", «Together in Support» as text, and a
  link to the areas of work. AVIF and WebP at 800 and 1600 px, with a JPEG fallback.
- Six icon cards for the areas of work, written from the statute, on What we do (above the full
  statutory list, now under «Όπως ορίζει το καταστατικό» / "As set out in the statute") and on
  the home page.
- A navy quote band on the home page carrying the purpose sentence.
- Graphic devices throughout: a thin blue line motif crossing section boundaries, paper-cut
  background shapes, round icon badges (also on the contact fields and the under-construction
  notes), a pale-blue marker in each main heading, and an offset blue frame on one block per page.

### Changed
- The header is lighter and sticky, compacting on scroll, with the logo cropped above its tagline.
  The language switch is plain text «EL / EN» with the current language marked, top right and
  again in the footer.
- The footer is a single navy band, holding the legal line on two lines and the CSSA credit (logo
  on a light chip).
- Page sections alternate cream and white bands, and all cards share one radius and shadow.
- The large «REMEDY FOR ALL» heading on the home page is replaced by the hero.

## [0.3.0] - 2026-10-29

Actions and News sections (REQ-REMD-013).

### Added
- «Δράσεις» / "Actions" and «Νέα» / "News" in both languages, in the navigation between "What we
  do" and "Contact", with landing pages at `/actions/`, `/news/`, `/en/actions/` and `/en/news/`.
  Both are under construction: each shows «Η ενότητα είναι υπό κατασκευή» / "This section is
  under construction", and the home page marks them so.
- `actions` and `news` content collections, empty. Adding a Markdown file publishes an entry with
  its own page, listed newest first.

## [0.2.0] - 2026-10-29

Brand, supporter credit, contact fields and site URL (REQ-REMD-003).

### Added
- Stereotropism Proposal 4 logo: the light variant in the header, the dark variant on a navy
  footer band. Favicons and the Open Graph image are derived from it.
- Footer supporter credit on every page: «Με την υποστήριξη της» / «Supported by» Computer
  Solutions S.A., with its logo, linking to https://www.csl.gr.
- Contact page fields (email, phone, postal address) set in `site.config.mjs`. Each shows
  «Σύντομα διαθέσιμο» / «Coming soon» while its value is a placeholder.

### Changed
- The site is `https://remedy4all.github.io` (organisation `remedy4all`).
- Proposal 4 palette site-wide, with body text and links at WCAG 2.1 AA contrast.
- The text wordmark and its SVG favicon are replaced by the logo and derived PNG/ICO icons.
- The contact page's general "details will be published soon" sentence is replaced by the
  per-field «Coming soon».

## [0.1.0] - 2026-10-29

First version (REQ-REMD-001).

### Added
- Bilingual static site: Greek at `/`, English at `/en/`, with a language switch on every page
  that leads to the same page in the other language.
- Four pages per language: home (name and purpose, Art. 4.1 of the statute), about (legal identity),
  what we do (the purposes of Art. 4.2) and contact (details to be published).
- Text wordmark, self-hosted Noto Sans with Greek glyphs, responsive and keyboard-accessible layout.
- Page metadata (title, description, Open Graph, canonical, hreflang), favicon, `sitemap.xml`,
  `robots.txt`.
- The organisation's GitHub name in one setting, `site.config.mjs` (a placeholder for now).
- Build-output tests (`npm test`), CI gates, and a GitHub Pages deploy workflow.
