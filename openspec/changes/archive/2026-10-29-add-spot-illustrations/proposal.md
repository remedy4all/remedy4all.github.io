# Change: Place the seven spot illustrations (REQ-REMD-016)

## Why
The six What we do cards and the under-construction pages carry only icons. His illustrations, in the hero's style, are what make the site visually distinct.

## What Changes
- Copy the seven sources into `brand/source/spots/`.
- `scripts/build-spot-illustrations.py`: key the flat cream background to transparency (flood fill from the image edges with a tolerance and a soft alpha ramp, so cream inside the artwork is kept), crop every image to one shared square that contains all motifs, and write 600 px transparent PNG masters to `src/assets/spots/`. Re-runnable: replacing `04` and rerunning needs no code change.
- `Spot.astro`: renders a spot through `astro:assets` `<Picture>` (AVIF, WebP fallback, 300 and 600 px, alt="", lazy) or, when the image is absent, the 014 badge icon.
- The six area cards show their spot above the title (What we do) or beside it (home compact cards). The under-construction note shows `07` in place of its badge.

## Impact
- Affected specs: `site-pages` (ADDED: Spot illustrations)
- Affected code: `brand/source/spots/`, `scripts/`, `src/assets/spots/`, `src/components/`, `src/i18n/`, `src/styles/global.css`, `tests/`, `README.md`, `CHANGELOG.md`
