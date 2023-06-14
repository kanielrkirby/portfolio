import { useEffect, useState } from "react";

export default function useBreakpoint() {
  const [isSm, setIsSm] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [isSideways, setIsSideways] = useState(false);
  const set = (keep = "") => {
    setIsSm(keep === "sm");
    setIsMd(keep === "md");
    setIsLg(keep === "lg");
  };

  const handleResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w > h) setIsSideways(true);
    else setIsSideways(false);
    if (w < 640) set("sm");
    else if (w < 900) set("md");
    else set("lg");
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isSm,
    isMd,
    isLg,
    isSideways,
  };
}
