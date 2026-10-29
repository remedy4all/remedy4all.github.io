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
Every fact about the organisation SHALL come from the request's Context (the statute). No
activities, figures, beneficiaries, testimonials, team members, partner logos, contact details or
member data SHALL appear, and no placeholder text SHALL be visible to a visitor.

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
- **THEN** it states that contact details will be published soon, with no email, phone, address, `mailto:` or `tel:` link

#### Scenario: No placeholder or personal data
- **WHEN** the built HTML is searched
- **THEN** it contains no lorem ipsum, "TBD" or "TODO", and no ID card or tax number markers

### Requirement: Accessible, self-contained design
The site SHALL use a text wordmark, a self-hosted open-licensed font with full Greek glyph support,
adequate contrast, a layout usable down to phone width, and keyboard navigation with visible focus
and a skip link. It SHALL load nothing from another origin.

#### Scenario: No third-party requests
- **WHEN** any built page is inspected
- **THEN** every script, stylesheet, font and image it loads is served from the site itself

#### Scenario: Keyboard use
- **WHEN** a keyboard user tabs through a page
- **THEN** a skip link comes first and every link shows a visible focus indicator

