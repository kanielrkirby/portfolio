import { defineConfig } from 'astro/config';
import prefetch from "@astrojs/prefetch";
import image from "@astrojs/image";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [prefetch(), image(), solidJs(), tailwind(), compress()]
});