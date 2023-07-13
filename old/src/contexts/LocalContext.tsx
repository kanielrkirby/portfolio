import { createContext, useEffect, useState } from "react";

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
  decrement(): void;
  message?: string;
  counter?: number;
}

const html = document.querySelector("html")!;

export const LocalContext = createContext({} as ContextI);

export function LocalProvider({ children }: { children: React.ReactNode }) {
  const [counter, setCounter] = useState(10);
  const [message, setMessage] = useState<string>();
  const [settings, setSettings] = useState<SettingsI>();
  const decrement = () => setCounter((counter) => counter - 1);

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
    if (counter < 1) {
      setMessage("Congrats, you're a developer!");
      set("dev", true);
    } else if (counter < 10) {
      if (get("dev")) return setCounter(0);
      setMessage(`${counter} clicks until you're a developer.`);
    } else setMessage(undefined);
  }, [counter]);

  useEffect(() => {
    if (!settings) return;
    for (const key in settings) {
      switch (key) {
        case "background":
          if (!settings[key]) html.classList.add("no-bg");
          else html.classList.remove("no-bg");
          break;
        case "invert-background":
          if (settings[key]) html.classList.add("invert-bg");
          else html.classList.remove("invert-bg");
          break;
        case "dev":
          if (settings[key]) html.classList.add("dev");
          else html.classList.remove("dev");
          break;
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
        decrement,
        message,
        counter,
      }}
    >
      {children}
    </LocalContext.Provider>
  );
}
