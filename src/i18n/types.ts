// Every string a page shows, per language. Both dictionaries must satisfy this type, so a
// missing translation fails `npm run check`.

export type Lang = "el" | "en";
export type PageKey = "home" | "about" | "whatWeDo" | "actions" | "news" | "contact";
export type Section = "actions" | "news";

export interface PageMeta {
  /** Navigation label and the page's own heading. */
  title: string;
  /** Main heading with "[...]" around the marked words, when it differs from the title. */
  heading?: string;
  /** Meta and Open Graph description. */
  description: string;
}

export type AreaIcon = "scale" | "heart-handshake" | "clipboard-list" | "graduation-cap" | "handshake" | "file-check";
/** Every Lucide icon copied into src/icons/. */
export type IconName = AreaIcon | "mail" | "phone" | "map-pin" | "construction";

export interface AreaCard {
  /** Anchor on the What we do page: area-1 to area-6. */
  id: string;
  icon: AreaIcon;
  title: string;
  /** One line, faithful to the statute items it covers, adding nothing. */
  line: string;
}

export interface Dictionary {
  /** Name of the language, written in that language, for the switch. */
  languageName: string;
  /** Two-letter code shown in the switch: EL or EN. */
  languageCode: string;
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
    heroHeadline: string;
    /** The brand line, set as text. */
    tagline: string;
    heroCta: string;
  };

  /** Six areas of work, each written from the Art. 4.2 items it covers. */
  areas: AreaCard[];

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
    /** Heading above the full statutory list. */
    statuteHeading: string;
    listIntro: string;
    /** Art. 4.2 items 1 to 9, 11 and 12. Item 10 is not shown. */
    purposes: string[];
    indicative: string;
  };

  sections: {
    /** The landing page statement while a section has no entries. */
    underConstruction: string;
    /** The home page card text for a section with no entries. */
    underConstructionShort: string;
    /** Locale for entry dates. */
    dateLocale: string;
  };

  contact: {
    /** Shown in place of a contact value that is still a placeholder. */
    comingSoon: string;
    labels: { email: string; phone: string; address: string };
  };

  footer: {
    /** Legal identity, two short lines. */
    legal: [string, string];
    /** Supporter credit label, followed by the company name. */
    supportedBy: string;
  };

  /** Alt text of the Open Graph image. */
  ogImageAlt: string;
}
