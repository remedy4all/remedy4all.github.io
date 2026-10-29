// Pins the populated state of the actions and news sections. Builds the site against the fixture
// entries in tests/fixtures/content (never shipped) into a temporary directory under node_modules, then checks
// listing order, entry pages, per-language filtering and the sitemap. The empty state is pinned by
// tests/site.test.mjs on the real build.
import { before, after, test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
let out;

before(() => {
  // Inside the repository (node_modules, ignored): Astro moves files with rename, which fails
  // across drives, so a system temp directory on another drive will not do.
  const base = join(ROOT, "node_modules", ".astro-fixture");
  mkdirSync(base, { recursive: true });
  out = mkdtempSync(join(base, "dist-"));
  const astro = join(ROOT, "node_modules", "astro", "bin", "astro.mjs");
  const run = spawnSync(process.execPath, [astro, "build", "--force", "--outDir", out], {
    cwd: ROOT,
    env: { ...process.env, CONTENT_ROOT: "./tests/fixtures/content" },
    encoding: "utf8",
  });
  assert.equal(run.status, 0, `fixture build failed:\n${run.stdout}\n${run.stderr}`);
});

after(() => {
  if (out) rmSync(out, { recursive: true, force: true });
});

const read = (path) => readFileSync(join(out, path, "index.html"), "utf8");
const main = (path) => read(path).match(/<main\b[\s\S]*?<\/main>/)[0];

test("news landing lists that language's entries newest first, each linking to its page", () => {
  const html = main("/news/");
  assert.doesNotMatch(html, /under-construction/);
  const links = [...html.matchAll(/<a href="([^"]+)">(FIXTURE[^<]*)<\/a>/g)].map((m) => [m[1], m[2]]);
  assert.deepEqual(links, [
    ["/news/fixture-newer/", "FIXTURE news newer"],
    ["/news/fixture-older/", "FIXTURE news older"],
  ]);
  assert.match(html, /<time datetime="2030-03-05">/);
  assert.match(html, /FIXTURE summary newer/);
  assert.doesNotMatch(html, /FIXTURE news english/);
});

test("each entry has its own page in its language only", () => {
  assert.match(main("/news/fixture-newer/"), /<h1>FIXTURE news newer<\/h1>[\s\S]*FIXTURE body newer/);
  assert.match(main("/en/news/fixture-english/"), /FIXTURE body english/);
  assert.match(main("/actions/fixture-action/"), /FIXTURE body action/);
  assert.ok(!existsSync(join(out, "en", "news", "fixture-newer")));
  assert.ok(!existsSync(join(out, "news", "fixture-english")));
});

test("entry page metadata and language switch", () => {
  const html = read("/news/fixture-newer/");
  assert.match(html, /<title>FIXTURE news newer \| REMEDY FOR ALL<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/remedy4all\.github\.io\/news\/fixture-newer\/">/);
  assert.match(html, /<a href="\/en\/news\/" lang="en" hreflang="en">/, "switch leads to the counterpart section");
});

test("a section with no entries in a language still shows the statement", () => {
  assert.match(main("/en/actions/"), /<p class="under-construction">This section is under construction\.<\/p>/);
  assert.match(main("/actions/"), /FIXTURE action greek/);
});

test("home page drops the under-construction mark only where entries exist", () => {
  const el = read("/");
  assert.doesNotMatch(el, /<a href="\/news\/">Νέα<\/a>\s*<p>Υπό κατασκευή\.<\/p>/);
  const en = read("/en/");
  assert.match(en, /<a href="\/en\/actions\/">Actions<\/a>\s*<p>Under construction\.<\/p>/);
});

test("sitemap lists the entry pages", () => {
  const xml = readFileSync(join(out, "sitemap.xml"), "utf8");
  for (const path of ["/news/fixture-newer/", "/news/fixture-older/", "/en/news/fixture-english/", "/actions/fixture-action/"]) {
    assert.ok(xml.includes(`<loc>https://remedy4all.github.io${path}</loc>`), path);
  }
});
