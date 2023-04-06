import Tippy from "@tippyjs/react";
import { createContext, useContext, useEffect, useState } from "react";

export const LoadScreenContext = createContext({
  loading: true,
  setLoading: (loading: boolean) => {},
});

export function LoadScreenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading && hidden) setHidden(false);
  }, [loading]);

  return (
    <LoadScreenContext.Provider value={{ loading, setLoading }}>
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
          <h1 className="text-2xl text-black">The site is loading...</h1>
          <Tippy content="Loading...">
            <div className="relative aspect-square w-16 cursor-pointer bg-transparent hover:scale-105">
              <div className="absolute h-full w-full animate-spin rounded-full border-[.35rem] border-l-black bg-transparent opacity-50" />
              <div className="absolute h-full w-full animate-spin-slow rounded-full border-[.35rem] border-b-black bg-transparent opacity-50" />
            </div>
          </Tippy>
        </div>
      )}
      {loading ? null : children}
    </LoadScreenContext.Provider>
  );
}

export function useLoadScreen() {
  return useContext(LoadScreenContext);
}
