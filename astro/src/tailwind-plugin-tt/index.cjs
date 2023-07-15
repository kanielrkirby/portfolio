const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = plugin(
  function ({
    addBase,
    addUtilities,
    matchUtilities,
    addComponents,
    addVariant,
    config,
    corePlugins,
    matchVariant,
    matchComponents,
    e,
    theme,
  }) {
    // after
    const a = "&::after";
    const b = (v) => ({ [a]: v });
    // hover
    const h = "&:hover";
    // hover after
    const ha = h + a;

    // CSS Variables
    const d = (obj) => {
      const newObj = {};
      for (const [key, value] of Object.entries(obj))
        newObj["--tt-" + key] = value;
      return {
        ":root": newObj,
      };
    };
    addBase(
      d({
        spacing: ".5rem",
        content: null,
      })
    );

    // Validate Content
    const validate = (content) => {
      if (typeof content == "string" && content.length > 1) {
        const array = [`'`, `"`, "`"];
        if (
          array.includes(content[0]) &&
          array.includes(content[content.length - 1])
        )
          return true;
      }
      return false;
    };
    const valueType = [
      "number",
      "length",
      "percentage",
      "absolute-size",
      "relative-size",
    ];

    const getBase = (content) => {
      if (!validate(content)) content = "attr(data-tt)";
      return {
        position: "relative",
        "--tt-content": content,
        [a]: {
          content: "var(--tt-content)",
          position: "absolute",
          top: "-100%",
          left: "-100%",
          right: "-100%",
          bottom: "-100%",
          width: "fit-content",
          height: "fit-content",
          opacity: 0,
          margin: "auto",
          color: "#fff",
          background: "#222",
          zIndex: 100,
          transition: "all .2s ease-in-out",
          pointerEvents: "none",
        },
        [ha]: {
          opacity: 1,
        },
      };
    };

    // Get Tooltip Placement
    const p = (pos, val) => ({
      [a]: {
        [pos ?? "bottom"]: val ?? "calc(-100% - var(--tt-distance))",
      },
    });

    addComponents({
      ".tt": getBase(),
      ".tt-mirror": getBase(),
    });

    matchComponents({
      tt: getBase,
    });

    addUtilities({
      ".tt-xs": b({
        fontSize: theme("fontSize.xs", defaultTheme.fontSize.xs),
        padding: "0rem .5rem",
        borderRadius: ".2rem",
      }),
      ".tt-sm": b({
        fontSize: theme("fontSize.sm", defaultTheme.fontSize.sm),
        padding: ".15rem .6rem",
        borderRadius: ".2rem",
      }),
      ".tt-md,:not(.tt-xs):not(.tt-sm):not(.tt-md):not(.tt-lg):not(.tt-xl)": b({
        fontSize: theme("fontSize.base", defaultTheme.fontSize.base),
        padding: ".20rem .7rem",
        borderRadius: ".22rem",
      }),
      ".tt-lg": b({
        fontSize: theme("fontSize.lg", defaultTheme.fontSize.lg),
        padding: ".4rem .7rem",
        borderRadius: ".25rem",
      }),
      ".tt-xl": b({
        fontSize: theme("fontSize.xl", defaultTheme.fontSize.xl),
        padding: ".5rem .75rem",
        borderRadius: ".3rem",
      }),
      ".tt-top": b({ top: "calc(-320% - var(--tt-spacing))" }),
      ".tt-bottom,:not(.tt-top):not(.tt-bottom):not(.tt-left):not(.tt-right)":
        b({ bottom: "calc(-320% - var(--tt-spacing))" }),
      ".tt-left": b({ left: "calc(-320% - var(--tt-spacing))" }),
      ".tt-right": b({ right: "calc(-320% - var(--tt-spacing))" }),
      ".tt-start": b({ textAlign: "start" }),
      ".tt-center": b({ textAlign: "center" }),
      ".tt-end": b({ textAlign: "end" }),
      ".tt-justify": b({ textAlign: "justify" }),
    });

    matchUtilities(
      {
        tt: p,
      },
      { type: valueType }
    );
  },
  {
    theme: {},
  }
);
