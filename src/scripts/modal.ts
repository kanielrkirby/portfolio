import MicroModal from "micromodal";
import { $settings, toggle } from "/store/settings";

MicroModal.init();

const settings = document.querySelector("#settings-wheel") as HTMLDivElement;
settings.addEventListener("click", () => MicroModal.show("settings-modal"));

const movingBackground = document.querySelector(
  "#moving-background-input"
) as HTMLInputElement;
const invertBackground = document.querySelector(
  "#invert-background-input"
) as HTMLInputElement;
const devMode = document.querySelector("#dev-mode-input") as HTMLInputElement;

movingBackground.onchange = () => toggle("movingBackground");
invertBackground.onchange = () => toggle("invertBackground");
devMode.onchange = () => toggle("dev");

$settings.subscribe((val) => {
  movingBackground.checked = val.movingBackground;
  devMode.checked = val.dev;
  invertBackground.checked = val.invertBackground;
});
