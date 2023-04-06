import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router";

export default function useTitle() {
  const location = useLocation();
  const [title, setTitle] = useState<string | undefined>();
  useEffect(() => {
    const helmTitle = Helmet?.peek()?.title;
    if (helmTitle && helmTitle !== title) setTitle(helmTitle);
  }, [location]);
  return title;
}
