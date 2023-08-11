import { closeModal } from "@/scripts/modal";
import Swup from "swup";
import SwupHeadPlugin from "@swup/head-plugin";
import SwupSlideTheme from "@swup/slide-theme";
import SwupScriptsPlugin from "@swup/scripts-plugin";
import SwupProgressPlugin from "@swup/progress-plugin";
import SwupA11yPlugin from "@swup/a11y-plugin";
import SwupPreloadPlugin from "@swup/preload-plugin";

const selector = "main:not(#business-card)";

const swup = new Swup({
  plugins: [
    new SwupSlideTheme({
      mainElement: selector,
    }),
    new SwupA11yPlugin({ contentSelector: selector }),
    new SwupHeadPlugin(),
    new SwupScriptsPlugin(),
    new SwupProgressPlugin(),
    new SwupPreloadPlugin(),
  ],
  containers: [selector],
});

swup.hooks.before("page:load", () => closeModal("nav"));

window.swup = swup;
