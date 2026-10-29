## 1. Brand assets
- [x] 1.1 Copy the brand source files into `brand/source/`
- [x] 1.2 `scripts/build-brand-assets.py`: extract the embedded logo PNGs, crop to the artwork, write `public/brand/remedy-logo-light.png` and `-dark.png`, copy CSSA's logo, derive favicons and the OG image
- [x] 1.3 Check the crops visually against the preview PNGs: no page fragments, nothing redrawn

## 2. Configuration
- [x] 2.1 `site.config.mjs`: `GITHUB_ORG = "remedy4all"`; `CONTACT` with placeholder email, phone, address
- [x] 2.2 `src/lib/contact.ts`: placeholder detection and per-field rendering (text, href)
- [x] 2.3 `tests/contact.test.mjs`: placeholder → coming soon, no href; real email → mailto; real phone → tel; real address → text

## 3. Pages
- [x] 3.1 Header: light logo replacing the text wordmark, linked to the language's home, named «Remedy for All», sized for phone and desktop
- [x] 3.2 Footer: navy band with the dark logo and legal line; white strip with the CSSA supporter credit
- [x] 3.3 Contact page: three fields from configuration, «Σύντομα διαθέσιμο» / «Coming soon» for placeholders
- [x] 3.4 Palette: CSS tokens and roles per design.md
- [x] 3.5 Metadata: PNG/ICO favicons, Apple touch icon, `og:image` with alt

## 4. Tests and checks
- [x] 4.1 Extend `tests/site.test.mjs`: logo in header and footer, credit in each language with the link, no placeholder value, no mailto/tel, og:image, site URL `https://remedy4all.github.io`
- [x] 4.2 axe (WCAG 2.1 AA) on all eight pages at desktop and phone width: no colour-contrast violations; visual check of the logo at both widths

## 5. Docs and release
- [x] 5.1 README: organisation and site URL, contact settings, brand assets and how to regenerate them
- [x] 5.2 `.claude/project.md`: brand, palette roles, the matching-surface rule, contact settings
- [x] 5.3 `CHANGELOG.md` 0.2.0, `package.json` version
- [x] 5.4 Gates once at the end from a clean `npm ci`: check, build, test

## 6. Close
- [x] 6.1 Archive the change, commit, tag `v0.2.0`
