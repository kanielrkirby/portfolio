const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

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
        display: ["Comfortaa", ...defaultTheme.fontFamily.sans],
        body: ["Courier New", "monospace", ...defaultTheme.fontFamily.mono],
        secondary: ["Courier", "monospace", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    plugin(({ addComponents, addVariant, matchVariant, addBase, theme }) => {
      addBase({
        "@font-face": {
          "font-family": "Comfortaa",
          src: `url("/src/assets/fonts/Comfortaa/Comfortaa-VariableFont_wght.ttf"),
            url("https://fonts.bunny.net/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap")`,
        },
        "h1,h2,h3,h4,h5,h6": {
          "font-family": theme("fontFamily.display"),
          "font-weight": theme("fontWeight.bold"),
        },
        ".modal": {
          "&.is-open": {
            "pointer-events": "auto",
            opacity: 1,
          },
          "*": {
            "text-shadow": "none",
            "--tw-text-opacity": "1",
            color: "rgb(0,0,0,var(--tw-text-opacity))",
          },
        },
        "*": {
          "font-family": theme("fontFamily.body"),
          "font-size": theme("fontSize.lg"),
          color: "white",
          "text-shadow": "1px 1px 4px #00000090",
          "&::selection": {
            color: "black",
            "background-color": colors.green[300],
          },
        },
        "html.inverted *::selection": {
          "background-color": colors.red[300],
        },
        h1: {
          "font-size": theme("fontSize.4xl"),
        },
        h2: {
          "font-size": theme("fontSize.3xl"),
        },
        h3: {
          "font-size": theme("fontSize.2xl"),
        },
        h4: {
          "font-size": theme("fontSize.xl"),
        },
        "picture img": {
          "background-color": "#00000050",
          display: "flex",
          "justify-content": "center",
          "items-center": "center",
          width: "100%",
          height: "100%",
          "text-align": "center",
          "vertical-align": "middle",
        },
      });
      const flattened = flattenColorPalette(theme("colors"));
      const cols = Object.entries(flattened).map(([name, value]) => ({
        [`.link-${name}`]: {
          color: value + "!important",
        },
        [`.link-bg-${name}`]: {
          "&::after": {
            "background-color": value + "!important",
          },
        },
      }));
      addComponents({
        ".absolute-center": {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          margin: "auto",
        },
        ...Object.assign({}, ...cols),
        ".link": {
          position: "relative",
          "font-weight": "bold",
          color: colors.green[300],
          "text-shadow": "0 0 5px #00000030",
          "transition-property": "all",
          "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
          "transition-duration": "200ms",
          cursor: "pointer",
          "&::after": {
            "z-index": -10,
            "border-radius": "2px",
            "transition-property": "all",
            "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
            "transition-duration": "200ms",
            content: "''",
            "pointer-events": "none",
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            "margin-left": "auto",
            "margin-right": "auto",
            height: "100%",
            width: "0%",
            "background-color": colors.green[300],
          },
          "&:hover": {
            color: "black",
            "&::after": {
              "--tw-scale-x": "1.15 !important",
              "--tw-scale-y": "1.05 !important",
              transform:
                "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
              width: "100%",
            },
          },
        },
        "html.inverted .link::after": {
          "background-color": colors.red[300],
        },
      });
      addVariant("flip", ".flipped & ");
      addVariant("*", "& > *");
      matchVariant("**", (selector) => "& > " + selector);
      matchVariant(
        "nth",
        (selector) =>
          `&${selector
            .split("-")
            .map(
              (elem, index) => `:nth-child(${index % 2 ? "-" : ""}n+${elem})`
            )
            .join("")}`
      );
      matchVariant("descends", (selector) => selector + " & ");
    }),
    plugin(({ addBase, addComponents, addUtilities }) => {
      addBase({
        ".tt-b,.tt-br,.tt-bl,.tt-t,.tt-tr,.tt-tl,.tt-l,.tt-r": {
          position: "relative",
          "&::after,&::before": {
            transform: "translate3d(0, 0, 0)",
            "-webkit-backface-visibility": "hidden",
            "backface-visibility": "hidden",
            "will-change": "transform",
            opacity: 0,
            "pointer-events": "none",
            transition:
              "all var(--microtip-transition-duration, 0.18s) var(--microtip-transition-easing, ease-in-out) var(--microtip-transition-delay, 0s)",
            position: "absolute",
            "box-sizing": "border-box",
            "z-index": 10,
            "transform-origin": "top",
          },
          "&::before": {
            "background-size": "100% auto !important",
            content: "''",
          },
          "&::after": {
            background: "rgba(40, 40, 40, 1)",
            "border-radius": "4px",
            color: "#fff",
            content: "attr(aria-label)",
            "font-size": "var(--microtip-font-size, 13px)",
            "font-weight": "var(--microtip-font-weight, normal)",
            "text-transform": "var(--microtip-text-transform, none)",
            padding: "0.5em 1em",
            "white-space": "nowrap",
            "box-sizing": "content-box",
            "font-family": "'Courier', 'monospace'",
            "font-size": "0.85rem",
          },
          "&:hover,&:focus": {
            "&::after,&::before": {
              opacity: 1,
              "pointer-events": "auto",
            },
          },
        },
        ".tt-t,.tt-tl,.tt-tr": {
          "&::before": {
            background: `url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba%2840,%2040,%2040,%2001%29%22%20transform%3D%22rotate%280%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E") 
no-repeat`,
            height: "6px",
            width: "18px",
            "margin-bottom": "5px",
            transform: "translate3d(-50%, 0, 0)",
            bottom: "100%",
            left: "50%",
          },
          "&::after": {
            "margin-bottom": "11px",
            transform: "translate3d(-50%, 0, 0)",
            bottom: "100%",
            left: "50%",
          },
          "&:hover": {
            "&::after,&::before": {
              transform: "translate3d(-50%, -5px, 0)",
              transform: "translate3d(-50%, -5px, 0)",
            },
          },
        },
        ".tt-b,.tt-bl,.tt-br": {
          "&::before": {
            background: `url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba%2840,%2040,%2040,%2001%29%22%20transform%3D%22rotate%28180%2018%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E")
            no-repeat`,
            height: "6px",
            width: "18px",
            "margin-top": "5px",
            "margin-bottom": 0,
            transform: "translate3d(-50%, -10px, 0)",
            bottom: "auto",
            left: "50%",
            top: "100%",
          },
          "&::after": {
            "margin-top": "11px",
            transform: "translate3d(-50%, -10px, 0)",
            top: "100%",
            left: "50%",
          },
          "&:hover": {
            "&::before,&::after": {
              transform: "translate3d(-50%, 0, 0)",
            },
          },
        },
      });
      addComponents({
        ".tt-tl": {
          "&::after": {
            transform: "translate3d(calc(-100% + 16px), 0, 0)",
            bottom: "100%",
          },
          "&:hover::after": {
            transform: "translate3d(calc(-100% + 16px), -5px, 0)",
          },
        },

        ".tt-tr": {
          "&::after": {
            transform: "translate3d(calc(0% + -16px), 0, 0)",
            bottom: "100%",
          },
          "&:hover::after": {
            transform: " translate3d(calc(0% + -16px), -5px, 0)",
          },
        },

        ".tt-bl": {
          "&::after": {
            transform: "translate3d(calc(-100% + 16px), -10px, 0)",
            top: "100%",
          },
          "&:hover::after": {
            transform: "translate3d(calc(-100% + 16px), 0, 0)",
          },
        },

        ".tt-br": {
          "&::after": {
            transform: "translate3d(calc(0% + -16px), -10px, 0)",
            top: "100%",
          },
          "&:hover::after": {
            transform: "translate3d(calc(0% + -16px), 0, 0)",
          },
        },

        ".tt-l": {
          "&::after,&::before": {
            bottom: "auto",
            left: "auto",
            right: "100%",
            top: "50%",
            transform: "translate3d(10px, -50%, 0)",
          },
          "&::before": {
            background: `url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba%2840,%2040,%2040,%2001%29%22%20transform%3D%22rotate%28-90%2018%2018%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E") 
  no-repeat`,
            height: "18px",
            width: "6px",
            "margin-right": "5px",
            "margin-bottom": "0",
          },
          "&::after": {
            "margin-right": "11px",
          },
          "&:hover": {
            "&::before,&::after": {
              transform: "translate3d(0, -50%, 0)",
            },
          },
        },

        ".tt-r": {
          "&::after,&::before": {
            bottom: "auto",
            left: "100%",
            top: "50%",
            transform: "translate3d(-10px, -50%, 0)",
          },
          "&::before": {
            background: `url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba%2840,%2040,%2040,%2001%29%22%20transform%3D%22rotate%2890%206%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E")   no-repeat`,
            height: "18px",
            width: "6px",
            "margin-bottom": "0",
            "margin-left": "5px",
          },
          "&::after": {
            "margin-left": "11px",
          },
          "&:hover": {
            "&::after,&::before": {
              transform: "translate3d(0, -50%, 0)",
            },
          },
        },

        ".tt-sm": {
          "&::after": {
            "white-space": "initial",
            width: "80px",
          },
        },

        ".tt-md": {
          "&::after": {
            "white-space": "initial",
            width: "150px",
          },
        },

        ".tt-lg": {
          "&::after": {
            "white-space": "initial",
            width: "260px",
          },
        },
      });
    }),
  ],
};
