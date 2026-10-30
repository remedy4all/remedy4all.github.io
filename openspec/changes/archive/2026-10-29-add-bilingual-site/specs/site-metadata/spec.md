## ADDED Requirements

### Requirement: Page metadata
Every page SHALL carry a title, a meta description, Open Graph title and description, a canonical
URL, hreflang alternates and a wordmark-based favicon.

#### Scenario: Metadata present
- **WHEN** any built page is inspected
- **THEN** it has `title`, `meta[name=description]`, `og:title`, `og:description`, `link[rel=canonical]` and `link[rel=icon]`

### Requirement: Sitemap and robots
The site SHALL publish `sitemap.xml` listing all eight pages under the configured site URL, and
`robots.txt` pointing at it.

#### Scenario: Sitemap lists every page
- **WHEN** `sitemap.xml` is read
- **THEN** it lists the eight page URLs, each beginning with the configured site URL

### Requirement: Single organisation setting
The organisation's GitHub name SHALL be set in one configuration value, from which the site URL is
derived, with a placeholder clearly marked as such until it is chosen.

#### Scenario: Changing the organisation
- **WHEN** the value in `site.config.mjs` is changed and the site rebuilt
- **THEN** the canonical URLs, sitemap and robots.txt all use the new `https://<org>.github.io`
