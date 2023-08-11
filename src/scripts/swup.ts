import { closeModal } from "@/scripts/modal";
import Swup from "swup";
import SwupHeadPlugin from "@swup/head-plugin";
import SwupSlideTheme from "@swup/slide-theme";
import SwupScriptsPlugin from "@swup/scripts-plugin";
import SwupProgressPlugin from "@swup/progress-plugin";
import SwupA11yPlugin from "@swup/a11y-plugin";

const swup = new Swup({
  plugins: [
    new SwupA11yPlugin(),
    new SwupHeadPlugin(),
    new SwupSlideTheme(),
    new SwupScriptsPlugin(),
    new SwupProgressPlugin(),
  ],
  animationSelector: false,
  containers: ["main:not(#business-card)"],
});
window.swup = swup;

window.swup.hooks.on("page:view", () => closeModal("nav"));
