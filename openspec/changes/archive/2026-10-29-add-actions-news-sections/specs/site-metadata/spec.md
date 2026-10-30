## MODIFIED Requirements

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
