const plugin = require("tailwindcss/plugin");
const tailwindcssTt = require("./tailwindcss-tt/index.cjs");
const defaultTheme = require("tailwindcss/defaultTheme");
// import defaultTheme from "tailwindcss/defaultTheme";
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
        display: ["Courier", "monospace", ...defaultTheme.fontFamily.mono],
        sans: ["Comfortaa", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    tailwindcssTt,
    plugin(({ addComponents, addVariant }) => {
      addComponents({
        ".absolute-center-within": {
          position: "relative",
          "*": {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            margin: "auto",
          },
        },
        ".absolute-center": {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          margin: "auto",
        },
      });
      addVariant("*", "& > *");
    }),
  ],
};
