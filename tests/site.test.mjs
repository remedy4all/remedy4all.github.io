// Build-output tests. Run `npm run build` first, then `npm test`.
// They enforce the site's content, language and privacy rules on what visitors actually get.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { SITE_URL } from "../site.config.mjs";

const DIST = new URL("../dist/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const PAGES = [
  { el: "/", en: "/en/" },
  { el: "/about/", en: "/en/about/" },
  { el: "/what-we-do/", en: "/en/what-we-do/" },
  { el: "/actions/", en: "/en/actions/" },
  { el: "/news/", en: "/en/news/" },
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

test("exactly twelve pages are built, and no entry pages", () => {
  const pages = [];
  const walk = (dir, rel) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(join(dir, e.name), `${rel}${e.name}/`);
      else if (e.name.endsWith(".html")) pages.push(rel + e.name);
    }
  };
  walk(DIST, "/");
  assert.deepEqual(pages.map((p) => p.replace(/index\.html$/, "")).sort(), ALL.map((p) => p.path).sort());
});

test("actions and news landing pages: heading and under-construction statement only", () => {
  const cases = [
    ["/actions/", "Δράσεις", "Η ενότητα είναι υπό κατασκευή"],
    ["/news/", "Νέα", "Η ενότητα είναι υπό κατασκευή"],
    ["/en/actions/", "Actions", "This section is under construction"],
    ["/en/news/", "News", "This section is under construction"],
  ];
  for (const [path, heading, statement] of cases) {
    const html = read(path);
    const main = html.match(/<main\b[\s\S]*?<\/main>/)[0];
    assert.match(main, new RegExp(`<h1><span class="marker">${heading}</span></h1>`));
    assert.match(main, new RegExp(`<div class="uc-note card framed">[\\s\\S]*?<picture>[\\s\\S]*?07-under-construction[\\s\\S]*?<\/picture>[\\s\\S]*?<p class="under-construction">${statement}\\.</p>\\s*<svg class="motif motif-inline`));
    assert.equal(visibleText(main).trim(), `${heading} ${statement}.`, `${path} must say nothing else`);
  }
});

test("no page shows an item or a date", () => {
  for (const { path } of ALL) {
    const html = read(path);
    assert.doesNotMatch(html, /<time\b|class="entries"|class="entry"/, path);
  }
});

test("home pages mark actions and news as under construction", () => {
  for (const [path, soon, labels] of [
    ["/", "Υπό κατασκευή.", ["Δράσεις", "Νέα"]],
    ["/en/", "Under construction.", ["Actions", "News"]],
  ]) {
    const html = read(path);
    for (const label of labels) {
      assert.match(html, new RegExp(`<li class="card">\\s*<a href="[^"]+">${label}</a>\\s*<p>${soon}</p>`), `${path} ${label}`);
    }
  }
});

