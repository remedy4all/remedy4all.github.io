# Change: Publish the contact email and hide unset contact rows

## Why
REQ-REMD-021. The organisation cannot be reached from its own site: all three contact values in
`CONTACT` (`site.config.mjs`) are placeholders, each shown as «Σύντομα διαθέσιμο» / "Coming soon".
The mailbox remedy4all@csl.gr was created on 30/10/2026. There is no phone number or postal address
to publish yet, and it was decided (30/10/2026) that those rows should not appear at all rather
than say «Σύντομα διαθέσιμο».

## What Changes
- `CONTACT.email` becomes `remedy4all@csl.gr`, shown on both Contact pages as a plain
  `mailto:remedy4all@csl.gr` link under the existing «Email» label. No obfuscation: anything that
  keeps a working `mailto:` without JavaScript still puts the address in the HTML.
- A contact field whose value is unset or a placeholder is no longer rendered: no label, no
  «Σύντομα διαθέσιμο» / "Coming soon", no empty row. Phone and address are therefore hidden.
- Setting a phone or address value later makes its row appear, with no other code change.
- The now unused «Σύντομα διαθέσιμο» / "Coming soon" string is removed from the dictionaries.
- `CONTACT` is read only by the Contact page (no footer or structured-data use), so the email
  appears nowhere else and nothing is added elsewhere.

## Impact
- Affected specs: `site-pages` (Content limited to supplied facts; Contact fields from configuration)
- Affected code: `site.config.mjs`, `src/lib/contact.ts`, `src/components/pages/ContactPage.astro`,
  `src/i18n/{types,el,en}.ts`, `tests/contact.test.mjs`, `tests/site.test.mjs`
- Visitor-visible: minor release (0.6.0)
- Out of scope: phone and address values (REQ-REMD-011), any other page, the footer, a contact form
