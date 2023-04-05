import { useEffect, useState } from "react";

export default function LoadScreen({ promise }: { promise: Promise<any> }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    promise.then(() => setLoading(false));
  }, [promise]);

  return (
    <div
      className={
        "fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-white transition-opacity duration-200" +
        (loading ? "" : " opacity-0")
      }
    >
      <div className="absolute aspect-square w-16 animate-spin rounded-full border-[.35rem] border-l-black opacity-50"></div>
      <div className="absolute aspect-square w-16 animate-spin-slow rounded-full border-[.35rem] border-b-black bg-transparent opacity-50"></div>
    </div>
  );
}