for (const { lang, path, counterpart } of ALL) {
  test(`${path}: language, navigation and switch`, () => {
    const html = read(path);
    assert.match(html, new RegExp(`<html lang="${lang}"`));
    const nav = html.match(/<nav\b[\s\S]*?<\/nav>/)[0];
    const order = [...nav.matchAll(/<a href="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(order, NAV[lang], "navigation: home, about, what we do, actions, news, contact");
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
    assert.match(html, /<link rel="icon"[^>]+href="\/favicon-32\.png"/);
    assert.equal(attr(html, /<meta property="og:image" content="([^"]+)"/), `${SITE_URL}/brand/og-image.png`);
    assert.match(html, /<meta property="og:image:alt" content="[^"]+"/);
    assert.equal(attr(html, /<link rel="canonical" href="([^"]+)"/), SITE_URL + path);
  });

  test(`${path}: no placeholder text, contact links or personal data`, () => {
    const html = read(path);
    const text = visibleText(html);
    assert.doesNotMatch(text, /lorem|ipsum|\bTBD\b|\bTODO\b|placeholder|not-yet-chosen/i);
    assert.doesNotMatch(html, /mailto:|tel:/i);
    assert.doesNotMatch(html, /__PLACEHOLDER/i, "a placeholder contact value reached the page");
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

test("contact pages: each placeholder field reads coming soon", () => {
  const count = (html, s) => visibleText(html).split(s).length - 1;
  assert.equal(count(read("/contact/"), "Σύντομα διαθέσιμο"), 3);
  assert.equal(count(read("/en/contact/"), "Coming soon"), 3);
});

for (const { lang, path, counterpart } of ALL) {
  test(`${path}: logo in header and footer, supporter credit in the page's language`, () => {
    const html = read(path);
    const header = html.match(/<header[\s\S]*?<\/header>/)[0];
    assert.match(header, new RegExp(`<a class="brand" href="${lang === "el" ? "/" : "/en/"}">\\s*<img src="/brand/remedy-logo-light-header.png"[^>]*alt="Remedy for All"`));
    const footer = html.match(/<footer[\s\S]*?<\/footer>/)[0];
    assert.match(footer, /src="\/brand\/remedy-logo-dark.png"/);
    assert.match(footer, /<a href="https:\/\/www\.csl\.gr">\s*<span class="logo-chip"><img src="\/brand\/cssa-logo.png"/);
    assert.match(visibleText(footer), new RegExp(`${lang === "el" ? "Με την υποστήριξη της" : "Supported by"} Computer Solutions S\\.A\\.`));
    assert.match(footer, /<p class="legal">[^<]+<br>[^<]+<\/p>/, "legal line on two lines");
    assert.doesNotMatch(html, /footer-credit/, "the credit sits inside the navy band");
  });

  test(`${path}: EL / EN switch in header and footer, current language marked`, () => {
    const html = read(path);
    const other = lang === "el" ? "en" : "el";
    for (const part of [html.match(/<header[\s\S]*?<\/header>/)[0], html.match(/<footer[\s\S]*?<\/footer>/)[0]]) {
      const sw = part.match(/<div class="lang-switch"[\s\S]*?<\/div>/)[0];
      assert.match(sw, new RegExp(`<span class="lang-current" aria-current="true" lang="${lang}">${lang.toUpperCase()}</span>`));
      assert.match(sw, new RegExp(`<a href="${counterpart}" lang="${other}" hreflang="${other}">${other.toUpperCase()}`));
      const shown = visibleText(sw.replace(/<span class="sr-only">[\s\S]*?<\/span>/g, "")).trim();
      assert.equal(shown, "EL / EN");
    }
  });
}

test("home hero: headline, tagline as text, link to the cards, decorative responsive image", () => {
  for (const [path, headline, cta, href] of [
    ["/", "Προστατεύουμε και στηρίζουμε ευάλωτες ομάδες του πληθυσμού.", "Τι κάνουμε", "/what-we-do/#areas"],
    ["/en/", "We protect and support vulnerable groups.", "What we do", "/en/what-we-do/#areas"],
  ]) {
    const html = read(path);
    const hero = html.match(/<section class="band hero">[\s\S]*?<\/section>/)[0];
    const h1 = hero.match(/<h1>([\s\S]*?)<\/h1>/)[1];
    assert.equal(h1.replace(/<[^>]+>/g, "").trim(), headline);
    assert.match(h1, /<span class="marker">[^<]+<\/span>/, "key words are marked");
    assert.match(hero, /<p class="tagline" lang="en">Together in Support<\/p>/);
    assert.match(hero, new RegExp(`<a class="button" href="${href}">${cta}</a>`));
    assert.match(hero, /<source srcset="[^"]+\.avif 800w, [^"]+\.avif 1600w" type="image\/avif"/);
    assert.match(hero, /<source srcset="[^"]+\.webp 800w, [^"]+\.webp 1600w" type="image\/webp"/);
    assert.match(hero, /<img src="[^"]+\.jpg"[^>]* alt(="")?[ >][^>]*width="1600" height="679"/);
    assert.doesNotMatch(html, /hero-title|<h1>REMEDY FOR ALL<\/h1>/, "the old large name heading is gone");
    assert.equal((html.match(/<section class="band/g) || []).length, 4, "hero, quote, areas, links");
  }
});

test("hero image files are 250 KB or less", () => {
  const dir = join(DIST, "_astro");
  const files = readdirSync(dir).filter((f) => f.startsWith("hero-banner"));
  assert.ok(files.some((f) => f.endsWith(".avif")) && files.some((f) => f.endsWith(".webp")) && files.some((f) => f.endsWith(".jpg")));
  for (const f of files) assert.ok(statSync(join(dir, f)).size <= 250 * 1024, `${f} is over 250 KB`);
});

test("what we do: six icon cards above the full statutory list, in both languages", () => {
  for (const [path, heading] of [["/what-we-do/", "Όπως ορίζει το καταστατικό"], ["/en/what-we-do/", "As set out in the statute"]]) {
    const html = read(path);
    const cards = [...html.matchAll(/<li class="card area" id="(area-\d)">\s*<div class="card-media">\s*<picture>[\s\S]*?<\/picture>\s*<\/div>\s*<h2>([^<]+)<\/h2>\s*<p>([^<]+)<\/p>/g)];
    assert.deepEqual(cards.map((m) => m[1]), ["area-1", "area-2", "area-3", "area-4", "area-5", "area-6"], path);
    const statute = html.indexOf(`<h2>${heading}</h2>`);
    assert.ok(statute > html.lastIndexOf('class="card area"'), "full list comes after the cards");
    const list = html.slice(statute).match(/<ul class="purposes"[^>]*>([\s\S]*?)<\/ul>/);
    assert.equal((list[1].match(/<li/g) || []).length, 11);
  }
});

test("home links to each of the six cards", () => {
  for (const [path, base] of [["/", "/what-we-do/"], ["/en/", "/en/what-we-do/"]]) {
    const html = read(path);
    for (let i = 1; i <= 6; i++) assert.ok(html.includes(`href="${base}#area-${i}"`), `${path} → area-${i}`);
  }
});

test("site URL is https://remedy4all.github.io", () => {
  assert.equal(SITE_URL, "https://remedy4all.github.io");
  assert.equal(attr(read("/"), /<link rel="canonical" href="([^"]+)"/), "https://remedy4all.github.io/");
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

// Graphic devices (REQ-REMD-014 addendum). All decorative: hidden from assistive technology.
const motifsCrossing = (html) => (html.match(/<svg class="motif motif-(?:top|bottom) /g) || []).length;

test("home: navy quote band with the purpose sentence, framed, crossed by the line motif", () => {
  for (const [path, sentence] of [["/", "Σκοπός της REMEDY FOR ALL"], ["/en/", "The purpose of REMEDY FOR ALL"]]) {
    const html = read(path);
    const quote = html.match(/<section class="band band-quote">[\s\S]*?<\/section>/)[0];
    assert.match(quote, new RegExp(`<p class="quote framed">${sentence}`));
    assert.equal(motifsCrossing(quote), 2, "motif crosses both edges of the quote band");
    assert.ok(motifsCrossing(html) >= 3, "at least two section boundaries crossed on home");
  }
});

for (const { path } of ALL) {
  test(`${path}: decorations are hidden from assistive technology, and devices are present`, () => {
    const html = read(path);
    const main = html.match(/<main\b[\s\S]*?<\/main>/)[0];
    for (const svg of main.match(/<svg\b[^>]*>/g) || []) assert.match(svg, /aria-hidden="true"/, svg);
    for (const div of main.match(/<div class="band-shapes"[^>]*>/g) || []) assert.match(div, /aria-hidden="true"/);
    assert.ok(motifsCrossing(main) >= 1, "line motif crosses at least one section boundary");
    assert.match(main, /class="band-shapes"/, "paper-cut shape present");
    assert.match(main, /<h1>[\s\S]*?<span class="marker">[^<]+<\/span>[\s\S]*?<\/h1>/, "marker in the main heading");
    assert.match(main, /class="[^"]*\bframed\b/, "one framed block");
  });
}

test("contact fields carry icon badges", () => {
  for (const path of ["/contact/", "/en/contact/"]) {
    const dts = read(path).match(/<dt>[\s\S]*?<\/dt>/g);
    assert.equal(dts.length, 3);
    for (const dt of dts) assert.match(dt, /<span class="icon">[\s\S]*?<svg aria-hidden="true"/);
  }
});

// Spot illustrations (REQ-REMD-016).
const spotPicture = (html, n) =>
  html.match(new RegExp(`<picture>(?:(?!</picture>)[\\s\\S])*?/_astro/0${n}-[^"]+[\\s\\S]*?</picture>`));

test("area cards show their spot illustration, decorative, AVIF and WebP at 300w and 600w", () => {
  for (const path of ["/what-we-do/", "/en/what-we-do/", "/", "/en/"]) {
    const html = read(path);
    for (let n = 1; n <= 6; n++) {
      const pic = spotPicture(html, n);
      assert.ok(pic, `${path}: spot 0${n} missing`);
      assert.match(pic[0], /<source srcset="[^"]+\.avif 300w, [^"]+\.avif 600w" type="image\/avif"/);
      assert.match(pic[0], /<img src="[^"]+\.webp" srcset="[^"]+\.webp 300w, [^"]+\.webp 600w"[^>]* alt(="")?[ >]/);
      assert.match(pic[0], /width="\d+" height="\d+"/);
      assert.match(pic[0], /loading="lazy"/);
    }
  }
});

test("under-construction notes show illustration 07 in both languages", () => {
  for (const path of ["/actions/", "/news/", "/en/actions/", "/en/news/"]) {
    const note = read(path).match(/<div class="uc-note card framed">[\s\S]*?<\/div>\s*<\/div>|<div class="uc-note card framed">[\s\S]*?<p class="under-construction">/)[0];
    assert.match(note, /07-under-construction[^"]*\.avif 300w/);
  }
});

test("spot illustration files are 60 KB or less", () => {
  const dir = join(DIST, "_astro");
  const files = readdirSync(dir).filter((f) => /^0[1-7]-/.test(f));
  for (let n = 1; n <= 7; n++) {
    assert.ok(files.some((f) => f.startsWith(`0${n}-`) && f.endsWith(".avif")), `0${n} avif`);
    assert.ok(files.some((f) => f.startsWith(`0${n}-`) && f.endsWith(".webp")), `0${n} webp`);
  }
  for (const f of files) assert.ok(statSync(join(dir, f)).size <= 60 * 1024, `${f} is over 60 KB`);
});
