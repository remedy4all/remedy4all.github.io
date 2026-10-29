# site-pages Specification

## Purpose
The pages the site serves, what they may say, and how they are built for access.
## Requirements
### Requirement: Four pages per language
The site SHALL provide a home, an about, a what-we-do and a contact page in each of Greek and
English, each reachable from the navigation on every page.

#### Scenario: Eight pages built
- **WHEN** the site is built
- **THEN** eight HTML pages exist: `/`, `/about/`, `/what-we-do/`, `/contact/` and the same four under `/en/`

#### Scenario: Navigation reaches every page
- **WHEN** any page is opened
- **THEN** its navigation links to the four pages of its language

### Requirement: Content limited to supplied facts
Every fact about the organisation SHALL come from the statute or from what a request explicitly
supplies. No activities, figures, beneficiaries, testimonials, team members, partner logos, contact
details or member data that a request did not supply SHALL appear, and no placeholder text SHALL be
visible to a visitor.

#### Scenario: Home page
- **WHEN** the home page is opened
- **THEN** it shows the name «REMEDY FOR ALL», one sentence of purpose drawn from Art. 4.1 and links to the other pages

#### Scenario: About page
- **WHEN** the about page is opened
- **THEN** it shows the legal form, founding date 5/1/2024, ΓΕΜΗ number 174746001000, the seat in the Municipality of Athens, and that the purposes are set by the statute, and no member names

#### Scenario: What we do page
- **WHEN** the what-we-do page is opened
- **THEN** it lists the purposes of Art. 4.2 items 1 to 9, 11 and 12 (eleven items), omits item 10, and states that the list is indicative

#### Scenario: Contact page
- **WHEN** the contact page is opened
- **THEN** it lists email, phone and postal address, each showing its configured value or, while that value is a placeholder, «Σύντομα διαθέσιμο» / «Coming soon»

#### Scenario: No placeholder or personal data
- **WHEN** the built HTML is searched
- **THEN** it contains no lorem ipsum, "TBD", "TODO" or placeholder contact value, and no ID card or tax number markers

### Requirement: Accessible, self-contained design
The site SHALL use the Proposal 4 logo, a self-hosted open-licensed font with full Greek glyph
support, text and link contrast meeting WCAG 2.1 AA, a layout usable down to phone width, and
keyboard navigation with visible focus and a skip link. It SHALL load nothing from another origin.

#### Scenario: No third-party requests
- **WHEN** any built page is inspected
- **THEN** every script, stylesheet, font and image it loads is served from the site itself

#### Scenario: Keyboard use
- **WHEN** a keyboard user tabs through a page
- **THEN** a skip link comes first and every link shows a visible focus indicator

### Requirement: Brand logo
The header SHALL show the Proposal 4 light logo, cropped to the artwork with no page fragments and
no visible background rectangle, linking to the current language's home page with the accessible
name «Remedy for All». The dark variant SHALL appear in the footer band. The artwork SHALL NOT be
redrawn, recoloured or re-typeset.

#### Scenario: Header logo
- **WHEN** any page is opened at desktop or phone width
- **THEN** the header shows the light logo, legible, linking to `/` on Greek pages and `/en/` on English pages, named «Remedy for All»

#### Scenario: Dark variant
- **WHEN** the footer of any page is viewed
- **THEN** it shows the dark logo on a navy band of the logo's own background colour

### Requirement: Palette and contrast
The Proposal 4 palette (navy `#2D3A5A`, blue `#3FA9F7`, slate `#6D7A8A`, cream `#F6F7F1`) SHALL be
applied site-wide. Body text and links SHALL meet a 4.5:1 contrast ratio. The blue SHALL be used
only for accents, large text or backgrounds, never for normal-size text on cream or white.

#### Scenario: Automated contrast check
- **WHEN** an axe colour-contrast check runs on every page
- **THEN** it reports no violations

### Requirement: Supporter credit
Every page's footer SHALL carry, in the page's language, the text «Με την υποστήριξη της» /
«Supported by», CSSA's logo and the company name «Computer Solutions S.A.», linking to
`https://www.csl.gr`, and no other claim about CSSA or the relationship.

#### Scenario: Credit on every page
- **WHEN** any of the eight pages is opened
- **THEN** its footer shows the credit in that page's language with a link to `https://www.csl.gr`

### Requirement: Contact fields from configuration
Email, phone and postal address SHALL be named values in `site.config.mjs`, each with an obvious
placeholder value. A placeholder SHALL never be rendered and SHALL produce no `mailto:` or `tel:`
link. Replacing a value in the configuration SHALL be all it takes to publish it.

#### Scenario: Placeholder value
- **WHEN** a contact value is still its placeholder
- **THEN** the contact page shows «Σύντομα διαθέσιμο» / «Coming soon» for that field and no link

#### Scenario: Real value
- **WHEN** the email or phone value is replaced with a real one and the site rebuilt
- **THEN** the field shows it as a `mailto:` or `tel:` link, and a real address shows as text

