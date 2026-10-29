# site-metadata Specification

## Purpose
Per-page metadata, the sitemap and robots.txt, and the single setting the site URL comes from.
## Requirements
### Requirement: Page metadata
Every page SHALL carry a title, a meta description, Open Graph title, description and image, a
canonical URL, hreflang alternates and a favicon. The favicon and the Open Graph image SHALL be
derived from the logo artwork.

#### Scenario: Metadata present
- **WHEN** any built page is inspected
- **THEN** it has `title`, `meta[name=description]`, `og:title`, `og:description`, `og:image`, `link[rel=canonical]` and `link[rel=icon]`

### Requirement: Sitemap and robots
The site SHALL publish `sitemap.xml` listing every built page under the configured site URL (the
twelve section pages, plus one URL per actions or news entry once entries exist), and `robots.txt`
pointing at it.

#### Scenario: Sitemap lists every page
- **WHEN** `sitemap.xml` is read on a build with no entries
- **THEN** it lists the twelve page URLs, each beginning with the configured site URL

#### Scenario: Sitemap lists entry pages
- **WHEN** the site is built with entries
- **THEN** `sitemap.xml` also lists each entry's page

### Requirement: Single organisation setting
The organisation's GitHub name SHALL be set in one configuration value, from which the site URL is
derived. The value is `remedy4all`, so the site URL is `https://remedy4all.github.io`.

#### Scenario: Site URL
- **WHEN** the site is built
- **THEN** the canonical URLs, sitemap and robots.txt all use `https://remedy4all.github.io`

#### Scenario: Changing the organisation
- **WHEN** the value in `site.config.mjs` is changed and the site rebuilt
- **THEN** the canonical URLs, sitemap and robots.txt all use the new `https://<org>.github.io`

