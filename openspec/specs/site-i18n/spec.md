# site-i18n Specification

## Purpose
Greek and English versions of every page, and the switch between them.
## Requirements
### Requirement: Greek primary, English second
Greek pages SHALL be served at the root and English pages under `/en/`, each with the correct
`lang` attribute. The English text SHALL translate the Greek and add nothing to it.

#### Scenario: Language attributes
- **WHEN** a Greek page is opened
- **THEN** its `html` element has `lang="el"`, and an English page has `lang="en"`

### Requirement: Language switch to the counterpart page
Every page SHALL carry a visible language switch, in plain text «EL / EN» with the current language
marked, in the header (top right) and in the footer, whose other-language link leads to the same
page in the other language. No flags SHALL be used.

#### Scenario: Switch from the Greek about page
- **WHEN** the visitor uses the switch on `/about/`
- **THEN** they land on `/en/about/`, and the switch there leads back to `/about/`

#### Scenario: Current language marked
- **WHEN** a Greek page is opened
- **THEN** both switches show «EL / EN» with EL marked as current and EN as the link

