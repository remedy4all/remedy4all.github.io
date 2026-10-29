## MODIFIED Requirements

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
