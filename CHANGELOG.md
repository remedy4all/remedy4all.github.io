# Changelog

All notable changes to the site. Versions follow [Semantic Versioning](https://semver.org/); each
release is tagged `vX.Y.Z`.

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
