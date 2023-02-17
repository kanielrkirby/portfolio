/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["", "sans-serif"],
        body: ["", "sans-serif"],
      },
    },
  },
  plugins: [],
  exclude: ["node_modules"],
};
