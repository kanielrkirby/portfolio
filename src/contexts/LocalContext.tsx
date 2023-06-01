import { createContext, useContext, useEffect, useState } from "react";
import { useDev } from "../contexts/DevContext";

interface SettingsI {
  background?: boolean;
  "invert-background"?: boolean;
  dev?: boolean;
}
interface ContextI {
  settings?: SettingsI;
  set(key: keyof SettingsI, value: any): void;
  get(key: keyof SettingsI): boolean | undefined;
  toggle(key: keyof SettingsI): void;
}

const html = document.querySelector("html")!;

export const LocalContext = createContext({} as ContextI);

export function LocalProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsI>();
  const { setDev } = useDev();

  useEffect(() => {
    const stored = localStorage.getItem("settings");
    if (stored) {
      setSettings(JSON.parse(stored));
    } else {
      localStorage.setItem(
        "settings",
        JSON.stringify({
          background: true,
          "invert-background": false,
          dev: false,
        })
      );
    }
  }, []);

  useEffect(() => {
    console.log("update");
    console.log(settings);
    if (!settings) return;
    for (const key in settings) {
      switch (key) {
        case "background":
          if (!settings[key]) {
            html.classList.add("no-bg");
          } else {
            html.classList.remove("no-bg");
          }
          break;
        case "invert-background":
          if (settings[key]) {
            html.classList.add("invert-bg");
          } else {
            html.classList.remove("invert-bg");
          }
          break;
        case "dev":
          if (settings[key]) {
            if (setDev) setDev(true);
          } else {
            if (setDev) setDev(false);
          }
        default:
          break;
      }
    }
  }, [settings]);

  function set(key: keyof SettingsI, value: any) {
    if (settings) {
      const newSettings: SettingsI = Object.assign({}, settings);
      setSettings(newSettings);
      newSettings[key] = value;
      localStorage.setItem("settings", JSON.stringify(newSettings));
    }
  }

  function get(key: keyof SettingsI) {
    return settings?.[key];
  }

  function toggle(key: keyof SettingsI) {
    set(key, !get(key));
  }

  return (
    <LocalContext.Provider
      value={{
        settings,
        set,
        get,
        toggle,
      }}
    >
      {children}
    </LocalContext.Provider>
  );
}
