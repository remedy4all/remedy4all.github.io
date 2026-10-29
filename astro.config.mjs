import { defineConfig } from "astro/config";
import { SITE_URL } from "./site.config.mjs";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "always",
  i18n: {
    defaultLocale: "el",
    locales: ["el", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
