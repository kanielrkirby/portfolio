const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = plugin.withOptions(
  (options = {}) =>
    ({
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
    }) => {
      const c = options?.class ?? "tt";
      // after
      const a = options.pseudo === "before" ? "&::before" : "&::after";
      const b = (v) => ({ [a]: v });
      // hover
      const h = "&:hover";
      // hover after
      const ha = h + a;

      // CSS Variables
      const d = (obj) => {
        const newObj = {};
        for (const [key, value] of Object.entries(obj))
          newObj[`--${c}-` + key] = value;
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
        if (!validate(content)) content = `attr(data-${c})`;
        return {
          position: "relative",
          [`--${c}-content`]: content,
          [a]: {
            content: `var(--${c}-content)`,
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
      const pos = (pos, val) => ({
        [a]: {
          [pos ?? "bottom"]: val ?? `calc(-100% - var(--${c}-distance))`,
        },
      });

      addComponents({
        [`.${c}`]: getBase(),
        [`.${c}-mirror`]: getBase(),
      });

      matchComponents({
        [c]: getBase,
      });

      addUtilities({
        [`.${c}-xs`]: b({
          fontSize: theme("fontSize.xs", defaultTheme.fontSize.xs),
          padding: "0rem .5rem",
          borderRadius: ".2rem",
        }),
        [`.${c}-sm`]: b({
          fontSize: theme("fontSize.sm", defaultTheme.fontSize.sm),
          padding: ".15rem .6rem",
          borderRadius: ".2rem",
        }),
        [`.${c}-md,:not(.${c}-xs):not(.${c}-sm):not(.${c}-md):not(.${c}-lg):not(.${c}-xl)`]:
          b({
            fontSize: theme("fontSize.base", defaultTheme.fontSize.base),
            padding: ".20rem .7rem",
            borderRadius: ".22rem",
          }),
        [`.${c}-lg`]: b({
          fontSize: theme("fontSize.lg", defaultTheme.fontSize.lg),
          padding: ".4rem .7rem",
          borderRadius: ".25rem",
        }),
        [`.${c}-xl`]: b({
          fontSize: theme("fontSize.xl", defaultTheme.fontSize.xl),
          padding: ".5rem .75rem",
          borderRadius: ".3rem",
        }),
        [`.${c}-top`]: b({ top: `calc(-320% - var(--${c}-spacing)) ` }),
        [`.${c}-bottom,:not(.${c}-top):not(.${c}-bottom):not(.${c}-left):not(.${c}-right)`]:
          b({ bottom: `calc(-320% - var(--${c}-spacing)) ` }),
        [`.${c}-left`]: b({ left: `calc(-320% - var(--${c}-spacing)) ` }),
        [`.${c}-right`]: b({ right: `calc(-320% - var(--${c}-spacing)) ` }),
        [`.${c}-start`]: b({ textAlign: "start" }),
        [`.${c}-center`]: b({ textAlign: "center" }),
        [`.${c}-end`]: b({ textAlign: "end" }),
        [`.${c}-justify`]: b({ textAlign: "justify" }),
      });

      matchUtilities(
        {
          [c]: pos,
        },
        { type: valueType }
      );
    },
  (options) => {}
);
