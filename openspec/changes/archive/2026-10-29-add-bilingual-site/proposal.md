# Change: Build the first version of the bilingual Remedy for All website (REQ-REMD-001)

## Why
ΑΜΚΕ «REMEDY FOR ALL» has no web presence. A partner, a funder or a person seeking help cannot
find it or check that it exists and what it is for, and its funding applications are weaker for it.

## What Changes
- An Astro static site built with npm (`npm run check`, `npm run build`), same approach as the
  CYCLOS site.
- Greek at `/`, English at `/en/`. Four pages per language: home, about, what we do, contact. A
  language switch on every page leads to the counterpart page.
- Content only from the request's Context (the statute): purpose sentence (Art. 4.1), legal
  identity, the purposes of Art. 4.2 items 1 to 9, 11 and 12, and a contact page saying details
  will be published soon.
- The organisation's GitHub name in one configuration value (`site.config.mjs`), a clearly marked
  placeholder until he chooses it, from which the `site` URL is derived.
- Text wordmark, self-hosted open-licensed font with Greek glyphs, accessible responsive design.
- Metadata per page (title, description, Open Graph, canonical, hreflang), wordmark favicon,
  `sitemap.xml` and `robots.txt`.
- GitHub Actions deploy workflow (official Pages actions) on push to `main`. Not run, because
  nothing is pushed.
- Build-output tests (`npm test`, the Node built-in runner, no dependency) that enforce the content
  and privacy rules. The CI gates job, dormant since REQ-REMD-002, is switched on.
- `README.md`, `CHANGELOG.md`, release `0.1.0`.

## Impact
- Affected specs: `site-pages`, `site-i18n`, `site-metadata`, `site-deployment` (all new)
- Affected code: `package.json`, `astro.config.mjs`, `site.config.mjs`, `src/`, `public/`,
  `tests/`, `.github/workflows/`, `README.md`, `CHANGELOG.md`, `.claude/project.md`
