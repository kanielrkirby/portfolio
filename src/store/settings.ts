import { persistentMap as pMap } from "@nanostores/persistent";
import { atom } from "nanostores";

const html = document.documentElement;
const starterValue = 5;

export interface SettingsI {
  dev: boolean;
  invertBackground: boolean;
  movingBackground: boolean;
}

export const $settings = pMap<SettingsI>(
  "settings",
  {
    dev: false,
    invertBackground: false,
    movingBackground: true,
  },
  { encode: JSON.stringify, decode: JSON.parse }
);

export const $devCounter = atom<number>($settings.get().dev ? 0 : 5);

export const resetCounter = () => $devCounter.set(starterValue);

export const set = <K extends keyof SettingsI>(key: K, val: SettingsI[K]) =>
  $settings.setKey(key, val);

export const toggle = (key: keyof SettingsI) => set(key, !$settings.get()[key]);

export const decrementDev = () => {
  const value = $devCounter.get();
  if (!$settings.get().dev && value > 0) $devCounter.set(value - 1);
};

$settings.subscribe(({ dev, invertBackground, movingBackground }) => {
  if (dev) html.classList.add("dev");
  else html.classList.remove("dev");
  if (invertBackground) html?.classList.add("inverted");
  else html?.classList.remove("inverted");
  if (movingBackground) html.classList.add("moving");
  else html.classList.remove("moving");
});

$devCounter.subscribe((counter) => {
  if (counter < 1) set("dev", true);
});

export function subscribeImage(selector: string) {
  const img = document.querySelector(selector);
  if (!img)
    return console.error(
      `function 'subscribeImage' requires a valid HTML selector, and '${selector}' does not return any valid elements.`
    );

  img.addEventListener("click", decrementDev);

  $devCounter.subscribe((counter) => {
    if (counter < 1)
      img.setAttribute("aria-label", "Congrats, you're a developer!");
    else
      img.setAttribute(
        "aria-label",
        `${counter} clicks until you're a developer!`
      );
  });

  $settings.subscribe((value) => {
    if (value.dev)
      img.setAttribute("aria-label", "Congrats, you're a developer!");
    else resetCounter();
  });
}
