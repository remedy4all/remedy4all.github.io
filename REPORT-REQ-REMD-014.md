---
request: REQ-REMD-014
outcome: complete
version: 0.4.0 (local annotated tag v0.4.0, not pushed)
commit: b819327
spec_change: update-design-pass (archived as openspec/changes/archive/2026-10-29-update-design-pass; site-pages and site-i18n modified, 5 requirements added including the graphics addendum)
requirements: {1: done, 2: done, 3: done, 4: done, 5: done, 6: done, 7: done, 8: done, 9: done, 10: done, 11: done, 12: done}
tests: |
  Run once at the end, from a clean install (node_modules, dist and .astro removed), with npm ci.
  npm run check gave 0 errors, 0 warnings and 0 hints. npm run build built 12 pages. npm test
  passed 114 of 114.
  New or changed tests check:
  - the EL / EN switch in both the header and the footer, current language marked, the other
    language linking to the counterpart, and visible text exactly "EL / EN";
  - the hero: headline text, marked key words, the tagline as text, a CTA to #areas, AVIF and WebP
    sources at 800w and 1600w, a JPEG fallback with alt="" and width 1600, height 679, and the old
    large name heading gone;
  - that every hero image file in dist is 250 KB or less;
  - six area cards (ids area-1 to area-6, each with an aria-hidden SVG icon in its media slot, a
    title and a line) on both What we do pages, before «Όπως ορίζει το καταστατικό» / "As set out
    in the statute", with the eleven-item list after it;
  - that home links to all six card anchors;
  - the header logo crop and the credit inside the navy band, with the legal text on two lines;
  - the navy quote band with the purpose sentence, framed and crossed twice by the motif, and at
    least three crossings on home;
  - on every page: every SVG and shape layer aria-hidden, at least one boundary-crossing motif, a
    paper-cut shape, a marker in the main heading, one framed block;
  - icon badges on the three contact fields.
  axe-core 4.14 (WCAG 2.0/2.1 A and AA plus best-practice) on all 12 pages at 1280px and 360px,
  with the decorations in place: 0 violations, no horizontal scroll at 360px, and no request to
  another origin. Axe's remaining "incomplete" contrast items are only on the home page: the hero
  headline and tagline (over the image) and the areas h2 (over a paper-cut shape). On those, the
  text was hidden, the pixels behind it captured, and the worst-case contrast computed at 1280,
  360, 800 and 1920px. The worst was 7.83:1, the tagline at 800px; the headline is about 10:1.
  The marker was first a gradient, which axe cannot evaluate, so it was made a solid fill and axe
  now checks it directly (navy on #CFE8FD, 8.91:1).
  Lighthouse 12 mobile on / and /en/ (local preview): performance 99, accessibility 100, best
  practices 100, SEO 100, LCP 1.8 s, CLS 0.
  Screenshots at both widths were reviewed for every page.
closed_out:
  spec_change: archived
  release: 0.4.0, local annotated tag v0.4.0; minor, because it changes and adds visitor-visible design and content presentation and repairs nothing
  tech_debt: none affected
  docs: README.md (Design section with the hero image, the icon set and its licence, the graphic devices and card slots; file map), .claude/project.md (design, icons, footer), CHANGELOG.md (0.4.0)
  review: none requested
deviations: |
  - Order. The addendum (requirements 6 to 12) arrived after implementation of 1 to 5 had begun.
    The OpenSpec change was amended first (proposal, design, a new "Graphic devices" requirement,
    tasks section 3b) and then implemented, so the change never described unplanned work.
  - Quote band and purpose sentence. Requirement 1 keeps the purpose paragraph below the hero, and
    requirement 9 asks for a navy band carrying the purpose sentence. The band sits directly below
    the hero and is that paragraph, in large type, so the sentence is not shown twice.
  - Home links. "The home page links to these cards, not to a list": the hero CTA goes to
    /what-we-do/#areas, and the home page shows the six areas as compact cards, each linking to its
    anchor. The separate "What we do" link card was dropped from the page-links row, which now has
    About, Actions, News and Contact.
  - Tagline colour. On the hero the tagline is navy, not the muted slate, because over the
    illustration's waves at 800px muted text measured 4.07:1.
  - Marked words (the request leaves them to the implementer). Home «ευάλωτες ομάδες» /
    "vulnerable groups"; about «είμαστε» / "us"; what we do «κάνουμε» / "we do"; actions, news and
    contact mark their one-word title. Entry pages (none exist yet) are not marked. The marker is a
    styled span, not <mark>, so screen readers do not announce a highlight.
  - Offset frame placement. It is on a featured block, not the hero image. On wide screens the
    hero image is a full-bleed background, where a frame cannot sit behind it. Framed blocks: the
    quote on home, the facts card on about and contact, the statutory list on what we do, the
    under-construction note on actions and news, and the article on entry pages.
  - "Two devices per viewport". The layered devices (motif, shapes, frame, quote band) are kept to
    two per viewport. Badges and markers are treated as type styling.
  - Palette. Beyond the four colours, light tints of them are used: marker #CFE8FD and icon disc
    #E4F2FD (from the blue), shape tint #ECEEF1 (from the slate), and a darker navy #1F2940 for the
    button hover. All were checked against the text that sits on them.
  - Area card lines. Each is one line written from its statute items, adding nothing. The cards
    cover items 1 to 9 and 12. Item 11 ("any other action") has no card and stays in the full
    list, as the request's table implies.
  - Under-construction notes carry the Lucide "construction" badge and an inline motif. Contact
    fields carry the mail, phone and map-pin badges.
  - Compact header. A small first-party inline script (IntersectionObserver) toggles the compact
    state. Without JavaScript the header is still sticky. There is no other motion beyond hover.
  - The "collection is empty" warnings from REQ-REMD-013 still appear in build logs, as expected.
  - OpenSpec commands were followed from their files with the openspec CLI, not invoked as slash
    commands (same reason as before).
incidental_fixes: |
  - none
follow_ups: |
  - Ask him to review the six area-card lines (Greek and English) against the statute. They are written from Art. 4.2 and their wording is his to adjust.
  - Ask him to confirm the marked key words in each heading. They were the implementer's choice.
  - REQ-REMD-016 (already issued) places the spot illustrations in the cards' media slot and on the under-construction notes.
---

# REQ-REMD-014 completion report

The design pass and its graphics addendum are built, tested and committed locally as 0.4.0. That
covers the hero, the icon cards, the lighter header, the warmer footer, the section rhythm and
the seven graphic devices. There is no remote and nothing has been pushed.
