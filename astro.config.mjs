import { defineConfig } from "astro/config";
import prefetch from "@astrojs/prefetch";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
// import netlify from "@astrojs/netlify/functions";

import swup from "@swup/astro";

// https://astro.build/config
export default defineConfig({
  image: { service: { entrypoint: "astro/assets/services/sharp" } },
  site: "https://kanielrkirby.com",
  compressHTML: true,
  redirects: {
    "/projects": "/",
    "*": "/404",
  },
  integrations: [
    prefetch(),
    tailwind(),
    compress(),
    swup({
      theme: "slide",
      reloadScripts: false,
      progress: true,
    }),
  ],
  experimental: {
    assets: true,
  },

  // output: "server",
  // adapter: netlify()
});
