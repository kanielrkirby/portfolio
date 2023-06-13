import { useEffect, useState } from "react";

export default function useBreakpoint() {
  const [isSm, setIsSm] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const set = (keep = "") => {
    setIsSm(keep === "sm");
    setIsMd(keep === "md");
    setIsLg(keep === "lg");
  };

  const handleResize = () => {
    if (window.innerWidth < 640) set("sm");
    else if (window.innerWidth < 900) set("md");
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
  };
}
