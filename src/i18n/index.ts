import { el } from "./el";
import { en } from "./en";
import type { Dictionary, Lang, PageKey } from "./types";

export type { Dictionary, Lang, PageKey } from "./types";

export const LANGS: Lang[] = ["el", "en"];
export const PAGES: PageKey[] = ["home", "about", "whatWeDo", "contact"];

const dictionaries: Record<Lang, Dictionary> = { el, en };

// Both languages share the slugs; English is prefixed with /en/.
const SLUGS: Record<PageKey, string> = {
  home: "",
  about: "about/",
  whatWeDo: "what-we-do/",
  contact: "contact/",
};

export function t(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export function pathFor(lang: Lang, page: PageKey): string {
  return (lang === "el" ? "/" : "/en/") + SLUGS[page];
}

export function otherLang(lang: Lang): Lang {
  return lang === "el" ? "en" : "el";
}
