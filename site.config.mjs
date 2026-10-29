// The one place to set where the site lives. astro.config.mjs and the pages read it.

// The GitHub organisation that hosts the site. The repository is <org>/<org>.github.io.
// PLACEHOLDER: the organisation's name has not been chosen yet. Replace this value with it.
export const GITHUB_ORG = "org-not-yet-chosen";

// Derived. Served at the root of the organisation's user site, with no base path.
export const SITE_URL = `https://${GITHUB_ORG}.github.io`;
