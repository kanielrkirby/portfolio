import { defineConfig } from "astro/config";
import prefetch from "@astrojs/prefetch";
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";

export default defineConfig({
  integrations: [prefetch(), image(), tailwind(), compress()],
});
