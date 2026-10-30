## Decisions
- **Hero image.** Source `src/assets/hero-banner.jpg` (3168 x 1344, his, generated). It is
  rendered with `astro:assets` `<Picture>`: formats AVIF and WebP, widths 800 and 1600, fallback
  JPEG, `sizes="100vw"`, `alt=""`, `loading="eager"` and `fetchpriority="high"`, because it is the
  hero. Quality is set so that every output is 250 KB or less; a test enforces that on `dist/`.
- **Hero layout.**
  - Desktop (48rem and wider): the image fills the hero band (`object-fit: cover`, anchored
    right), and the text column is at most 30rem from the left edge of a 64rem container, which
    keeps it on the plain cream area.
  - Narrower: the text sits on cream, and the image follows below it at a fixed height, anchored
    right, with a cream-to-transparent fade at its top edge. So the headline never sits on the
    illustration at phone width.
  - axe cannot judge text over images, so contrast is also checked from pixels: the text is
    hidden, the area behind it is captured, and the minimum navy contrast is computed.
- **Hero wording.** The headline and «Together in Support» are used as he wrote them. The tagline
  is the same English words in both languages, because it is the brand line. The link reads
  «Τι κάνουμε» / "What we do" and points to `#areas` on that page.
- **Areas of work.** Six cards defined once in the dictionaries: title, line, icon id, anchor
  (`area-1` to `area-6`). Icons: scale (items 1), heart-handshake (2, 5), clipboard-list (3),
  graduation-cap (4, 6), handshake (7, 8, 9), file-check (12). Item 11 ("any other action") has
  no card. It stays in the full list. The SVGs are copied from `lucide-static` 1.64.0 into
  `src/icons/` with the ISC licence, inlined with `stroke="currentColor"` and `aria-hidden`, navy
  on a pale blue disc.
- **Home.** Hero; a white band with the purpose paragraph and the six area cards (title only,
  linking to their anchors); a cream band with cards for About, Actions, News and Contact. Actions
  and News are still marked as under construction. The separate What we do card is dropped,
  because the six cards and the hero link lead there.
- **Header logo.** `build-brand-assets.py` also writes `remedy-logo-light-header.png`: the light
  crop cut at the first all-background row above the tagline. No pixel is altered.
- **Sticky and compact.** `position: sticky` on the header. A small inline script (no
  dependency) toggles `is-compact` when a sentinel at the top of the page leaves the viewport,
  which shrinks the logo and the padding. Without JavaScript the header is still sticky, just not
  compact.
- **Language switch.** `EL / EN`: the current language is a `<span aria-current="true">` and the
  other is a link with `lang` and `hreflang`, reading "EN" plus a visually hidden ", English" (or
  "EL, Ελληνικά"), so the visible text is part of the accessible name. It appears in the header
  and in the footer.
- **Bands.** `<main>` holds `<section class="band">` blocks. Bands alternate cream and white via
  `:nth-child(even)`. Pages with one section have one band. The header stays cream, because the
  light logo's baked-in background requires it. Cards share `--radius: 12px` and one
  `--shadow`.
- **Footer.** Navy band: dark logo; the legal line split into two lines (name and form; ΓΕΜΗ and
  seat); the CSSA credit with its logo on a white chip; the `EL / EN` switch.

## Risks / Trade-offs
- An inline script for the compact header. It is first-party, about ten lines, and the header
  works without it.
- The hero image is the largest asset. AVIF at 800 px keeps the phone payload small.

## Addendum decisions (graphics, requirements 6 to 12)
- **Line motif** (`Motif.astro`). One inline SVG path, a slow S-curve traced from the hero's
  paper-cut waves, with a 2px `#3FA9F7` stroke and `aria-hidden`. It is placed absolutely at a
  band's top or bottom edge, centred on the boundary, inside the 90px of vertical padding between
  bands and at the far left or right. So it crosses the boundary and never sits under text. Home:
  hero→quote, quote→areas and areas→links. Inner pages: the band→footer boundary.
- **Shapes** (`Shape.astro`). A soft blob path, `aria-hidden`, at low z-index in a band corner:
  cream on white bands, slate tint `#ECEEF1` on cream bands. Present in every band except the
  hero and the quote band, so at least every second section is shaped. The tints keep muted text
  at 5.02:1 or better.
- **Badges.** The existing icon discs (`#E4F2FD` circle, navy icon) are reused on the six cards,
  on the contact fields (Lucide mail, phone, map-pin) and on the under-construction note (Lucide
  construction). Cards keep a dedicated media slot (`.card-media`), so a spot illustration can
  replace the badge later with no layout change.
- **Quote band.** Home, directly under the hero: a navy band with the purpose sentence in large
  type. It takes the place of the purpose paragraph that followed the hero, so the sentence still
  sits below the hero, and the line motif crosses both of its edges. Text `#F9F9F9` on navy,
  10.69:1.
- **Marker.** Headings take `[...]` markup in the dictionaries, which `MarkedText.astro` renders
  as `<mark class="marker">` with background `#CFE8FD` (navy on it 8.91:1). Marked words: home
  «ευάλωτες ομάδες» / "vulnerable groups"; about «είμαστε» / "us"; what we do «κάνουμε» / "we
  do"; actions, news and contact mark their one-word title. Plain titles stay for the navigation
  and `<title>`.
- **Offset frame.** `.framed`: two stacked box-shadows (band colour inset by 2px over blue) draw
  a blue outline offset 10px down and right, behind one block per page. Home: the quote text box.
  About and contact: the facts card. What we do: the statutory list card. Actions and news: the
  under-construction note. Entry pages: the article.
- **Under-construction art.** The note becomes a card with the construction badge, the
  statement, and a short motif line set beside the text on wide screens and below it on narrow
  ones.
- **Restraint.** Each viewport shows at most two layered devices (motif, shape, frame). Badges
  and markers are treated as type styling, not decoration layers. No animation, only the existing
  hover states.
