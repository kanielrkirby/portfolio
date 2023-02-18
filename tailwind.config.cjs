/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Comfortaa", "sans-serif"],
        body: ["Fira Monospace", "monospace"],
      },
      // keyframes: {
      //   wiggle: {
      //     "0%, 100%": { transform: "rotate(-3deg)" },
      //     "50%": { transform: "rotate(3deg)" },
      //   },
      // },
      // animation: {
      //   wiggle: "wiggle 1s ease-in-out infinite",
      // },
    },
  },
  plugins: [],
  exclude: ["node_modules"],
};
