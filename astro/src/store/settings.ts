import { persistentMap as atom } from "@nanostores/persistent";

export interface SettingsI {
  dev: boolean;
  invertBackground: boolean;
  movingBackground: boolean;
}

const html = document.documentElement;
const canvas = document.querySelector("#canvas") as HTMLCanvasElement | null;

export const $settings = atom<SettingsI>(
  "settings",
  {
    dev: false,
    invertBackground: false,
    movingBackground: true,
  },
  { encode: JSON.stringify, decode: JSON.parse }
);

export const set = <K extends keyof SettingsI>(key: K, val: SettingsI[K]) =>
  $settings.setKey(key, val);

export const toggle = (key: keyof SettingsI) => set(key, !$settings.get()[key]);

$settings.subscribe((settings: SettingsI) => {
  const { dev, invertBackground, movingBackground } = settings;
  if (dev) html.classList.add("dev");
  else html.classList.remove("dev");
  if (invertBackground) canvas?.classList.add("invert");
  else canvas?.classList.remove("invert");
  if (movingBackground) html.classList.add("moving");
  else html.classList.remove("moving");
});