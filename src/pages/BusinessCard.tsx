import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import useBreakpoint from "../hooks/useBreakpoint";
import useLocal from "../hooks/useLocal";
import Logo from "../assets/Logo";

export default function About() {
  const { isSm, isMd } = useBreakpoint();
  return (
    <>
      <Helmet>
        <title>Kaniel Kirby</title>
        <meta
          name="description"
          content="Kaniel Kirby's Virtual Business Card."
        />
      </Helmet>
      {/* <Logo />
      <h1>Kaniel Kirby</h1>
      <h2>Web Developer</h2> */}
    </>
  );
}
