import Tippy from "@tippyjs/react";
import { createContext, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";

interface ContextI {
  loading: boolean;
  setIsLoading: (loading: boolean, timeout?: number) => void;
}

export const LoadScreenContext = createContext({} as ContextI);

export function LoadScreenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      clearTimeout(timer);
    }, 1000);
  }, []);

  function setIsLoading(loading: boolean, timeout?: number) {
    if (timeout) {
      setLoading(loading);
      setHidden(false);
      const timer = setTimeout(() => {
        setLoading(!loading);
        clearTimeout(timer);
      }, timeout);
    } else {
      setLoading(loading);
    }
  }

  useEffect(() => {
    if (loading && hidden) setHidden(false);
  }, [loading]);

  return (
    <LoadScreenContext.Provider value={{ loading, setIsLoading }}>
      {children}
      {hidden ? null : (
        <div
          onTransitionEnd={() => {
            if (!loading) setHidden(true);
          }}
          className={
            "fixed top-0 left-0 z-40 flex h-full w-full flex-col items-center justify-center gap-8 bg-white transition-opacity duration-500" +
            (loading ? "" : " pointer-events-none opacity-0")
          }
        >
          <Helmet>
            <title>Loading...</title>
            <meta name="description" content="Loading..." />
          </Helmet>
          <Tippy content="Loading...">
            <div className="relative aspect-square w-16 cursor-pointer bg-transparent hover:scale-105">
              <div className="absolute h-full w-full animate-spin rounded-full border-[.35rem] border-l-black bg-transparent opacity-50" />
              <div className="absolute h-full w-full animate-spin-slow rounded-full border-[.35rem] border-b-black bg-transparent opacity-50" />
            </div>
          </Tippy>
        </div>
      )}
    </LoadScreenContext.Provider>
  );
}

export function useLoadScreen() {
  return useContext(LoadScreenContext);
}
