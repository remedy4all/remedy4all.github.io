# Change: Apply the brand, the CSSA supporter credit and placeholder contact fields; set the site URL (REQ-REMD-003)

## Why
The 0.1.0 site has no visual identity, does not credit CSSA, has nowhere to put contact details
when they arrive, and its `site` URL is a placeholder. He has decided all four (2026-10-29): the
organisation is `remedy4all`, the logo is Stereotropism's Proposal 4, CSSA is credited as a
supporting entity, and contact details are placeholders for now.

## What Changes
- Header shows the Proposal 4 light logo (linked to the current language's home page, accessible
  name «Remedy for All»), replacing the text wordmark. The footer is a navy band carrying the dark
  logo variant.
- Favicon (PNG, ICO, Apple touch icon) and Open Graph image derived from the logo artwork.
- Proposal 4 palette applied site-wide; body text and links meet WCAG 2.1 AA (4.5:1). The blue is
  used only for non-text accents.
- Footer supporter credit on every page: «Με την υποστήριξη της» / «Supported by», CSSA's logo
  and the name «Computer Solutions S.A.», linking to `https://www.csl.gr`.
- Contact email, phone and postal address as named values in `site.config.mjs`, with obvious
  placeholder values. A placeholder is never rendered: its field shows «Σύντομα διαθέσιμο» /
  «Coming soon», with no `mailto:` or `tel:` link.
- `GITHUB_ORG = "remedy4all"`, so `site` is `https://remedy4all.github.io`.
- Brand source files copied into `brand/`; derived web assets in `public/brand/`.

## Impact
- Affected specs: `site-pages` (MODIFIED: content rule, design; ADDED: logo, palette, supporter
  credit, contact fields), `site-metadata` (MODIFIED: metadata, organisation setting)
- Affected code: `site.config.mjs`, `src/layouts/Base.astro`, `src/components/Header.astro`,
  `src/components/Footer.astro`, `src/components/pages/ContactPage.astro`, `src/lib/contact.ts`,
  `src/i18n/*`, `src/styles/global.css`, `public/`, `brand/`, `scripts/`, `tests/`, `README.md`,
  `CHANGELOG.md`
