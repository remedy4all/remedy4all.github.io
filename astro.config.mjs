import { defineConfig } from "astro/config";
import { SITE_URL } from "./site.config.mjs";

export default defineConfig({
  site: SITE_URL,
  // The test fixture build (CONTENT_ROOT set) keeps its own content cache, so fixture entries can
  // never reach a real build through the shared cache.
  ...(process.env.CONTENT_ROOT ? { cacheDir: "./node_modules/.astro-fixture" } : {}),
  trailingSlash: "always",
  i18n: {
    defaultLocale: "el",
    locales: ["el", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
