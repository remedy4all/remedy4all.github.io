import { el } from "./el";
import { en } from "./en";
import type { Dictionary, Lang, PageKey, Section } from "./types";

export type { Dictionary, Lang, PageKey, Section } from "./types";

export const LANGS: Lang[] = ["el", "en"];
export const PAGES: PageKey[] = ["home", "about", "whatWeDo", "actions", "news", "contact"];
export const SECTIONS: Section[] = ["actions", "news"];

const dictionaries: Record<Lang, Dictionary> = { el, en };

// Both languages share the slugs; English is prefixed with /en/.
const SLUGS: Record<PageKey, string> = {
  home: "",
  about: "about/",
  whatWeDo: "what-we-do/",
  actions: "actions/",
  news: "news/",
  contact: "contact/",
};

export function t(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export function pathFor(lang: Lang, page: PageKey): string {
  return (lang === "el" ? "/" : "/en/") + SLUGS[page];
}

/** Page of one actions or news entry; `id` is the entry's file name without extension. */
export function entryPath(lang: Lang, section: Section, id: string): string {
  return `${pathFor(lang, section)}${id}/`;
}

export function otherLang(lang: Lang): Lang {
  return lang === "el" ? "en" : "el";
}
