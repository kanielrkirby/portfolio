/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Comfortaa", "sans-serif"],
        body: ["Fira Monospace", "monospace"],
      },
      animation: {
        "spin-slow": "spin 2.5s cubic-bezier(0.42, 0.0, 0.58, 1.0) infinite",
        spin: "spin 1.25s linear infinite",
      },
    },
  },
  plugins: [],
  exclude: ["node_modules"],
};
