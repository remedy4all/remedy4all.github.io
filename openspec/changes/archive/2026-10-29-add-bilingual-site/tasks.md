## 1. Scaffold
- [x] 1.1 `package.json` (version 0.1.0; scripts dev, check, build, preview, test); install `astro`, `@astrojs/check`, `typescript`
- [x] 1.2 `site.config.mjs` with the placeholder `GITHUB_ORG` and derived `SITE_URL`; `astro.config.mjs` with i18n (el default, unprefixed; en) and `trailingSlash: "always"`
- [x] 1.3 `tsconfig.json` (strict)

## 2. Content and i18n
- [x] 2.1 `src/i18n/` dictionaries (el, en) with a shared type; helpers for paths and the counterpart URL
- [x] 2.2 Greek text from the statute: purpose sentence, legal identity, purposes 1 to 9, 11, 12, contact notice
- [x] 2.3 English translation of the Greek

## 3. Layout and pages
- [x] 3.1 Self-host Noto Sans (latin, latin-ext, greek woff2 and the OFL licence) in `public/fonts/`
- [x] 3.2 Base layout: metadata, canonical, hreflang, favicon, skip link, header with wordmark, nav and language switch, footer
- [x] 3.3 Global styles: typography, contrast, focus, responsive
- [x] 3.4 Four page components and eight route files
- [x] 3.5 Wordmark favicon (`public/favicon.svg`)
- [x] 3.6 `sitemap.xml` and `robots.txt` endpoints

## 4. Tests and CI
- [x] 4.1 `tests/site.test.mjs` (node:test) covering pages, lang, nav, switch, metadata, sitemap, robots, placeholders, mailto/tel, external resources, personal-data markers, purposes count
- [x] 4.2 `.github/workflows/deploy.yml`: on push to `main`, check, build, deploy with the official Pages actions
- [x] 4.3 Switch on the CI gates job (remove the lockfile guard)

## 5. Docs and release
- [x] 5.1 `README.md`: run, build, test, deploy, where the configuration value is
- [x] 5.2 Update `.claude/project.md` architecture to the built site
- [x] 5.3 `CHANGELOG.md` with 0.1.0
- [x] 5.4 Full gates once at the end from a clean `npm ci`: check, build, test; preview serves eight pages

## 6. Close
- [x] 6.1 Archive the change, commit, tag `v0.1.0`
