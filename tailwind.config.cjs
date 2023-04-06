/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{ts,tsx}"],
  content: ["./src/**/*.{ts,tsx}"],
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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  exclude: ["node_modules"],
};
