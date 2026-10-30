## 1. Assets
- [x] 1.1 Copy the hero source into `src/assets/hero-banner.jpg`
- [x] 1.2 `build-brand-assets.py`: also write the header logo cropped above the tagline
- [x] 1.3 Copy six Lucide icons and the ISC licence into `src/icons/`

## 2. Content
- [x] 2.1 i18n: hero headline, tagline, CTA; six area cards (title, line, icon, anchor); «Όπως ορίζει το καταστατικό» / "As set out in the statute"; switch labels; legal line in two parts

## 3. Layout and components
- [x] 3.1 Base and pages restructured into `section.band` blocks; prose width
- [x] 3.2 Header: cropped logo, sticky and compact on scroll, `EL / EN` switch
- [x] 3.3 Footer: navy band with logo, two-line legal text, CSSA credit on a light chip, `EL / EN` switch
- [x] 3.4 Home: hero with `<Picture>`, purpose paragraph, six area cards, page link cards
- [x] 3.5 What we do: six area cards, then the full list under its heading
- [x] 3.6 One card radius and shadow site-wide

## 3b. Graphics (addendum, requirements 6 to 12)
- [x] 3b.1 `Motif.astro` line motif at section boundaries (home three, inner pages one)
- [x] 3b.2 `Shape.astro` paper-cut shapes in bands
- [x] 3b.3 Badges on contact fields and under-construction note; card media slot
- [x] 3b.4 Home navy quote band with the purpose sentence
- [x] 3b.5 `MarkedText.astro` and `[...]` markers in each main heading
- [x] 3b.6 `.framed` offset frame on one block per page
- [x] 3b.7 Under-construction art
- [x] 3b.8 Tests for the devices

## 4. Tests and checks
- [x] 4.1 Update `tests/site.test.mjs`: switch markup (header and footer), hero, six cards per language with icons, full list below, anchors, header logo, footer credit in the band, hero image files 250 KB or less
- [x] 4.2 axe on all twelve pages at 1280 and 360 px; pixel contrast of the hero headline at both widths; no horizontal scroll
- [x] 4.3 Lighthouse mobile performance on the home page, 90 or more

## 5. Docs and release
- [x] 5.1 README (icon set and licence, hero image), `.claude/project.md`
- [x] 5.2 `CHANGELOG.md` 0.4.0, `package.json` version
- [x] 5.3 Gates once at the end from a clean `npm ci`

## 6. Close
- [x] 6.1 Archive the change, commit, tag `v0.4.0`
