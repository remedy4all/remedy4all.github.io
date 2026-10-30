// The one file of site settings. astro.config.mjs and the pages read it.

// The GitHub organisation that hosts the site. The repository is <org>/<org>.github.io.
export const GITHUB_ORG = "remedy4all";

// Derived. Served at the root of the organisation's user site, with no base path.
export const SITE_URL = `https://${GITHUB_ORG}.github.io`;

// Contact details shown on the contact page. A value still starting with "__PLACEHOLDER" is never
// shown: its row is left out of the page entirely, label included.
// To publish a detail, replace its placeholder with the real value and rebuild.
export const CONTACT = {
  email: "remedy4all@csl.gr",
  phone: "__PLACEHOLDER_PHONE__", // e.g. +30 210 000 0000
  address: "__PLACEHOLDER_ADDRESS__", // postal address, one line
};
