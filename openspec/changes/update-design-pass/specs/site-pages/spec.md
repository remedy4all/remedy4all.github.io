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
- **THEN** it lists email, phone and postal address, each showing its configured value or, while that value is a placeholder, «Σύντομα διαθέσιμο» / «Coming soon»

#### Scenario: No placeholder or personal data
- **WHEN** the built HTML is searched
- **THEN** it contains no lorem ipsum, "TBD", "TODO" or placeholder contact value, and no ID card or tax number markers

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

## ADDED Requirements

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
