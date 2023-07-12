import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 1.5s cubic-bezier(0.42, 0.0, 0.58, 1.0) infinite",
        spin: "spin 1s linear infinite",
      },
      fontFamily: {
        body: ["Fira Mono", ...defaultTheme.fontFamily.mono],
        display: ["Comfortaa", ...defaultTheme.fontFamily.sans],
        card: "Courier",
      },
    },
  },
  plugins: [],
};
