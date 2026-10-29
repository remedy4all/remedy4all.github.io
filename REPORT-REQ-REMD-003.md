---
request: REQ-REMD-003
outcome: complete
version: 0.2.0 (local annotated tag v0.2.0, not pushed)
commit: 2846b3f
spec_change: update-brand-supporter-contacts (archived as openspec/changes/archive/2026-10-29-update-brand-supporter-contacts; site-pages and site-metadata modified, 4 requirements added)
requirements: {1: done, 2: done, 3: done, 4: done, 5: done, 6: done, 7: done, 8: done}
tests: |
  Run once at the end, from a clean install (node_modules, dist and .astro removed), with npm ci.
  npm run check gave 0 errors, 0 warnings and 0 hints. npm run build built 8 pages. npm test
  passed 54 of 54: 48 build-output tests and 6 contact-rule unit tests.
  The new build-output tests check, on all 8 pages, that the header holds the light logo linking
  to the language's home with the name "Remedy for All", that the footer holds the dark logo, and
  that the CSSA credit appears in the page's language with the https://www.csl.gr link. They also
  check og:image and its alt, that no __PLACEHOLDER, mailto: or tel: appears anywhere in the HTML,
  three "coming soon" fields per contact page, and that SITE_URL and the canonical URLs are
  https://remedy4all.github.io.
  The contact unit tests were run once with the regression put back in (rendering the placeholder
  value): 1 failed. With the fix restored, all 6 passed.
  grep over dist found no mailto:, tel: or __PLACEHOLDER. sitemap.xml has 8 URLs, all on
  https://remedy4all.github.io.
  axe-core 4.14 (WCAG 2.0/2.1 A and AA plus best-practice) ran through playwright-core and the
  local Chrome on all 8 pages at 1280px and 360px: 0 violations, including colour-contrast, and
  no horizontal overflow. The skip link is the first Tab stop, and no request went to another
  origin. The tooling sits in a scratch directory and is not a repository dependency.
  Screenshots at both widths were reviewed. The logos are crisp, with no page fragments and no
  visible background rectangle.
closed_out:
  spec_change: archived
  release: 0.2.0, local annotated tag v0.2.0; minor, because the change is visible to visitors (logo, palette, credit, contact fields, site URL) and repairs nothing
  tech_debt: none affected (TD-001 and TD-002 remain open, about the agent kit)
  docs: README.md (settings, organisation and URL, contact fields, brand and asset regeneration, file map), .claude/project.md (hosting, settings, brand, palette roles, footer, glossary, toolchain), CHANGELOG.md (0.2.0)
  review: none requested
deviations: |
  - The logo is raster, not outlined paths. Requirement 8 assumes the logo is outlined paths. In
    both supplied SVGs the visible logo is an embedded, opaque RGB PNG: 988x506 light, 994x444
    dark. The background is baked in, cream rgb(246,247,240) and navy rgb(46,58,89). The vector
    content of those files is the rest of the PDF page, outside the view. So "trim to the logo's
    own paths and drop the background" cannot be done literally without editing pixels, which the
    "no redrawing or recolouring" constraint forbids.
  - What was done instead. scripts/build-brand-assets.py extracts each embedded PNG and crops it
    to the artwork plus a margin, keeping every pixel unchanged. Each logo sits on a surface of
    exactly its own baked-in colour: page and header #F6F7F0, footer band #2E3A59. So no edge or
    rectangle is visible, and no fragments of the page remain. Those two surface colours differ
    by one unit from the palette's cream #F6F7F1 and navy #2D3A5A. Text and links use the
    palette navy #2D3A5A.
  - The logo PNG is 737px wide after cropping and is shown at 168 to 216 CSS px, so it stays
    sharp up to about 3x pixel density. It is not infinitely scalable. Requirement 8's font point
    holds: no font was added for the logo, and Neue Machina and PP Neue Montreal are not used.
  - Muted text uses a darkened slate, #5A6676 (5.42:1 on cream), because the palette slate
    #6D7A8A gives 4.06:1. The slate is kept for borders, and the blue for non-text accents only
    (header rule, active-nav underline, card tops).
  - The favicon is the "r" of «remedy» cropped from the dark logo and padded with its own navy,
    at 32px and 180px, plus favicon.ico. The SVG favicon from 0.1.0 is removed. The OG image is
    the dark logo centred on a 1200x630 canvas of its own navy, not scaled up.
  - The designer's PDF deck was not copied into the repository. It is marked "Confidential
    Proposal" and contains the four proposals that were not chosen, and the repository has to be
    public for GitHub Pages (remedy4all.github.io). The two Proposal 4 SVGs, both preview PNGs and
    CSSA's logo were copied to brand/source/. The site references no SAI path.
  - The contact page's general sentence from 0.1.0 ("Contact details will be published soon") was
    removed. Each field now says «Σύντομα διαθέσιμο» / «Coming soon» on its own, and the sentence
    would have become false once a value is filled in.
  - The CSSA logo in the credit is decorative inside the link (alt=""). The visible text
    "Computer Solutions S.A." gives the link its name. The credit sits on a white strip below the
    navy band, because CSSA's dark logo would not read on navy.
  - The header logo's link name is "Remedy for All" in both languages, as the request specifies.
  - OpenSpec commands were followed from their files with the openspec CLI, not invoked as slash
    commands (same reason as REQ-REMD-002).
incidental_fixes: |
  - none
follow_ups: |
  - Ask him whether Stereotropism can deliver final vector artwork (SVG with outlined paths, or transparent PNGs) for Proposal 4. The supplied files embed the logo as an opaque raster. Rerun scripts/build-brand-assets.py on new artwork; if it is transparent, the surface colours can go back to the palette's exact cream and navy. Reserved to him in the request's open questions.
  - Ask him whether the confidential Stereotropism deck may be kept in the (public) repository. It was deliberately left out.
  - Ask him for the real contact values (email, phone, postal address) for CONTACT in site.config.mjs. Reserved to him.
  - Have a native Greek reader check the new labels («Σύντομα διαθέσιμο», «Ταχυδρομική διεύθυνση», «Με την υποστήριξη της») along with the REQ-REMD-001 texts before publication.
---

# REQ-REMD-003 completion report

The brand, the CSSA credit, the placeholder contact fields and the remedy4all.github.io URL are
applied, tested, committed and tagged 0.2.0 locally. There is no remote and nothing has been
pushed.
