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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadScreenContext.Provider value={{ loading, setLoading }}>
      {children}
      <div
        className={
          "fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-gradient-to-tl from-white to-blue-100 transition-opacity duration-200" +
          (loading ? "" : " pointer-events-none opacity-0")
        }
      >
        <div className="absolute aspect-square w-16 animate-spin rounded-full border-[.35rem] border-l-black opacity-50"></div>
        <div className="absolute aspect-square w-16 animate-spin-slow rounded-full border-[.35rem] border-b-black bg-transparent opacity-50"></div>
      </div>
    </LoadScreenContext.Provider>
  );
}

export function useLoadScreen() {
  return useContext(LoadScreenContext);
}
