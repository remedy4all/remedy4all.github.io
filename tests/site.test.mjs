// Build-output tests. Run `npm run build` first, then `npm test`.
// They enforce the site's content, language and privacy rules on what visitors actually get.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { SITE_URL } from "../site.config.mjs";

const DIST = new URL("../dist/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const PAGES = [
  { el: "/", en: "/en/" },
  { el: "/about/", en: "/en/about/" },
  { el: "/what-we-do/", en: "/en/what-we-do/" },
  { el: "/contact/", en: "/en/contact/" },
];
const ALL = PAGES.flatMap((p) => [
  { lang: "el", path: p.el, counterpart: p.en },
  { lang: "en", path: p.en, counterpart: p.el },
]);
const NAV = { el: PAGES.map((p) => p.el), en: PAGES.map((p) => p.en) };

const read = (path) => readFileSync(join(DIST, path, path.endsWith("/") ? "index.html" : ""), "utf8");
const visibleText = (html) =>
  html
    .replace(/<head>[\s\S]*?<\/head>/, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
const attr = (html, re) => (html.match(re) || [])[1];

test("dist exists (run npm run build first)", () => {
  assert.ok(existsSync(join(DIST, "index.html")), "dist/index.html missing");
});

for (const { lang, path, counterpart } of ALL) {
  test(`${path}: language, navigation and switch`, () => {
    const html = read(path);
    assert.match(html, new RegExp(`<html lang="${lang}"`));
    for (const target of NAV[lang]) {
      assert.ok(html.includes(`href="${target}"`), `nav link to ${target} missing`);
    }
    const otherLang = lang === "el" ? "en" : "el";
    const switchHref = attr(html, new RegExp(`<a href="([^"]+)" lang="${otherLang}" hreflang="${otherLang}"`));
    assert.equal(switchHref, counterpart, "language switch must lead to the counterpart page");
  });

  test(`${path}: metadata`, () => {
    const html = read(path);
    assert.match(html, /<title>[^<]*REMEDY FOR ALL<\/title>/);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.match(html, /<meta property="og:title" content="[^"]+"/);
    assert.match(html, /<meta property="og:description" content="[^"]+"/);
    assert.match(html, /<link rel="icon"[^>]+href="\/favicon\.svg"/);
    assert.equal(attr(html, /<link rel="canonical" href="([^"]+)"/), SITE_URL + path);
  });

  test(`${path}: no placeholder text, contact links or personal data`, () => {
    const html = read(path);
    const text = visibleText(html);
    assert.doesNotMatch(text, /lorem|ipsum|\bTBD\b|\bTODO\b|placeholder|not-yet-chosen/i);
    assert.doesNotMatch(html, /mailto:|tel:/i);
    // Markers of the members' data the statute carries: ID cards, tax numbers (9 digits).
    assert.doesNotMatch(text, /Α\.?Φ\.?Μ\.?|Α\.?Δ\.?Τ\.?|δελτί\S* ταυτότητας|\bVAT\b|\bID card\b|\btax number\b/i);
    assert.doesNotMatch(text, /(?<!\d)\d{9}(?!\d)/);
  });

  test(`${path}: loads nothing from another origin`, () => {
    const html = read(path);
    const loads = [
      ...html.matchAll(/<(?:script|img|iframe|source|audio|video|embed)\b[^>]*\ssrc="([^"]+)"/g),
      ...html.matchAll(/<link\b(?![^>]*rel="(?:canonical|alternate)")[^>]*\shref="([^"]+)"/g),
      ...html.matchAll(/url\(\s*["']?([^"')]+)/g),
    ].map((m) => m[1]);
    for (const src of loads) {
      assert.ok(!/^(https?:)?\/\//.test(src), `external resource: ${src}`);
    }
    assert.doesNotMatch(html, /<iframe|<object/);
  });
}

test("home pages: name, purpose sentence and links", () => {
  for (const path of ["/", "/en/"]) {
    const text = visibleText(read(path));
    assert.match(text, /REMEDY FOR ALL/);
  }
  assert.match(visibleText(read("/")), /Σκοπός της REMEDY FOR ALL είναι η προστασία ευάλωτων ομάδων/);
  assert.match(visibleText(read("/en/")), /The purpose of REMEDY FOR ALL is to protect vulnerable groups/);
});

test("about pages: legal identity and no member names", () => {
  for (const path of ["/about/", "/en/about/"]) {
    const text = visibleText(read(path));
    assert.match(text, /174746001000/);
    assert.match(text, /2024/);
    assert.match(text, /Αστική Μη Κερδοσκοπική Εταιρία/);
  }
  assert.match(visibleText(read("/about/")), /Δήμος Αθηναίων/);
  assert.match(visibleText(read("/en/about/")), /Municipality of Athens/);
});

test("what-we-do pages: eleven purposes in each language", () => {
  for (const path of ["/what-we-do/", "/en/what-we-do/"]) {
    const html = read(path);
    const list = html.match(/<ul class="purposes"[^>]*>([\s\S]*?)<\/ul>/);
    assert.ok(list, "purposes list missing");
    assert.equal((list[1].match(/<li/g) || []).length, 11);
  }
});

test("contact pages: coming soon, no details", () => {
  assert.match(visibleText(read("/contact/")), /θα δημοσιευτούν σύντομα/);
  assert.match(visibleText(read("/en/contact/")), /will be published soon/);
});

test("sitemap lists the eight pages under the site URL", () => {
  const xml = readFileSync(join(DIST, "sitemap.xml"), "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort();
  assert.deepEqual(locs, ALL.map((p) => SITE_URL + p.path).sort());
});

test("robots.txt points at the sitemap", () => {
  const txt = readFileSync(join(DIST, "robots.txt"), "utf8");
  assert.match(txt, /User-agent: \*/);
  assert.ok(txt.includes(`Sitemap: ${SITE_URL}/sitemap.xml`));
});
