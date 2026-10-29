# site-pages Specification

## Purpose
The pages the site serves, what they may say, and how they are built for access.
## Requirements
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
The header SHALL show the Proposal 4 light logo cropped just above its tagline, with no page
fragments and no visible background rectangle, linking to the current language's home page with
the accessible name «Remedy for All». The dark variant SHALL appear in the footer band. The artwork
SHALL NOT be redrawn, recoloured or re-typeset.

#### Scenario: Header logo
- **WHEN** any page is opened at desktop or phone width
- **THEN** the header shows the light logo without its tagline, legible, linking to `/` on Greek pages and `/en/` on English pages, named «Remedy for All»

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

### Requirement: Pages per language
The site SHALL provide a home, an about, a what-we-do, an actions, a news and a contact page in each
of Greek and English, each reachable from the navigation on every page, in that order.

#### Scenario: Twelve pages built
- **WHEN** the site is built with no actions or news entries
- **THEN** twelve HTML pages exist: `/`, `/about/`, `/what-we-do/`, `/actions/`, `/news/`, `/contact/` and the same six under `/en/`

#### Scenario: Navigation reaches every page
- **WHEN** any page is opened
- **THEN** its navigation links to the six pages of its language in the order home, about, what we do, actions, news, contact

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

### Requirement: Home hero
The home page SHALL open with a hero carrying his illustration as decorative art, the headline
«Προστατεύουμε και στηρίζουμε ευάλωτες ομάδες του πληθυσμού.» / "We protect and support vulnerable
groups.", «Together in Support» as text, and one primary link to the What we do cards. The headline
SHALL meet 4.5:1 contrast against whatever is behind it at 1280 px and 360 px. The image SHALL be
served as AVIF and WebP at about 800 and 1600 px with a JPEG fallback, each file 250 KB or less,
with explicit width and height and empty `alt`.

#### Scenario: Hero at phone width
- **WHEN** the home page is opened at 360 px
- **THEN** the headline is fully readable on cream, with the illustration below it and no horizontal scroll

#### Scenario: Image weight
- **WHEN** the built hero image files are measured
- **THEN** each is 250 KB or less

### Requirement: Areas of work
The What we do page SHALL show six cards, each with a self-hosted open-licensed line icon, a title
and one line written from the statute items it covers (items 1; 2 and 5; 3; 4 and 6; 7, 8 and 9;
12), adding nothing, above the full statutory list. The home page SHALL link to these cards.

#### Scenario: Six cards in both languages
- **WHEN** `/what-we-do/` or `/en/what-we-do/` is opened
- **THEN** six cards with icon, title and line appear before the heading of the full list

#### Scenario: Home links to the cards
- **WHEN** the home page is opened
- **THEN** it links to each card on the What we do page

### Requirement: Header and footer layout
The header SHALL be sticky and become compact on scroll, and carry the language switch top right.
The footer SHALL be a navy band carrying the dark logo, the legal line on two lines, the CSSA
supporter credit with its logo on a light chip, and the language switch.

#### Scenario: Footer content
- **WHEN** the footer of any page is viewed
- **THEN** the credit, the two-line legal text and the language switch are inside the navy band

### Requirement: Section rhythm
Page sections SHALL alternate cream and white bands, and every card SHALL use one radius and one
shadow site-wide.

#### Scenario: Home bands
- **WHEN** the home page is viewed
- **THEN** its sections alternate cream and white backgrounds

### Requirement: Graphic devices
The site SHALL carry a small, consistent set of decorative graphics, all `aria-hidden`, in the
palette colours and their tints only, with no motion beyond hover:
- a thin blue curved line motif that crosses at least two section boundaries on the home page and
  one on each inner page, never under body text;
- soft paper-cut background shapes behind at least every second section;
- icons in round badges on the area cards, the contact fields and the under-construction notes;
- one full-width navy quote band on the home page with the purpose sentence in large type;
- a pale-blue marker behind one or two key words in each page's main heading, with the text at AA
  contrast;
- an offset blue frame behind one featured block per page;
- under-construction notes with a badge icon and the line motif.

#### Scenario: Decorations stay accessible
- **WHEN** axe runs on every page at 1280 px and 360 px with the decorations in place
- **THEN** it reports no violations, and every decoration is hidden from assistive technology

#### Scenario: Home devices
- **WHEN** the home page is opened
- **THEN** it shows the navy quote band with the purpose sentence, at least two line motifs crossing section boundaries, and a marked phrase in the hero headline

