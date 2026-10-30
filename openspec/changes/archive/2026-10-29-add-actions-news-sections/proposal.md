# Change: Add Actions and News sections, both under construction (REQ-REMD-013)

## Why
Visitors cannot see that the organisation intends to report its actions and news. And when the
first item arrives there is nowhere to put it, so adding one would mean a structural change rather
than adding a file.

## What Changes
- Two new sections in both languages, «Δράσεις» / "Actions" and «Νέα» / "News". Navigation order
  becomes home, about, what we do, actions, news, contact.
- Landing pages `/actions/`, `/news/`, `/en/actions/`, `/en/news/`. While a section has no entries
  in the page's language, its landing page shows only its heading and «Η ενότητα είναι υπό
  κατασκευή» / "This section is under construction", from one shared component.
- Two content collections, `actions` and `news` (`src/content.config.ts`), with the schema title,
  date, language, summary and Markdown body, and no entries. With entries, the landing page lists
  them newest first and each entry gets its own page. Without entries, no entry page is generated.
- Home page cards for the two new sections, marked as under construction.
- Sitemap lists the twelve pages, plus any entry pages once entries exist.
- A test builds the site against a fixture content directory (not shipped) and pins both states.

## Impact
- Affected specs: `site-pages` (RENAMED and MODIFIED: the page set; ADDED: sections under
  construction, actions and news collections), `site-metadata` (MODIFIED: sitemap)
- Affected code: `src/content.config.ts`, `src/content/`, `src/i18n/*`, `src/layouts/Base.astro`,
  `src/components/`, `src/pages/`, `src/lib/`, `tests/`, `README.md`, `CHANGELOG.md`,
  `.claude/project.md`
