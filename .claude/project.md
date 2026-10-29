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
**Type:** Unknown
**Package manager:** n/a

| Task | Command |
|------|---------|
| Test | `(configure in Toolchain overrides)` |
| Lint | `(configure in Toolchain overrides)` |
| Type check | `(configure in Toolchain overrides)` |
| Build | `(configure in Toolchain overrides)` |

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
- **Status:** the site itself is built by REQ-REMD-001. Until then this repository holds only the
  agent kit, OpenSpec and CI.
- **Hosting:** GitHub Pages, deployed by GitHub Actions on push to `main`. The repository is meant
  to be the organisation's user-site repository, `<org>/<org>.github.io`, served at the root with
  no base path.
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
- **CSSA:** Computer Solutions S.A., which builds and maintains the site.
- **SAI:** the management session that issues request packs (`REQ-REMD-NNN`) and checks the build.
- **Agent kit:** AI Coding Infrastructure (`.claude/`), version in `.claude/VERSION`.

### Toolchain overrides

These take precedence over the auto-detected block above. All commands run from the repository
root, after `npm ci`.

- Install: `npm ci`
- Dev server: `npm run dev`
- Type check: `npm run check` (`astro check`: TypeScript and Astro template diagnostics)
- Lint: `npm run check`. There is no separate linter; `astro check` is the lint gate.
- Test: `npm test` (runs the build-output tests against `dist/`; needs `npm run build` first)
- Build: `npm run build` (static output in `dist/`)
- Preview: `npm run preview`
- Kit hook tests: `uv run --script .claude/hooks/test_block_ai_attribution.py`
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
   partner logos or contact details that a request did not supply.
3. **No third-party requests from visitors' browsers.** No external scripts, trackers, analytics,
   cookies, embedded content or CDN-hosted fonts. Fonts are self-hosted. Nothing is loaded from
   another origin.
4. **No placeholder contact data rendered**, and no `mailto:` or `tel:` link until a real value is
   supplied.
5. **CI least privilege.** Workflows use the minimum `permissions`; only the Pages deploy job gets
   `pages: write` and `id-token: write`. Official actions only.
6. **No secrets.** The site needs none; none are committed or referenced.
7. **Minimal dependencies.** Nothing beyond what Astro needs to build and type-check.
