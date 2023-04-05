import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useTitle() {
  const [title, setTitle] = useState("Portfolio");
  const location = useLocation();

  useEffect(() => {
    const array = location.pathname.split("/");
    const raw = array[array.length - 1];
    const formatted = raw.charAt(0).toUpperCase() + raw.slice(1);
    setTitle(formatted);
  }, [location]);

  return title;
}
