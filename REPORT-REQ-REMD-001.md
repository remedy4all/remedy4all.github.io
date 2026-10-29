---
request: REQ-REMD-001
outcome: complete
version: 0.1.0 (local annotated tag v0.1.0, not pushed)
commit: 7e593c3
spec_change: add-bilingual-site (archived as openspec/changes/archive/2026-10-29-add-bilingual-site; new specs site-pages, site-i18n, site-metadata, site-deployment)
requirements: {1: done, 2: done, 3: done, 4: done, 5: done, 6: done, 7: done, 8: done, 9: done, 10: done, 11: done}
tests: |
  Run once at the end, from a clean install (node_modules, dist and .astro removed), with npm ci.
  npm run check gave 0 errors, 0 warnings and 0 hints (25 files). npm run build built 8 pages,
  plus sitemap.xml and robots.txt. npm test passed 39 of 39. The tests cover the eight pages,
  html lang, nav links, the language switch landing on the counterpart page, title, description,
  og:title, og:description, favicon and canonical, sitemap URLs and robots.txt. They also check
  that there is no lorem, TBD, TODO or placeholder text, no mailto: or tel:, nothing loaded from
  another origin, no ID-card or tax-number markers or 9-digit numbers, and eleven purposes per
  language.
  npm run preview served all 8 pages, the sitemap, robots.txt, the favicon and the fonts with
  HTTP 200.
  Extra QA from a scratch directory, not in the repository: axe-core 4.14 (WCAG 2.0/2.1 A and AA
  plus best-practice) through playwright-core and the local Chrome, on all 8 pages at 1280px and
  360px. It found 0 violations, 0 horizontal overflow, and the first Tab lands on the skip link.
  It recorded no requests to any other origin. Screenshots were reviewed at both widths.
  The CSS was changed once after the clean run (header layout), so build, test, check and axe
  were run once more after it. All clean.
  The workflows parse as YAML and have not run, because nothing is pushed.
closed_out:
  spec_change: archived
  release: 0.1.0, local annotated tag v0.1.0; minor (the first release, all of it new and visitor-visible); package.json version and CHANGELOG.md entry
  tech_debt: none affected (TD-001 and TD-002 from REQ-REMD-002 are about the agent kit and remain open)
  docs: README.md (new), CHANGELOG.md (new), .claude/project.md (architecture now describes the built site; the auto-detected toolchain block was refreshed by adapt.py, and its wrong lint and typecheck guesses are corrected under Toolchain overrides)
  review: none requested
deviations: |
  - Greek at the root. Requirement 2 allowed "/" or "/el/"; the root was chosen, with English
    under /en/ and the same ASCII slugs in both languages.
  - Sitemap and robots.txt are two small Astro endpoints, not the @astrojs/sitemap integration,
    to keep dependencies to astro, @astrojs/check and typescript. The constraint allows only what
    Astro needs to build.
  - The font is Noto Sans (SIL OFL 1.1). Its woff2 files and licence were copied into
    public/fonts/ from the @fontsource-variable/noto-sans 5.3.0 package, which is not a
    dependency.
  - TypeScript is 6.x, not the newest 7.x, because @astrojs/check 0.9.12 accepts only ^5 or ^6.
    Astro is 7.4.4, which needs Node 22.23.4 or later; the workflows use Node 24.
  - The deploy workflow also runs npm test before deploying, in addition to the check and build
    the request names.
  - The placeholder organisation (org-not-yet-chosen) appears in canonical URLs, og:url, the
    sitemap and robots.txt, as derived values. It is not visible text on any page, and the tests
    assert that.
  - Translation choices to check. The Greek is the statute text lightly simplified for a general
    reader, and the English translates that Greek. «θυμάτων trafficking» is rendered «θυμάτων
    εμπορίας ανθρώπων (trafficking)» in Greek and "victims of human trafficking" in English.
    «και δη» is rendered «και ιδίως» / "in particular", to keep the list open as the statute does.
  - Items beyond the four pages' core facts, all taken from the request's Context. The about page
    also shows the full name, the distinctive title, and the statute's permission to use the name
    untranslated abroad (Art. 1.2). The footer repeats name, legal form, ΓΕΜΗ number and seat.
    The what-we-do page states the Art. 4.3 indicative clause.
  - OpenSpec commands were followed from their files with the openspec CLI, not invoked as slash
    commands (same reason as REQ-REMD-002).
incidental_fixes: |
  - none
follow_ups: |
  - Ask him for the organisation's GitHub name, which replaces GITHUB_ORG in site.config.mjs. Reserved to him; REQ-REMD-003 is expected to supply it.
  - Ask him for the contact details, logo, CSSA credit and any activities beyond the statute. Reserved to him; REQ-REMD-003 covers logo, CSSA and contact fields.
  - Have a native Greek reader review the Greek simplification of the Art. 4.2 purposes, and the English translation, before the site is published.
---

# REQ-REMD-001 completion report

The bilingual site is built, tested and committed locally as 0.1.0. There is no remote and
nothing has been pushed.
