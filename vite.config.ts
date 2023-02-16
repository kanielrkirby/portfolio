import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwind from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwind],
    },
  },
});
