## MODIFIED Requirements
### Requirement: Content limited to supplied facts
Every fact about the organisation SHALL come from the statute or from what a request explicitly
supplies. No activities, figures, beneficiaries, testimonials, team members, partner logos, contact
details or member data that a request did not supply SHALL appear, and no placeholder text SHALL be
visible to a visitor.

#### Scenario: Home page
- **WHEN** the home page is opened
- **THEN** it shows the hero headline, «Together in Support», a link to the What we do cards, one sentence of purpose drawn from Art. 4.1, the six areas of work and links to the other pages

#### Scenario: About page
- **WHEN** the about page is opened
- **THEN** it shows the legal form, founding date 5/1/2024, ΓΕΜΗ number 174746001000, the seat in the Municipality of Athens, and that the purposes are set by the statute, and no member names

#### Scenario: What we do page
- **WHEN** the what-we-do page is opened
- **THEN** it shows the six areas of work, and below them, under «Όπως ορίζει το καταστατικό» / "As set out in the statute", lists the purposes of Art. 4.2 items 1 to 9, 11 and 12 (eleven items), omits item 10, and states that the list is indicative

#### Scenario: Contact page
- **WHEN** the contact page is opened
- **THEN** it shows the email remedy4all@csl.gr as a `mailto:` link under the email label, and no phone or postal address row while those values are unset

#### Scenario: No placeholder or personal data
- **WHEN** the built HTML is searched
- **THEN** it contains no lorem ipsum, "TBD", "TODO" or placeholder contact value, and no ID card or tax number markers

### Requirement: Contact fields from configuration
Email, phone and postal address SHALL be named values in `site.config.mjs`; a value not yet known
SHALL be an obvious placeholder. A field whose value is unset or a placeholder SHALL NOT be rendered
at all: no label, no «Σύντομα διαθέσιμο» / "Coming soon" text and no `mailto:` or `tel:` link.
Setting a value in the configuration SHALL be all it takes to publish its field. The values SHALL
appear only on the contact pages.

#### Scenario: Placeholder value
- **WHEN** a contact value is unset or still its placeholder
- **THEN** the contact page in either language shows no row for that field

#### Scenario: Real value
- **WHEN** the email or phone value is set to a real one and the site rebuilt
- **THEN** its row appears and shows it as a `mailto:` or `tel:` link, and a real address appears as text

#### Scenario: Email published
- **WHEN** either contact page is opened with `CONTACT.email` set to remedy4all@csl.gr
- **THEN** it has exactly one email link, to `mailto:remedy4all@csl.gr`, and no other page has a `mailto:` or `tel:` link
