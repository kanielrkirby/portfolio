import { createContext, useContext, useEffect, useState } from "react";

interface ContextI {
  dev: boolean;
  decrement: () => void;
  message?: string;
}

export const DevContext = createContext({} as ContextI);

export function DevProvider({ children }: { children: React.ReactNode }) {
  const [dev, setDev] = useState(false);
  const [counter, setCounter] = useState(10);
  const [message, setMessage] = useState<string>();

  const decrement = () => setCounter((counter) => counter - 1);

  useEffect(() => {
    if (counter < 1) {
      setMessage("Congrats, you're a developer!");
      setDev(true);
    } else if (counter < 10)
      setMessage(`${counter} clicks until you're a developer.`);
    else setMessage(undefined);
  }, [counter]);

  return (
    <DevContext.Provider value={{ dev, decrement, message }}>
      {children}
    </DevContext.Provider>
  );
}

export function useDev() {
  return useContext(DevContext);
}
