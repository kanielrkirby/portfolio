/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{ts,tsx}"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "clamp-1": "clamp(0.8rem, calc(.4vw + .8rem), 1rem)",
        "clamp-2": "clamp(0.85rem, calc(.4vw + .85rem), 1.1rem)",
        "clamp-3": "clamp(0.95rem, calc(.4vw + .95rem), 1.2rem)",
        "clamp-4": "clamp(1.1rem, calc(.4vw + 1.1rem), 1.3rem)",
        "clamp-5": "clamp(1.2rem, calc(.4vw + 1.2rem), 1.4rem)",
        "clamp-6": "clamp(1.3rem, calc(.4vw + 1.3rem), 1.5rem)",
      },
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
  plugins: ["@tailwindcss/line-clamp"],
  exclude: ["node_modules"],
};
