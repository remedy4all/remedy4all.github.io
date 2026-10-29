// English translates the Greek in el.ts. It does not improve on it or add to it.
import type { Dictionary } from "./types";

export const en: Dictionary = {
  languageName: "English",
  languageCode: "EN",
  ogLocale: "en_GB",
  skipToContent: "Skip to content",
  navLabel: "Main navigation",
  switchLabel: "Language",
  pages: {
    home: {
      title: "Home",
      description:
        "REMEDY FOR ALL is a non-profit civil company for the protection of vulnerable groups of the population.",
    },
    about: {
      title: "About us",
      heading: "About [us]",
      description: "Legal form, founding, ΓΕΜΗ number and seat of REMEDY FOR ALL.",
    },
    whatWeDo: {
      title: "What we do",
      heading: "What [we do]",
      description: "The purposes of REMEDY FOR ALL, as set out in Article 4 of its statute.",
    },
    actions: {
      title: "Actions",
      description: "The Actions section of REMEDY FOR ALL.",
    },
    news: {
      title: "News",
      description: "The News section of REMEDY FOR ALL.",
    },
    contact: {
      title: "Contact",
      description: "Contacting REMEDY FOR ALL.",
    },
  },

  purposeSentence:
    "The purpose of REMEDY FOR ALL is to protect vulnerable groups of the population, in particular people without means, people addicted to substances or gambling, abused women, refugees, unaccompanied minors and victims of human trafficking.",

  home: {
    links: {
      about: "The company's legal identity.",
      whatWeDo: "Its purposes, as set out in its statute.",
      actions: "The company's actions.",
      news: "The company's news.",
      contact: "Contact details.",
    },
    heroHeadline: "We protect and support [vulnerable groups].",
    tagline: "Together in Support",
    heroCta: "What we do",
  },

  areas: [
    {
      id: "area-1",
      icon: "scale",
      title: "Proposals for the legal framework",
      line: "Studies and evidence-based proposals to improve the legal position of vulnerable groups.",
    },
    {
      id: "area-2",
      icon: "heart-handshake",
      title: "Social inclusion and preventing stigma",
      line: "Opportunities for social inclusion, and action to prevent stigma and marginalisation.",
    },
    {
      id: "area-3",
      icon: "clipboard-list",
      title: "Tools for frontline staff",
      line: "Tools for the staff of protection bodies, to organise and follow reintegration.",
    },
    {
      id: "area-4",
      icon: "graduation-cap",
      title: "Education, health and legal support",
      line: "Conferences, seminars and educational events, and programmes of health education and legal support.",
    },
    {
      id: "area-5",
      icon: "handshake",
      title: "Partnerships and consulting",
      line: "Partnerships and joint activities with bodies at national and international level, and consulting on related projects.",
    },
    {
      id: "area-6",
      icon: "file-check",
      title: "Programmes and resources",
      line: "Applying to programmes in Greece and abroad, to secure the necessary resources.",
    },
  ],

  about: {
    intro:
      "The legal identity of REMEDY FOR ALL, as set out in its statute and its registration in the General Commercial Registry (ΓΕΜΗ).",
    fields: {
      fullName: ["Name", "REMEDY FOR ALL ΑΣΤΙΚΗ ΜΗ ΚΕΡΔΟΣΚΟΠΙΚΗ ΕΤΑΙΡΙΑ"],
      title: ["Distinctive title", "REMEDY FOR ALL"],
      legalForm: [
        "Legal form",
        "Non-profit civil company (Αστική Μη Κερδοσκοπική Εταιρία), Articles 61 ff. and 741 ff. of the Greek Civil Code",
      ],
      founded: ["Founded", "5 January 2024"],
      gemi: ["General Commercial Registry (ΓΕΜΗ) number", "174746001000"],
      seat: ["Seat", "Municipality of Athens"],
    },
    nameAbroad: "Under the statute, the name may be used untranslated abroad.",
    purposesSetBy: "The company's purposes are set out in its statute.",
    purposesLink: "See the purposes",
  },

  whatWeDo: {
    statuteHeading: "As set out in the statute",
    listIntro: "Under Article 4 of its statute, these purposes are set out in detail as follows:",
    purposes: [
      "Preparing, publishing, proposing and implementing evidence-based proposals and studies to improve the legal position of these vulnerable groups.",
      "Providing opportunities for social inclusion to socially vulnerable groups.",
      "Providing the staff of the bodies that protect these groups with the tools they need to organise and follow the reintegration of each of their members.",
      "Organising conferences, one-day meetings, seminars, events and lectures of educational content, within its field of responsibility and activity.",
      "Action to prevent the stigmatisation and social marginalisation of these groups.",
      "Developing programmes of education on health and on legal support for these groups.",
      "Developing partnerships with bodies of the public, private and wider public sector, international organisations, local government and regions, to achieve its purposes.",
      "Joint activities with other associations, companies, for-profit or not, organisations, bodies and public or private institutions, at local, regional, national and international level.",
      "Providing consulting services for the design, implementation and management of projects related to its purposes.",
      "Any other action or activity that can strengthen its work.",
      "Submitting proposals to take part in relevant programmes, in Greece and abroad, to secure the necessary resources.",
    ],
    indicative: "Under the statute, this list is indicative and not exhaustive.",
  },

  sections: {
    underConstruction: "This section is under construction.",
    underConstructionShort: "Under construction.",
    dateLocale: "en-GB",
  },

  contact: {
    comingSoon: "Coming soon",
    labels: { email: "Email", phone: "Phone", address: "Postal address" },
  },

  footer: {
    legal: ["REMEDY FOR ALL non-profit civil company", "ΓΕΜΗ 174746001000 · Municipality of Athens"],
    supportedBy: "Supported by",
  },

  ogImageAlt: "The REMEDY FOR ALL logo",
};
