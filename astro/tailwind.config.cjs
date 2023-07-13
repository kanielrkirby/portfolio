/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
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
        display: ["Courier", "monospace", ...defaultTheme.fontFamily.mono],
        sans: ["Comfortaa", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
