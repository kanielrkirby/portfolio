import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router";
import { useLoadScreen } from "../contexts/LoadScreen";

export default function useTitle() {
  const location = useLocation();
  const { loading } = useLoadScreen();
  const [title, setTitle] = useState<string | undefined>();
  useEffect(() => {
    const helmTitle = Helmet?.peek()?.title;
    if (helmTitle && helmTitle !== title) setTitle(helmTitle);
  }, [location, loading]);
  useEffect(() => {
    setInterval(() => {
      console.log(loading);
    }, 500);
  }, []);

  return title;
}
