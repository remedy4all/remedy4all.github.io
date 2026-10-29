## MODIFIED Requirements

### Requirement: Page metadata
Every page SHALL carry a title, a meta description, Open Graph title, description and image, a
canonical URL, hreflang alternates and a favicon. The favicon and the Open Graph image SHALL be
derived from the logo artwork.

#### Scenario: Metadata present
- **WHEN** any built page is inspected
- **THEN** it has `title`, `meta[name=description]`, `og:title`, `og:description`, `og:image`, `link[rel=canonical]` and `link[rel=icon]`

### Requirement: Single organisation setting
The organisation's GitHub name SHALL be set in one configuration value, from which the site URL is
derived. The value is `remedy4all`, so the site URL is `https://remedy4all.github.io`.

#### Scenario: Site URL
- **WHEN** the site is built
- **THEN** the canonical URLs, sitemap and robots.txt all use `https://remedy4all.github.io`

#### Scenario: Changing the organisation
- **WHEN** the value in `site.config.mjs` is changed and the site rebuilt
- **THEN** the canonical URLs, sitemap and robots.txt all use the new `https://<org>.github.io`
