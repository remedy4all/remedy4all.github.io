import type { APIRoute } from "astro";
import { LANGS, PAGES, pathFor } from "../i18n";

export const GET: APIRoute = ({ site }) => {
  const urls = LANGS.flatMap((lang) => PAGES.map((page) => new URL(pathFor(lang, page), site).href));
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((loc) => `  <url><loc>${loc}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
