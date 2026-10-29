import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang, Section } from "../i18n";

export type Entry = CollectionEntry<Section>;

/** A section's entries in one language, newest first (ties by title). */
export async function entriesFor(section: Section, lang: Lang): Promise<Entry[]> {
  const all = await getCollection(section);
  return all
    .filter((entry) => entry.data.language === lang)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title));
}

export function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(date);
}
