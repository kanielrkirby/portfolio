import { createContext, useContext, useEffect, useState } from "react";
import useLocal from "../hooks/useLocal";

interface ContextI {
  dev: boolean;
  setDev: (dev: boolean) => void;
  decrement: () => void;
  message?: string;
}

export const DevContext = createContext({} as ContextI);

export function DevProvider({ children }: { children: React.ReactNode }) {
  const [dev, setDev] = useState(false);
  const [counter, setCounter] = useState(10);
  const [message, setMessage] = useState<string>();
  const { get, set, settings } = useLocal();

  const decrement = () => setCounter((counter) => counter - 1);

  useEffect(() => {
    const dev = get("dev");
    if (dev) {
      setDev(true);
      setCounter(0);
    }
  }, []);

  useEffect(() => {
    if (counter < 1) {
      setMessage("Congrats, you're a developer!");
      console.log("_______________");
      console.log(settings);
      setDev(true);
      set("dev", true);
      console.log(settings);
      console.log("_______________");
    } else if (counter < 10) {
      if (get("dev")) return setCounter(0);
      setMessage(`${counter} clicks until you're a developer.`);
    } else setMessage(undefined);
  }, [counter]);

  return (
    <DevContext.Provider value={{ dev, decrement, message, setDev }}>
      {children}
    </DevContext.Provider>
  );
}

export function useDev() {
  return useContext(DevContext);
}
