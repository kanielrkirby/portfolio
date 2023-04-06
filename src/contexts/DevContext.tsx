import { createContext, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";

interface ContextI {
  dev: boolean;
  setDev: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DevContext = createContext({} as ContextI);

export function DevProvider({ children }: { children: React.ReactNode }) {
  const [dev, setDev] = useState(false);

  return (
    <DevContext.Provider value={{ dev, setDev }}>
      {children}
    </DevContext.Provider>
  );
}

export function useDev() {
  return useContext(DevContext);
}
