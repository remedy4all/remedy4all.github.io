## Decisions
- **Collections:** `src/content.config.ts` defines `actions` and `news` with the `glob` loader
  (`**/*.md`) over `src/content/<section>/`. Schema: `title` (string), `date` (date), `language`
  (`el` | `en`), `summary` (string); the Markdown body is the entry body. Each directory holds only
  a `.gitkeep`, so it exists and has no entries.
- **Fixture switch:** when `CONTENT_ROOT` is set, the loader reads `<CONTENT_ROOT>/<section>/`
  instead. Only the test sets it, pointing at `tests/fixtures/content/`, and builds into a
  temporary `--outDir`. The fixture is never part of the shipped build. This is the one
  test-only branch in production code. It was chosen because it exercises the real loader,
  schema, routes and pages, which a test of a pure function would not.
- **Routes:** a landing page and a dynamic entry route per section and language:
  `src/pages/[section page].astro` and `src/pages/<section>/[slug].astro`, plus the `en/`
  counterparts. `getStaticPaths` returns one path per entry of that language, so with no entries
  no entry page is built.
- **Listing:** `src/lib/entries.ts` filters by language and sorts newest first (date descending,
  then title). One `SectionLanding` component renders either the list or the under-construction
  statement, so the wording sits in the same place and style on all four pages.
- **Entry pages:** they use the section's page key for navigation (`aria-current`) and take their
  title, description and path from the entry. An entry exists in one language only, so its
  language switch leads to the counterpart section's landing page.
- **Sitemap:** the twelve pages, plus entry pages read from the collections.
- **Home:** two more cards. Their description says «Υπό κατασκευή» / "Under construction" while
  the section has no entries in that language, and switches to the ordinary description once it
  has some.

## Risks / Trade-offs
- The fixture build adds a few seconds to `npm test`. Acceptable for pinning both states end to end.
