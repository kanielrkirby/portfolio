const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const { parseColor, formatColor } = require("tailwindcss/src/util/color");
const valueType = [
  "absolute-size",
  "relative-size",
  "number",
  "percentage",
  "length",
];
const tt = plugin(
  function ({
    addBase,
    addUtilities,
    matchUtilities,
    matchComponents,
    e,
    theme,
  }) {
    const variables = {
      "--tt-opacity": "1",
      "--tt-spacing": "1rem",
      "--tt-distance": "300%",
      "--tt-z-index": "100",
      "--tt-width": "fit-content",
      "--tt-height": "fit-content",
    };
    addBase({
      "*,::before,::after": variables,
    });

    matchComponents(
      {
        tt: (value) => {
          let content;
          if (
            (value.startsWith(`"`) && value.endsWith(`"`)) ||
            (value.startsWith(`'`) && value.endsWith(`'`)) ||
            (value.startsWith("`") && value.endsWith("`"))
          ) {
            content = value;
          } else {
            return {};
          }
          return {
            position: "relative",
            "&::after": {
              "--tw-content": `${content}`,
              content: "var(--tw-content)",
              top: "-100%",
              left: "-100%",
              right: "-100%",
              bottom: "-100%",
              position: "absolute",
              textAlign: "center",
              zIndex: "var(--tt-z-index)",
              width: "fit-content",
              height: "fit-content",
              margin: "auto",
              background: colors.neutral[800],
              color: colors.white,
              fontWeight: "normal",
              fontFamily: "inherit",
              padding: ".25rem .4rem",
              borderRadius: "0.25rem",
              opacity: 0,
              pointerEvents: "none",
              transition:
                "opacity 0.2s ease-in-out, left 0.2s ease-in-out, right 0.2s ease-in-out, top 0.2s ease-in-out, bottom 0.2s ease-in-out",
            },
            "&:hover::after": {
              opacity: "var(--tt-opacity)",
            },
          };
        },
      },
      { type: "any" }
    );

    const cols = flattenObject(colors);

    const colorUtilities = {};
    Object.entries(cols).map(([col, value]) => {
      colorUtilities[`.tt-${col}::after`] = {
        color: value,
      };
      colorUtilities[`.tt-bg-${col}::after`] = {
        backgroundColor: value,
      };
    });

    addUtilities({
      // Positioning
      ".tt-bottom,:not(.tt-top):not(.tt-bottom):not(.tt-left):not(.tt-right)": {
        "&::after": {
          bottom: "calc(var(--tt-distance) * -1 / 1.5 - var(--tt-spacing))",
        },
        "&:hover::after": {
          bottom: "calc(var(--tt-distance) * -1 - var(--tt-spacing))",
        },
      },
      ".tt-top": {
        "&::after": {
          top: "calc(var(--tt-distance) * -1 / 1.5 - var(--tt-spacing))",
        },
        "&:hover::after": {
          top: "calc(var(--tt-distance) * -1 - var(--tt-spacing))",
        },
      },
      ".tt-left": {
        "&::after": {
          left: "calc(var(--tt-distance) * -1 / 1.5 - var(--tt-spacing))",
        },
        "&:hover::after": {
          left: "calc(var(--tt-distance) * -1 - var(--tt-spacing))",
        },
      },
      ".tt-right": {
        "&::after": {
          right: "calc(var(--tt-distance) * -1 / 1.5 - var(--tt-spacing))",
        },
        "&:hover::after": {
          right: "calc(var(--tt-distance) * -1 - var(--tt-spacing))",
        },
      },

      ".tt-nowrap::after": {
        whiteSpace: "nowrap",
      },

      // Text Align
      ".tt-center::after,:not(.tt-center):not(.tt-left):not(.tt-right):not(.tt-justify):after":
        {
          textAlign: "center",
        },
      ".tt-left::after": {
        textAlign: "left",
      },
      ".tt-right::after": {
        textAlign: "right",
      },
      ".tt-justify::after": {
        textAlign: "justify",
      },

      // Text Size
      ".tt-xs::after": {
        fontSize: "0.75rem",
      },
      ".tt-sm::after": {
        fontSize: "0.875rem",
      },
      ".tt-md::after,:not(.tt-xs):not(.tt-sm):not(.tt-md):not(.tt-lg):not(.tt-xl):after":
        {
          fontSize: "1rem",
        },
      ".tt-lg::after": {
        fontSize: "1.5rem",
      },
      ".tt-xl::after": {
        fontSize: "2rem",
      },

      ...colorUtilities,
    });
    matchUtilities(
      {
        tt: (value) => {
          if (
            (value.startsWith(`"`) && value.endsWith(`"`)) ||
            (value.startsWith(`'`) && value.endsWith(`'`)) ||
            (value.startsWith("`") && value.endsWith("`"))
          )
            return {};
          const temp = parseColor(value);
          if (temp === null) return {};
          const color = formatColor(temp);
          if (color === null) return {};
          return {
            "&::after": {
              color: color,
            },
          };
        },
        "tt-bg": (value) => {
          if (
            (value.startsWith(`"`) && value.endsWith(`"`)) ||
            (value.startsWith(`'`) && value.endsWith(`'`)) ||
            (value.startsWith("`") && value.endsWith("`"))
          )
            return {};
          const temp = parseColor(value);
          if (temp === null) return {};
          const color = formatColor(temp);
          if (color === null) return {};
          return {
            "&::after": {
              backgroundColor: color,
            },
          };
        },
      },
      { type: "color" }
    );
    matchUtilities(
      {
        "tt-w": (value) => ({
          "&::after": {
            width: value,
          },
        }),
        "tt-h": (value) => ({
          "&::after": {
            height: value,
          },
        }),
        "tt-pr": (value) => ({
          "&::after": {
            "padding-right": value,
          },
        }),
        "tt-pt": (value) => ({
          "&::after": {
            "padding-top": value,
          },
        }),
        "tt-pl": (value) => ({
          "&::after": {
            "padding-left": value,
          },
        }),
        "tt-pb": (value) => ({
          "&::after": {
            "padding-bottom": value,
          },
        }),
        "tt-px": (value) => ({
          "&::after": {
            "padding-left": value,
            "padding-right": value,
          },
        }),
        "tt-py": (value) => ({
          "&::after": {
            "padding-top": value,
            "padding-bottom": value,
          },
        }),
        "tt-spacing": (value) => ({
          "&::after": {
            "--tt-spacing": value,
          },
        }),
        "tt-text": (value) => ({
          "&::after": {
            "text-size": value,
          },
        }),
        "tt-font": (value) => ({
          "&::after": {
            fontFamily: value,
          },
        }),
        "tt-bottom": (value) => ({
          "&::after": {
            bottom: value,
          },
        }),
        "tt-top": (value) => ({
          "&::after": {
            top: value,
          },
        }),
        "tt-left": (value) => ({
          "&::after": {
            left: value,
          },
        }),
        "tt-right": (value) => ({
          "&::after": {
            right: value,
          },
        }),
      },
      { type: valueType }
    );
    matchUtilities(
      {
        "tt-opacity": (value) => ({
          "&::after": {
            "--tt-opacity": value,
          },
        }),
      },
      { type: ["number", "percentage"] }
    );
    matchUtilities(
      {
        "tt-z": (value) => ({
          "&::after": {
            zIndex: value,
          },
        }),
      },
      { type: "number" }
    );
  },
  {
    theme: {},
  }
);

module.exports = tt;

const flattenObject = (oldObject) => {
  const flattenedObject = {};

  for (const innerObj in oldObject) {
    if (typeof oldObject[innerObj] === "object") {
      const newObject = flattenObject(oldObject[innerObj]);
      for (const key in newObject) {
        flattenedObject[innerObj + "-" + key] = newObject[key];
      }
    } else {
      flattenedObject[innerObj] = oldObject[innerObj];
    }
  }

  return flattenedObject;
};
