---
request: REQ-REMD-016
outcome: complete
version: 0.5.0 (local annotated tag v0.5.0, not pushed)
commit: 68d309d
spec_change: add-spot-illustrations (archived as openspec/changes/archive/2026-10-29-add-spot-illustrations; site-pages gained the requirement "Spot illustrations")
requirements: {1: done, 2: done, 3: done, 4: done, 5: done}
tests: |
  Run once at the end, from a clean install (node_modules, dist and .astro removed), with npm ci.
  npm run check gave 0 errors, 0 warnings and 0 hints. npm run build built 12 pages. npm test
  passed 117 of 117.
  New tests:
  - spots 01 to 06 on the What we do and home cards in both languages, each a picture with AVIF
    300w and 600w sources and a WebP img (300w and 600w) with alt="", explicit width and height,
    and loading lazy;
  - illustration 07 in the under-construction note on all four Actions and News pages;
  - every spot file in dist is 60 KB or less, and AVIF and WebP exist for all seven. The largest
    is 25.7 KB.
  Updated tests: the area-card and under-construction markup now expect a picture in the media
  slot.
  Badge fallback, checked once by hand. With 04's master moved aside, the build succeeded and
  card 4 rendered its badge icon while the others kept their illustrations. The file was restored
  before the final run.
  Keying, checked visually. All seven masters were composited over magenta, white, page cream and
  navy. There is no square and no residual dust on magenta, white or cream, and the cream papers
  in 01, 04 and 06 are intact. A faint light edge shows only on navy, where no illustration is
  placed.
  axe-core 4.14 (WCAG 2.0/2.1 A and AA plus best-practice) on all 12 pages at 1280px and 360px:
  0 violations, no horizontal scroll, no request to another origin. Screenshots were reviewed:
  no square edge on white cards or cream bands at either width.
  Lighthouse 12 mobile (local preview), with the other categories 100:
  - /what-we-do/: performance 99, LCP 1.8 s, CLS 0;
  - /en/what-we-do/: performance 99, LCP 1.9 s, CLS 0;
  - /: performance 99.
closed_out:
  spec_change: archived
  release: 0.5.0, local annotated tag v0.5.0; minor, because it adds visitor-visible artwork and repairs nothing
  tech_debt: none affected
  docs: README.md (spot illustrations, keying chosen over colour matching, how to rerun, file map), .claude/project.md (spots, toolchain line), CHANGELOG.md (0.5.0)
  review: none requested
deviations: |
  - Background handling (requirement 3). The background is keyed to transparency, not matched
    with a surface colour, because the cards are white and the bands alternate cream and white.
    Only background connected to the image edge is removed, with a tight tolerance. The first
    attempt at a looser tolerance (18) ate into the cream papers in 01, 04 and 06 and part of the
    ring in 05, which would have changed the artwork. Measured coverage is flat for tolerances 4
    to 8 and jumps at 10, and background noise is about 3, so 6 was used. Noise specks smaller
    than 64 px are treated as background, and a soft alpha ramp is applied only in a 2 px band
    around the artwork. This is recorded in the README.
  - Crop. All seven are cropped to one shared centred square (199 to 1849 of 2048), computed from
    the extent of every motif, so no motif is cut and all share one scale. Only empty background
    is removed. When 04 is replaced, the square is recomputed on the next run.
  - Sizes. The 014 badge slot (2.75rem) was too small for an illustration. Displayed widths are
    9rem above the title on What we do, 4.5rem beside the title on the home compact cards, and
    8rem in the under-construction note. The 300 px variant serves these at 2x.
  - Home cards. The request names the six «Τι κάνουμε» cards. The home page's compact copies of
    those cards also show their illustrations, beside the title, so both places match.
  - Delivery. AVIF with a WebP fallback, and no JPEG or PNG fallback, because the images need
    transparency and the request allows WebP or AVIF.
  - Pipeline dependencies. The script runs under uv with Pillow, NumPy and SciPy, declared inline.
    They are build-time tools only and not part of the site or its npm dependencies.
  - Fixed during the work, in the new script itself: Pillow 13 makes images built with
    Image.fromarray read-only views, and flood fill on them silently did nothing. The key now uses
    scipy.ndimage connected components instead.
  - OpenSpec commands were followed from their files with the openspec CLI, not invoked as slash
    commands (same reason as before).
incidental_fixes: |
  - none
follow_ups: |
  - When the final 04 arrives, copy it over brand/source/spots/04-education-health-legal.jpg, run uv run --script scripts/build-spot-illustrations.py, rebuild, commit and release a patch.
---

# REQ-REMD-016 completion report

The seven spot illustrations are on the six area cards and the four under-construction pages,
keyed to transparency by a re-runnable script. Release 0.5.0 is committed and tagged locally.
There is no remote and nothing has been pushed.
