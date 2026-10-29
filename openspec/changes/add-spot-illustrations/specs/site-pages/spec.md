## ADDED Requirements

### Requirement: Spot illustrations
The six area cards SHALL show their spot illustration (01 to 06) in the card's media slot, and the
under-construction notes SHALL show illustration 07, in both languages. Each illustration SHALL
have no visible background square, keyed to transparency. It SHALL be served as AVIF and WebP at
about 300 and 600 px, each file 60 KB or less, with explicit width and height and empty `alt`. When
an illustration is absent, its round badge icon SHALL be shown instead. The images SHALL be produced
by a re-runnable script from sources in the repository.

#### Scenario: Cards illustrated
- **WHEN** `/what-we-do/` or `/en/what-we-do/` is opened
- **THEN** each of the six cards shows its illustration above its title, decorative (`alt=""`)

#### Scenario: Under construction illustrated
- **WHEN** an actions or news page with no entries is opened
- **THEN** the under-construction note shows illustration 07 with the statement

#### Scenario: Missing illustration
- **WHEN** a card's illustration file is absent at build time
- **THEN** the card shows its badge icon and the build succeeds

#### Scenario: Weight
- **WHEN** the built illustration files are measured
- **THEN** each is 60 KB or less
