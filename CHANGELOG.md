# Changelog

All notable changes to the site. Versions follow [Semantic Versioning](https://semver.org/); each
release is tagged `vX.Y.Z`.

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
