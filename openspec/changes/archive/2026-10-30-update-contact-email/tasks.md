## 1. Implementation
- [x] 1.1 Add a row builder to `src/lib/contact.ts` that returns only the published fields, in order, and drop the coming-soon text
- [x] 1.2 Render only those rows in `ContactPage.astro`
- [x] 1.3 Remove `contact.comingSoon` from `src/i18n/types.ts`, `el.ts` and `en.ts`
- [x] 1.4 Set `CONTACT.email` to `remedy4all@csl.gr` and update the comment in `site.config.mjs`

## 2. Tests
- [x] 2.1 Unit tests: unset and placeholder fields give no row; setting a phone or address value gives its row (requirements 3 and 4); proven to fail against the old behaviour
- [x] 2.2 Build-output tests: each Contact page has exactly one link, `mailto:remedy4all@csl.gr`, under the email label, no phone or address row and no «Σύντομα διαθέσιμο» / "Coming soon"; no other page has a `mailto:` or `tel:` link

## 3. Close out
- [x] 3.1 Update `.claude/project.md`, `README.md` and `CHANGELOG.md`
- [x] 3.2 Run `npm run check`, `npm run build`, `npm test` once at the end
- [x] 3.3 Archive the change, bump to 0.6.0, tag `v0.6.0`
