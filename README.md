# Remedy for All website

The public website of ΑΜΚΕ «REMEDY FOR ALL», a Greek non-profit civil company. It is a static,
bilingual site: Greek at `/`, English at `/en/`. It has six pages per language (home, about, what
we do, actions, news, contact), and no backend, forms, analytics or third-party content.

Built with [Astro](https://astro.build) and npm, deployed to GitHub Pages by GitHub Actions.

## Settings: one file

All site settings live in [`site.config.mjs`](site.config.mjs).

**Where the site lives.** The GitHub organisation is **`remedy4all`**
(<https://github.com/remedy4all>), so the repository is `remedy4all/remedy4all.github.io` and the
site is served at **<https://remedy4all.github.io>**, at the root with no base path:

```js
export const GITHUB_ORG = "remedy4all";
```

The site URL is derived from it, and the canonical URLs, `og:image`, `sitemap.xml` and
`robots.txt` all use it. A custom domain would change only this derivation.

**Contact details.** Email, phone and postal address are the `CONTACT` values in the same file.
While a value still starts with `__PLACEHOLDER`, the contact page shows «Σύντομα διαθέσιμο» /
«Coming soon» for that field, and the placeholder is never rendered or linked. To publish one,
replace its placeholder with the real value and rebuild: an email becomes a `mailto:` link, a
phone a `tel:` link, and an address plain text.

## Design

- **Hero image.** `src/assets/hero-banner.jpg` (3168 x 1344, supplied by him). Astro's `<Picture>`
  serves it as AVIF and WebP at 800 and 1600 px, with a JPEG fallback, each file well under
  250 KB (a test enforces the limit). It is decorative (`alt=""`). The headline sits on the
  image's plain cream left part on wide screens; below 48rem the image follows the text, faded in
  from cream.
- **Icons.** [Lucide](https://lucide.dev) 1.64.0, **ISC licence** (`src/icons/LICENSE`). The
  SVGs used are copied into `src/icons/` and inlined by `src/components/Icon.astro`, so nothing is
  fetched from another site.
- **Graphic devices**, the same few everywhere, all `aria-hidden`:
  - `Motif.astro`: a thin blue line motif crossing section boundaries.
  - `Shape.astro`: paper-cut background shapes.
  - Round icon badges.
  - The home page's navy quote band.
  - `MarkedText.astro`: a pale-blue marker behind words written `[like this]` in a heading string.
  - `.framed`: an offset blue frame.
- **Cards** share one radius and one shadow (`--radius`, `--shadow` in `src/styles/global.css`).
  Each card's `.card-media` slot holds a badge now and can take a spot illustration later.

## Actions and News

Both sections are content collections defined in `src/content.config.ts`, one Markdown file per
entry in `src/content/actions/` or `src/content/news/`. **Both are empty**, so each landing page
shows «Η ενότητα είναι υπό κατασκευή» / "This section is under construction", and the home page
marks them as under construction. To publish an entry, add a file. For example,
`src/content/news/first-meeting.md`:

```markdown
---
title: "Title of the item"
date: 2026-11-15
language: el          # el or en; the entry appears only in that language
summary: "One or two sentences for the list."
---

The body, in Markdown.
```

Rebuilding then lists the section's entries newest first on its landing page, gives each entry its
own page (`/news/first-meeting/`, or under `/en/` for English), and adds it to the sitemap. While a
collection is empty, the build logs Astro's "collection does not exist or is empty" warning. It is
expected and harmless. `tests/fixtures/content/` holds test-only entries that are never shipped.

## Brand

The logo is Stereotropism's Proposal 4. The source files are in `brand/source/`. In those SVGs
the logo is an **embedded raster image**, not vector paths, with its background colour baked in.
[`scripts/build-brand-assets.py`](scripts/build-brand-assets.py) extracts it and crops it to the
artwork without changing any pixel. It also derives the favicons and the Open Graph image, and
copies CSSA's logo:

```bash
uv run --script scripts/build-brand-assets.py   # writes public/brand/, public/favicon*, public/apple-touch-icon.png
```

The light logo sits on cream `#F6F7F0` (header and page) and the dark logo on navy `#2E3A59`
(footer band). Those are the logos' own background colours, so the image edges never show. Change
those surfaces only together with the logo files. The palette roles and contrast ratios are
documented at the top of `src/styles/global.css`.

## Run it

Requires Node.js 22.23.4 or later (24 recommended) and npm.

```bash
npm ci            # install exactly what package-lock.json pins
npm run dev       # development server at http://localhost:4321/
npm run check     # type check (astro check)
npm run build     # static site into dist/
npm test          # tests on the built site (run the build first)
npm run preview   # serve dist/ locally
```

## Deploy

Pushing to `main` publishes the site. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
type-checks, builds, tests and deploys `dist/` with the official GitHub Pages actions. In the
repository's settings, set **Pages → Source** to **GitHub Actions**.
[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs the same gates on every push and pull
request.

## Where things are

| Path | What |
|---|---|
| `src/i18n/el.ts`, `src/i18n/en.ts` | All page text. Greek first; English translates it |
| `src/components/pages/` | The page bodies, shared by both languages |
| `src/components/` | Header, footer, language switch, icon, motif, shape, marker, under-construction note |
| `src/assets/hero-banner.jpg` | Hero illustration source, optimised at build time |
| `src/icons/` | Lucide icons (ISC), self-hosted |
| `src/content.config.ts`, `src/content/` | The actions and news collections (empty) |
| `src/lib/entries.ts` | A section's entries in one language, newest first |
| `src/pages/`, `src/pages/en/` | Routes: one thin file per page and language |
| `src/layouts/Base.astro` | Head metadata, header, footer |
| `src/styles/global.css` | All styles, and the self-hosted font |
| `public/fonts/` | Noto Sans, SIL Open Font License 1.1 (`OFL.txt`) |
| `public/brand/` | Logos (light, dark, CSSA) and the Open Graph image, generated from `brand/source/` |
| `src/lib/contact.ts` | How a contact value is shown, and never shown while it is a placeholder |
| `tests/site.test.mjs` | Checks the built pages: languages, navigation, metadata, brand, credit, and the content rules |
| `tests/contact.test.mjs` | Unit tests of the contact-field rules |
| `tests/sections.test.mjs`, `tests/fixtures/` | Builds against fixture entries to pin the populated actions and news state |
| `openspec/` | The specification (OpenSpec) |

## Content rules

The only source of facts about the organisation is its statute, plus whatever a request explicitly
supplies. Nothing is invented, no section is filled with stand-in text, and no personal data of any
member is published. See `.claude/project.md` for the full list.

## Changes

See [CHANGELOG.md](CHANGELOG.md).
