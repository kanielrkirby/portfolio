const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette");
const defaultTheme = require("tailwindcss/defaultTheme");

export default plugin.withOptions(
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
      // class prefix
      const classPrefix = options?.class ?? "tt";

      // prefix value
      const p = options.pseudo === "before" ? "&::before" : "&::after";

      // prefix function
      const b = (v) => ({ [p]: v });

      // hover value
      const h = "&:hover";

      // hover prefix value
      const hp = h + p;

      // CSS Variables
      const d = (obj) => {
        const newObj = {};
        for (const [key, value] of Object.entries(obj))
          newObj[`--${classPrefix}-` + key] = value;
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

      const getBase = (content, pseudo) => {
        if (!validate(content)) content = `attr(data-${classPrefix})`;
        return {
          position: "relative",
          [`--${classPrefix}-content`]: content,
          [pseudo]: {
            content: `var(--${classPrefix}-content)`,
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
          [hp]: {
            opacity: 1,
          },
        };
      };

      // Get Tooltip Placement
      const pos = (pos, val, pseudo) => ({
        [pseudo]: {
          [pos ?? "bottom"]:
            val ?? `calc(-100% - var(--${classPrefix}-distance))`,
        },
      });

      addComponents({
        [`.${classPrefix}`]: getBase(null, p),
        [`.${classPrefix}-mirror`]: getBase(null, p),
        [`.${classPrefix}-xs`]: b({
          fontSize: theme("fontSize.xs", defaultTheme.fontSize.xs),
          padding: "0rem .5rem",
          borderRadius: ".2rem",
        }),
        [`.${classPrefix}-sm`]: b({
          fontSize: theme("fontSize.sm", defaultTheme.fontSize.sm),
          padding: ".15rem .6rem",
          borderRadius: ".2rem",
        }),
        [`.${classPrefix}-md,:not(.${classPrefix}-xs):not(.${classPrefix}-sm):not(.${classPrefix}-md):not(.${classPrefix}-lg):not(.${classPrefix}-xl)`]:
          b({
            fontSize: theme("fontSize.base", defaultTheme.fontSize.base),
            padding: ".20rem .7rem",
            borderRadius: ".22rem",
          }),
        [`.${classPrefix}-lg`]: b({
          fontSize: theme("fontSize.lg", defaultTheme.fontSize.lg),
          padding: ".4rem .7rem",
          borderRadius: ".25rem",
        }),
        [`.${classPrefix}-xl`]: b({
          fontSize: theme("fontSize.xl", defaultTheme.fontSize.xl),
          padding: ".5rem .75rem",
          borderRadius: ".3rem",
        }),
      });

      matchComponents({
        [classPrefix]: getBase,
      });

      addUtilities({
        [`.${classPrefix}-top`]: b({
          top: `calc(-320% - var(--${classPrefix}-spacing)) `,
        }),
        [`.${classPrefix}-bottom,:not(.${classPrefix}-top):not(.${classPrefix}-bottom):not(.${classPrefix}-left):not(.${classPrefix}-right)`]:
          b({ bottom: `calc(-320% - var(--${classPrefix}-spacing)) ` }),
        [`.${classPrefix}-left`]: b({
          left: `calc(-320% - var(--${classPrefix}-spacing)) `,
        }),
        [`.${classPrefix}-right`]: b({
          right: `calc(-320% - var(--${classPrefix}-spacing)) `,
        }),
        [`.${classPrefix}-start`]: b({ textAlign: "start" }),
        [`.${classPrefix}-center`]: b({ textAlign: "center" }),
        [`.${classPrefix}-end`]: b({ textAlign: "end" }),
        [`.${classPrefix}-justify`]: b({ textAlign: "justify" }),
      });

      matchUtilities(
        {
          [classPrefix]: pos,
        },
        { type: valueType }
      );
    },
  (options) => {}
);
