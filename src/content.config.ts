// Actions and news: one Markdown file per entry in src/content/<section>/. Both are empty for now.
// Frontmatter: title, date (YYYY-MM-DD), language (el or en), summary; the body is the entry text.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Tests point this at tests/fixtures/content to build the populated state. Never set for a release.
// Read through globalThis so the type check needs no Node type definitions.
const env = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env;
const root = env?.CONTENT_ROOT ?? "./src/content";

const schema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  language: z.enum(["el", "en"]),
  summary: z.string(),
});

const section = (name: string) =>
  defineCollection({ loader: glob({ pattern: "**/*.md", base: `${root}/${name}` }), schema });

export const collections = {
  actions: section("actions"),
  news: section("news"),
};
