import { closeModal } from "@/scripts/modal";
import Swup from "swup";
import SwupHeadPlugin from "@swup/head-plugin";
import SwupSlideTheme from "@swup/slide-theme";
import SwupScriptsPlugin from "@swup/scripts-plugin";
import SwupProgressPlugin from "@swup/progress-plugin";
import SwupA11yPlugin from "@swup/a11y-plugin";

const swup = new Swup({
  plugins: [
    new SwupSlideTheme({
      mainElement: "main",
    }),
    new SwupA11yPlugin(),
    new SwupHeadPlugin(),
    new SwupScriptsPlugin(),
    new SwupProgressPlugin(),
  ],
  containers: ["main:not(#business-card)"],
});

swup.hooks.before("page:load", () => closeModal("nav"));

window.swup = swup;
