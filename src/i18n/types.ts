// Every string a page shows, per language. Both dictionaries must satisfy this type, so a
// missing translation fails `npm run check`.

export type Lang = "el" | "en";
export type PageKey = "home" | "about" | "whatWeDo" | "contact";

export interface PageMeta {
  /** Navigation label and the page's own heading. */
  title: string;
  /** Meta and Open Graph description. */
  description: string;
}

export interface Dictionary {
  /** Name of the language, written in that language, for the switch. */
  languageName: string;
  /** Open Graph locale. */
  ogLocale: string;
  skipToContent: string;
  navLabel: string;
  switchLabel: string;
  pages: Record<PageKey, PageMeta>;

  /** Art. 4.1: one sentence of purpose. */
  purposeSentence: string;

  home: {
    links: Record<Exclude<PageKey, "home">, string>;
  };

  about: {
    intro: string;
    fields: {
      fullName: [string, string];
      title: [string, string];
      legalForm: [string, string];
      founded: [string, string];
      gemi: [string, string];
      seat: [string, string];
    };
    nameAbroad: string;
    purposesSetBy: string;
    purposesLink: string;
  };

  whatWeDo: {
    listIntro: string;
    /** Art. 4.2 items 1 to 9, 11 and 12. Item 10 is not shown. */
    purposes: string[];
    indicative: string;
  };

  contact: {
    /** Shown in place of a contact value that is still a placeholder. */
    comingSoon: string;
    labels: { email: string; phone: string; address: string };
  };

  footer: {
    legal: string;
    /** Supporter credit label, followed by the company name. */
    supportedBy: string;
  };

  /** Alt text of the Open Graph image. */
  ogImageAlt: string;
}
