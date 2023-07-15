const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette");
const defaultTheme = require("tailwindcss/defaultTheme");

const tt = plugin(
  function ({
    addBase,
    addUtilities,
    matchUtilities,
    matchComponents,
    e,
    theme,
  }) {
    addBase({
      "*,::before,::after": {
        "--tw-tt-spacing": theme("tt.spacing", "1rem"),
        "--tw-tt-opacity": theme("tt.opacity", "1"),
        "--tw-tt-color": theme("tt.color", colors.white),
        "--tw-tt-background": theme("tt.background", colors.neutral[800]),
        "--tw-tt-rounded": theme("tt.rounded", "0.25rem"),
        "--tw-tt-font-size": theme("tt.fontSize", "0.85rem"),
        "--tw-tt-font-weight": theme("tt.fontWeight", "400"),
        "--tw-tt-line-height": theme("tt.lineHeight", "1.5"),
        "--tw-tt-padding-top": theme("tt.padding.top", "0.375rem"),
        "--tw-tt-padding-right": theme("tt.padding.right", "0.75rem"),
        "--tw-tt-padding-bottom": theme("tt.padding.bottom", "0.375rem"),
        "--tw-tt-padding-left": theme("tt.padding.left", "0.75rem"),
      },
    });

    matchComponents({
      tt: (content) => {
        return {
          position: "relative",
          "&::after": {
            position: "absolute",
            opacity: "0",
            translate: "0 0",
            borderRadius: "var(--tw-tt-rounded)",
            margin: "auto",
            content: content,
            backgroundColor: "var(--tw-tt-background)",
            color: "var(--tw-tt-color)",
            fontSize: "var(--tw-tt-font-size)",
            padding:
              "var(--tw-tt-padding-top) var(--tw-tt-padding-right) var(--tw-tt-padding-bottom) var(--tw-tt-padding-left)",
            transition:
              "opacity 0.15s ease-in-out, left 0.15s ease-in-out, right 0.15s ease-in-out, top 0.15s ease-in-out, bottom 0.15s ease-in-out",
            pointerEvents: "none",
            width: "fit-content",
            height: "fit-content",
            translateX: "50%",
          },
          "&:hover::after": {
            opacity: "var(--tw-tt-opacity)",
          },
        };
      },
    });

    addUtilities({
      // Sizes
      ".tt-sm": {
        "&::after": {
          fontSize: "0.75rem",
          padding: "0.25rem 0.5rem",
          borderRadius: ".2rem",
        },
      },
      ".tt-md": {
        "&::after": {
          fontSize: "0.85rem",
          padding: "0.375rem 0.75rem",
          borderRadius: ".25rem",
        },
      },
      ".tt-lg": {
        "&::after": {
          fontSize: "1rem",
          padding: "0.50rem 1rem",
          borderRadius: ".3rem",
        },
      },

      // Placements
      ".tt-b": {
        "&::after": {
          bottom: "calc(-100% - var(--tw-tt-spacing))",
        },
        "&:hover::after": {
          bottom: "calc(-160% - var(--tw-tt-spacing))",
        },
      },
      ".tt-t": {
        "&::after": {
          top: "calc(-130% - var(--tw-tt-spacing))",
        },
        "&:hover::after": {
          top: "calc(-160% - var(--tw-tt-spacing))",
        },
      },
      ".tt-r": {
        "&::after": {
          right: "calc(-130% - var(--tw-tt-spacing))",
        },
        "&:hover::after": {
          right: "calc(-160% - var(--tw-tt-spacing))",
        },
      },
      ".tt-l": {
        "&::after": {
          left: "calc(-130% - var(--tw-tt-spacing))",
        },
        "&:hover::after": {
          left: "calc(-160% - var(--tw-tt-spacing))",
        },
      },

      // Text Align
      ".tt-align-center": {
        "&::after": {
          textAlign: "center",
        },
      },
      ".tt-align-start": {
        "&::after": {
          textAlign: "start",
        },
      },
      ".tt-align-end": {
        "&::after": {
          textAlign: "end",
        },
      },
      ".tt-nowrap": {
        "&::after": {
          whiteSpace: "nowrap",
        },
      },
    });

    matchUtilities({
      // Spacing
      ".tt-spacing": (value) => {
        return {
          "--tw-tt-spacing": value,
        };
      },
    });
  },
  {
    theme: {},
  }
);

module.exports = tt;
