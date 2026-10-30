## 1. Collections
- [x] 1.1 `src/content.config.ts`: `actions` and `news` (glob loader, schema title, date, language, summary), `CONTENT_ROOT` override for tests
- [x] 1.2 `src/content/actions/` and `src/content/news/` exist with no entries
- [x] 1.3 `src/lib/entries.ts`: entries of a language, newest first; entry path helper

## 2. Pages
- [x] 2.1 i18n: page keys `actions`, `news`; labels «Δράσεις» / "Actions", «Νέα» / "News"; under-construction wording; home card text
- [x] 2.2 `SectionLanding` component (list or under-construction statement) and four landing routes
- [x] 2.3 Entry page component and four dynamic entry routes (none built while empty)
- [x] 2.4 Base layout accepts an entry's title, description and path; nav order home, about, what we do, actions, news, contact
- [x] 2.5 Home page cards for Actions and News marked under construction
- [x] 2.6 Sitemap: twelve pages plus entry pages

## 3. Tests
- [x] 3.1 Update `tests/site.test.mjs` for twelve pages, nav order, under-construction statement, no items or dates
- [x] 3.2 `tests/sections.test.mjs`: fixture build (`tests/fixtures/content/`, temp outDir) pins the populated state; shipped build pins the empty state
- [x] 3.3 axe on all twelve pages at 1280 px and 360 px

## 4. Docs and release
- [x] 4.1 README and `.claude/project.md`: sections, collections, how to add an entry
- [x] 4.2 `CHANGELOG.md` 0.3.0, `package.json` version
- [x] 4.3 Gates once at the end from a clean `npm ci`

## 5. Close
- [x] 5.1 Archive the change, commit, tag `v0.3.0`
