# Project Profile

> The single source of project-specific facts that the toolkit's **generic
> core** reads. Copied to `.claude/project.md` on first bootstrap and preserved
> across core updates.
>
> - The block between the `CORE:AUTODETECT` markers is **auto-generated** by
>   `adapt.py` / `/adapt`. Do not edit it by hand — it is regenerated on every
>   run.
> - Everything under **Project-specific notes** is yours. It is never
>   regenerated and never overwritten by `install.py`.

<!-- CORE:AUTODETECT:START -->
**Project:** remedy-for-all-web
**Type:** Node.js
**Package manager:** npm

| Task | Command |
|------|---------|
| Test | `npm test` |
| Lint | `npm run lint` |
| Type check | `npm run typecheck` |
| Build | `npm run build` |

_Auto-detected 2026-10-29. Override any wrong value under "Toolchain overrides" below._
<!-- CORE:AUTODETECT:END -->

## Project-specific notes

Agents read this file first for project specifics. The free-form sections below are owned by the
project and survive `adapt` reruns and kit updates.

### Architecture

- **What it is:** the public website of ΑΜΚΕ «REMEDY FOR ALL», a small Greek non-profit civil
  company. Static, bilingual: Greek primary, English second. No backend, no database, no forms.
- **Stack:** Astro static site generator, npm, TypeScript (strict). Same approach as the CYCLOS
  project site CSSA maintains.
- **Pages:** home, about, what we do, contact, in Greek at `/` and English at `/en/`
  (`trailingSlash: "always"`). Shared slugs, so the language switch swaps the `/en` prefix.
- **Layout of the code:** all text in `src/i18n/el.ts` and `src/i18n/en.ts` (typed by
  `src/i18n/types.ts`, so a missing translation fails the type check); page bodies in
  `src/components/pages/`; thin route files in `src/pages/` and `src/pages/en/`; head metadata,
  header and footer in `src/layouts/Base.astro` and `src/components/`; all CSS in
  `src/styles/global.css`; `sitemap.xml` and `robots.txt` as endpoints in `src/pages/`.
- **Settings, one file:** `site.config.mjs` holds `GITHUB_ORG = "remedy4all"`, from which `SITE_URL`
  (`https://remedy4all.github.io`) is derived and fed to `astro.config.mjs`, canonicals, og:image,
  sitemap and robots; and `CONTACT` (email, phone, address). A value starting `__PLACEHOLDER` is
  never rendered: `src/lib/contact.ts` shows «Σύντομα διαθέσιμο» / «Coming soon» instead and no link.
- **Brand:** Stereotropism Proposal 4. Sources in `brand/source/`; the logo there is an embedded
  raster, not vectors. `scripts/build-brand-assets.py` derives `public/brand/*`, the favicons and
  the OG image without altering the artwork. The light logo must sit on `--cream` `#F6F7F0` and the
  dark one on `--navy-band` `#2E3A59`, their baked-in backgrounds, or the image edge shows.
- **Palette roles:** navy `#2D3A5A` for text and links; `#5A6676` (darkened slate) for secondary
  text; slate `#6D7A8A` for borders only; blue `#3FA9F7` for non-text accents only (it fails 4.5:1).
