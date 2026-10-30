## RENAMED Requirements
- FROM: `### Requirement: Four pages per language`
- TO: `### Requirement: Pages per language`

## MODIFIED Requirements

### Requirement: Pages per language
The site SHALL provide a home, an about, a what-we-do, an actions, a news and a contact page in each
of Greek and English, each reachable from the navigation on every page, in that order.

#### Scenario: Twelve pages built
- **WHEN** the site is built with no actions or news entries
- **THEN** twelve HTML pages exist: `/`, `/about/`, `/what-we-do/`, `/actions/`, `/news/`, `/contact/` and the same six under `/en/`

#### Scenario: Navigation reaches every page
- **WHEN** any page is opened
- **THEN** its navigation links to the six pages of its language in the order home, about, what we do, actions, news, contact

## ADDED Requirements

### Requirement: Sections under construction
A landing page SHALL, while its section has no entries in that page's language, show only its heading and the statement «Η ενότητα είναι υπό κατασκευή» / "This section is
under construction", in the same place and style on all four landing pages, with nothing that claims
activity. The home page SHALL link to both sections and mark them as under construction.

#### Scenario: Empty section
- **WHEN** `/news/` is opened and there are no Greek news entries
- **THEN** it shows the heading «Νέα» and «Η ενότητα είναι υπό κατασκευή», and no item, date or list

#### Scenario: Home page marks the sections
- **WHEN** the home page is opened
- **THEN** its links to Actions and News say they are under construction

### Requirement: Actions and news collections
The site SHALL define content collections `actions` and `news`, each with the schema title, date,
language, summary and body. When a collection has entries in a language, the landing page in that
language SHALL list them newest first, and each entry SHALL have its own page. No page SHALL be
generated for an entry that does not exist.

#### Scenario: Entries present
- **WHEN** the site is built with entries in a collection
- **THEN** the landing page lists that language's entries newest first, each linking to its own page, and the under-construction statement is not shown

#### Scenario: No entries
- **WHEN** the site is built with no entries
- **THEN** no entry page exists and the landing page shows the under-construction statement
