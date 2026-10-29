## 1. Pipeline
- [x] 1.1 Copy the seven sources into `brand/source/spots/`
- [x] 1.2 `scripts/build-spot-illustrations.py`: edge flood-fill key with soft alpha, shared square crop, 600 px PNG masters in `src/assets/spots/`
- [x] 1.3 Check the keyed masters over contrasting backgrounds: no square, artwork intact

## 2. Placement
- [x] 2.1 `Spot.astro` with badge fallback; area cards map to spots 01 to 06
- [x] 2.2 What we do cards: illustration above the title; home compact cards: illustration beside the title
- [x] 2.3 Under-construction note: illustration 07

## 3. Tests and checks
- [x] 3.1 Tests: spots on cards and notes, decorative, AVIF and WebP 300w and 600w, files 60 KB or less, fallback to badge
- [x] 3.2 axe at 1280 and 360 px; visual check on cream and white bands; Lighthouse mobile on What we do

## 4. Docs and release
- [x] 4.1 README (keying method, how to rerun), `.claude/project.md`, `CHANGELOG.md` 0.5.0, version
- [x] 4.2 Gates once at the end from a clean `npm ci`; archive; commit; tag `v0.5.0`