- **Footer:** navy band (dark logo, legal line), then a white strip with the CSSA supporter credit
  (link to https://www.csl.gr). No other claim about CSSA.
- **Font:** Noto Sans variable, self-hosted in `public/fonts/` (OFL 1.1), latin and greek subsets.
- **Tests:** `tests/site.test.mjs`, Node's built-in runner, run against `dist/` after a build.
- **Workflows:** `.github/workflows/ci.yml` (gates on every push and PR) and
  `.github/workflows/deploy.yml` (gates, then deploy to Pages on push to `main`).
- **Hosting:** GitHub Pages, deployed by GitHub Actions on push to `main`. Organisation
  `remedy4all`, repository `remedy4all/remedy4all.github.io`, served at
  `https://remedy4all.github.io/` with no base path.
- **Specification:** OpenSpec, in `openspec/`. `openspec/specs/` is what is built;
  `openspec/changes/` is what is planned.

### Conventions

- **Branch:** `main` only. **Never push or add a remote** without his instruction: SAI checks the
  local build before anything is published.
- **Work order per request:** analyse, write the OpenSpec change (`/openspec:proposal`, validate
  with `openspec validate <id> --strict`), implement through `tasks.md` (`/openspec:apply`),
  archive (`/openspec:archive`), release.
- **Commits:** imperative subject, a body that says why. **No AI attribution of any kind** (hook
  enforced). Small incidental fixes go in their own commit.
- **Releases:** version in `package.json`, a `CHANGELOG.md` entry, and an annotated local tag
  `vX.Y.Z`. Minor for visitor-visible additions or changes, patch for repairs.
- **Content rule:** the only source of facts about the organisation is its statute and what a
  request explicitly supplies. A section with no supplied content is omitted, never filled.
- **Language:** Greek is written first; English translates it and does not improve on it.
- **Definition of done:** the gates below pass, the OpenSpec change is archived, docs updated,
  release cut, completion report written.

### Domain / glossary

- **ΑΜΚΕ** (Αστική Μη Κερδοσκοπική Εταιρία): non-profit civil company, Greek Civil Code Art. 61 ff.
  and 741 ff.
- **Statute** (Καταστατικό): the founding document, consolidated 3/7/2025. Article 4 (Σκοποί) lists
  the purposes, indicatively and not exhaustively. It also contains members' personal data, which
  is never published.
- **ΓΕΜΗ:** the Greek General Commercial Registry. Registration number 174746001000.
- **CSSA:** Computer Solutions S.A., which builds and maintains the site and is credited in the
  footer as a supporting entity.
- **Stereotropism:** the designer of the logo proposals; Proposal 4 was chosen.
- **SAI:** the management session that issues request packs (`REQ-REMD-NNN`) and checks the build.
- **Agent kit:** AI Coding Infrastructure (`.claude/`), version in `.claude/VERSION`.

### Toolchain overrides

These take precedence over the auto-detected block above. All commands run from the repository
root, after `npm ci`.

- Install: `npm ci`
- Dev server: `npm run dev`
- Type check: `npm run check` (`astro check`: TypeScript and Astro template diagnostics)
- Lint: `npm run check`. There is no separate linter; `astro check` is the lint gate.
- Test: `npm test` (contact-rule unit tests, and build-output tests against `dist/`; needs `npm run build` first)
- Build: `npm run build` (static output in `dist/`)
- Preview: `npm run preview`
- Kit hook tests: `uv run --script .claude/hooks/test_block_ai_attribution.py`
- Brand assets: `uv run --script scripts/build-brand-assets.py` (only when `brand/source/` changes)
- Spec: `openspec validate --strict`
- CI gates, in order: `npm ci`, `npm run check`, `npm run build`, `npm test`. `npm audit` is reported
  and does not block.

### Security expectations

What must not break in this application. The security review (`/agents:security`, the
`security-engineer` agent, `/review-full` L3) checks these first.

1. **No personal data.** The statute carries members' ID card numbers, tax numbers (ΑΦΜ) and home
   addresses. None of it appears anywhere in the repository or the built site, including commit
   messages, fixtures and OpenSpec files. No member names on the site.
2. **No invented facts.** No activities, figures, beneficiaries, testimonials, team members,
   partner logos or contact details that a request did not supply. The CSSA credit says only
   what REQ-REMD-003 supplied.
3. **No third-party requests from visitors' browsers.** No external scripts, trackers, analytics,
   cookies, embedded content or CDN-hosted fonts. Fonts are self-hosted. Nothing is loaded from
   another origin.
4. **No placeholder contact data rendered**, and no `mailto:` or `tel:` link until a real value is
   supplied.
5. **CI least privilege.** Workflows use the minimum `permissions`; only the Pages deploy job gets
   `pages: write` and `id-token: write`. Official actions only.
6. **No secrets.** The site needs none; none are committed or referenced.
7. **Minimal dependencies.** Nothing beyond what Astro needs to build and type-check.
