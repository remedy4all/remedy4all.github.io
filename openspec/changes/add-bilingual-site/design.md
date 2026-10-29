## Context
New repository, no content beyond the statute facts in the request. The CYCLOS site is the model:
Astro, static output, GitHub Pages via Actions. No backend, no third-party anything.

## Decisions
- **Routing:** Astro i18n, `defaultLocale: "el"`, `prefixDefaultLocale: false`,
  `trailingSlash: "always"`. Greek at `/`, `/about/`, `/what-we-do/`, `/contact/`; English under
  `/en/`. ASCII slugs shared by both languages, so the language switch is a prefix swap.
- **Content in one dictionary per language** (`src/i18n/el.ts`, `src/i18n/en.ts`) with a shared
  type, so a missing translation is a type error in `npm run check`. Pages are thin: each route
  file renders a shared page component with its `lang`.
- **Single configuration value:** `site.config.mjs` exports `GITHUB_ORG` (placeholder
  `org-not-yet-chosen`, marked as such) and derives `SITE_URL` as `https://<org>.github.io`. Both
  `astro.config.mjs` and the site read it.
- **Sitemap and robots.txt as static endpoints** (`src/pages/sitemap.xml.ts`,
  `src/pages/robots.txt.ts`), not the `@astrojs/sitemap` integration. Eight URLs do not justify a
  dependency, and the request allows nothing beyond what Astro needs to build.
- **Font:** Noto Sans (SIL OFL 1.1), variable weight, latin, latin-ext and greek subsets, woff2
  files copied into `public/fonts/` with the licence. No package dependency, no CDN.
- **Dependencies:** `astro`; dev: `@astrojs/check`, `typescript` 6.x (the peer range
  `@astrojs/check` accepts).
- **Tests:** `node --test` against `dist/` after a build. They check the eight pages, `lang`,
  navigation, language-switch counterparts, metadata, sitemap and robots, the absence of
  placeholder text, `mailto:`/`tel:`, external resources and personal-data markers, and that the
  purposes list has eleven items in each language.
- **What we do:** an unnumbered list, so leaving out item 10 does not show as a gap. The Greek is
  the statute text lightly simplified for a general reader; the English translates the Greek.

## Risks / Trade-offs
- The placeholder org appears in canonical URLs and the sitemap until he names the organisation.
  It is not visible on any page, and it is replaced in one place.
