# Remedy for All website

The public website of ΑΜΚΕ «REMEDY FOR ALL», a Greek non-profit civil company. It is a static,
bilingual site: Greek at `/`, English at `/en/`. It has four pages per language (home, about, what
we do, contact), and no backend, forms, analytics or third-party content.

Built with [Astro](https://astro.build) and npm, deployed to GitHub Pages by GitHub Actions.

## Where the site lives: the one setting

The GitHub organisation is set in **one place**, [`site.config.mjs`](site.config.mjs):

```js
export const GITHUB_ORG = "org-not-yet-chosen"; // PLACEHOLDER
```

The site URL is derived from it as `https://<org>.github.io`, and the canonical URLs, `sitemap.xml`
and `robots.txt` all use it. **The value is a placeholder** until the organisation's name is
chosen. Replace it, rebuild, and nothing else needs to change. The repository is meant to be the
organisation's user-site repository, `<org>/<org>.github.io`, so the site is served at the root
with no base path.

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
| `src/components/pages/` | The four page bodies, shared by both languages |
| `src/pages/`, `src/pages/en/` | Routes: one thin file per page and language |
| `src/layouts/Base.astro` | Head metadata, header, footer |
| `src/styles/global.css` | All styles, and the self-hosted font |
| `public/fonts/` | Noto Sans, SIL Open Font License 1.1 (`OFL.txt`) |
| `tests/site.test.mjs` | Checks the built pages: languages, navigation, metadata, and the content rules |
| `openspec/` | The specification (OpenSpec) |

## Content rules

The only source of facts about the organisation is its statute, plus whatever a request explicitly
supplies. Nothing is invented, no section is filled with stand-in text, and no personal data of any
member is published. See `.claude/project.md` for the full list.

## Changes

See [CHANGELOG.md](CHANGELOG.md).
