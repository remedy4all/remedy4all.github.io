# site-deployment Specification

## Purpose
How the site is type-checked, built and published to GitHub Pages.
## Requirements
### Requirement: Build and type check
The site SHALL build with npm to static files, with `npm run check` as the type check and
`npm run build` as the build, both passing from a clean `npm ci`.

#### Scenario: Clean build
- **WHEN** `npm ci`, `npm run check` and `npm run build` run in a clean clone
- **THEN** all three succeed with no errors

### Requirement: Deploy to GitHub Pages from main
A GitHub Actions workflow SHALL, on push to `main`, run the type check, build and deploy to GitHub
Pages using the official Pages actions, with least-privilege permissions.

#### Scenario: Push to main
- **WHEN** a commit is pushed to `main`
- **THEN** the workflow type-checks, builds and deploys `dist/` to GitHub Pages

