import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import useBreakpoint from "../hooks/useBreakpoint";
import useLocal from "../hooks/useLocal";

export default function Services() {
  const { isSm, isMd } = useBreakpoint();
  const { decrement, message } = useLocal();
  return (
    <>
      <Helmet>
        <title>Services</title>
        <meta name="description" content="Kaniel Kirby's 'About Me' page." />
      </Helmet>
      <div
        className={`flex w-full items-center justify-around gap-8 p-8 text-center ${
          isMd || isSm ? "flex-col-reverse" : ""
        }`}
      >
        <p></p>
      </div>
    </>
  );
}
