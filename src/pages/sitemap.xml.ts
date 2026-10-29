import type { APIRoute } from "astro";
import { LANGS, PAGES, SECTIONS, entryPath, pathFor } from "../i18n";
import { entriesFor } from "../lib/entries";

export const GET: APIRoute = async ({ site }) => {
  const paths = LANGS.flatMap((lang) => PAGES.map((page) => pathFor(lang, page)));
  for (const lang of LANGS) {
    for (const section of SECTIONS) {
      for (const entry of await entriesFor(section, lang)) paths.push(entryPath(lang, section, entry.id));
    }
  }
  const urls = paths.map((path) => new URL(path, site).href);
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((loc) => `  <url><loc>${loc}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
