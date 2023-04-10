import { useEffect, useState } from "react";
import { useDev } from "../contexts/DevContext";

interface SettingsI {
  background?: boolean;
  dev?: boolean;
}

const html = document.querySelector("html")!;

export default function useLocal() {
  const [settings, setSettings] = useState<SettingsI>();
  const { setDev } = useDev();

  useEffect(() => {
    const stored = localStorage.getItem("settings");
    if (stored) {
      setSettings(JSON.parse(stored));
    } else {
      localStorage.setItem(
        "settings",
        JSON.stringify({ background: true, dev: false }),
      );
    }
  }, []);

  useEffect(() => {
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
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings));
  }

  function get(key: keyof SettingsI) {
    return settings?.[key];
  }

  function toggle(key: keyof SettingsI) {
    set(key, !get(key));
  }

  return { set, get, toggle };
}
