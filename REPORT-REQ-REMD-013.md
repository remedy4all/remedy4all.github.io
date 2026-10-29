---
request: REQ-REMD-013
outcome: complete
version: 0.3.0 (local annotated tag v0.3.0, not pushed)
commit: d78446b
spec_change: add-actions-news-sections (archived as openspec/changes/archive/2026-10-29-add-actions-news-sections; site-pages requirement renamed to "Pages per language" and modified, two requirements added; site-metadata sitemap requirement modified)
requirements: {1: done, 2: done, 3: done, 4: done, 5: done, 6: done}
tests: |
  Run once at the end, from a clean install (node_modules, dist and .astro removed), with npm ci.
  npm run check gave 0 errors, 0 warnings and 0 hints. npm run build built 12 pages. npm test
  passed 84 of 84.
  New tests on the shipped build (the empty state): exactly twelve HTML files in dist; the nav
  links appear in the order home, about, what we do, actions, news, contact on every page; each
  of the four landing pages' main content is exactly its heading plus the under-construction
  statement; no page has a time element or an entries list; the home cards for Actions and News
  read "Under construction."; the language switch lands on the counterpart on all 12 pages;
  sitemap.xml has the 12 URLs.
  New tests/sections.test.mjs (the populated state): builds the site with
  CONTENT_ROOT=tests/fixtures/content into node_modules/.astro-fixture/, with a separate content
  cache, and checks: newest-first listing with links and dates; per-language filtering; an entry
  page exists only in its own language; entry title, canonical, and a switch that leads to the
  counterpart section; a section with no entries in one language still shows the statement; the
  home card mark is dropped only where entries exist; entry URLs are in the sitemap.
  Mutation check. With the sort reversed, the fixture tests failed (1 failed); after restoring,
  they passed.
  Leak check. A normal build run after the fixture build contained no fixture text. The clean
  dist has no FIXTURE text, time element, mailto:, tel: or __PLACEHOLDER.
  axe-core 4.14 (WCAG 2.0/2.1 A and AA plus best-practice) through playwright-core and the local
  Chrome on all 12 pages at 1280px and 360px: 0 violations, no horizontal overflow, the skip link
  is the first Tab stop, and no requests went to another origin. Screenshots were reviewed; the
  six-item navigation wraps to two rows at 360px and stays usable.
closed_out:
  spec_change: archived
  release: 0.3.0, local annotated tag v0.3.0; minor, because it adds visitor-visible sections and repairs nothing
  tech_debt: none affected
  docs: README.md (six pages, an Actions and News section with how to add an entry, the file map), .claude/project.md (pages and nav order, collections, test command), CHANGELOG.md (0.3.0)
  review: none requested
deviations: |
  - Fixture switch in production code. The fixture test needs the real loader, schema and routes,
    so src/content.config.ts reads an optional CONTENT_ROOT environment variable, which only the
    test sets. When it is set, astro.config.mjs also moves Astro's cache to
    node_modules/.astro-fixture, so fixture entries cannot reach a real build through the shared
    content cache. A leak check confirmed this.
  - The fixture build writes into node_modules/.astro-fixture/ instead of the system temp
    directory, because Astro moves files with rename and the temp directory (C:) is on a different
    drive from the repository (D:). The directory is gitignored and removed after the test.
  - Entry pages have no hreflang alternates. An entry exists in one language only, so its language
    switch leads to the other language's section landing page.
  - The home cards for Actions and News switch back to their ordinary descriptions («Οι δράσεις
    της εταιρίας.» / "The company's actions.", and the news equivalents) once a section has
    entries in that language. Those descriptions are never shown while the sections are empty.
  - While the collections are empty, every build logs Astro's warning "The collection ... does not
    exist or is empty". It is expected, harmless and documented in the README. Astro gives no
    option to silence it per collection, and it stops once the first entry exists.
  - The entry date shown is the frontmatter date, formatted in the page's locale (el-GR, en-GB) in
    UTC.
  - OpenSpec commands were followed from their files with the openspec CLI, not invoked as slash
    commands (same reason as before).
incidental_fixes: |
  - none
follow_ups: |
  - Ask him whether «Δράσεις» is the right label. The request reserves that wording to him, and it stands until he says otherwise.
---

# REQ-REMD-013 completion report

Actions and News are live in both languages as under-construction sections, backed by empty
content collections ready for entries. Release 0.3.0 is committed and tagged locally. There is no
remote and nothing has been pushed.
