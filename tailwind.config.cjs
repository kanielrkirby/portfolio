/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Comfortaa", "sans-serif"],
        body: ["Fira Monospace", "monospace"],
      },
    },
  },
  plugins: [],
  exclude: ["node_modules"],
};
