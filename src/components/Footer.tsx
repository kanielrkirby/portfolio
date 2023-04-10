import { Link } from "react-router-dom";
import IconBar from "./IconBar";
import Tippy from "@tippyjs/react";
import useBreakpoint from "../hooks/useBreakpoint";

export default function Footer({}: {}) {
  const { isSm, isMd } = useBreakpoint();
  return (
    <footer
      className={`pointer-events-none relative bottom-0 flex w-full items-center justify-between p-2 ${
        isMd || isSm ? "flex-col-reverse gap-8" : ""
      }`}
    >
      <Tippy content="Attributions & Credits">
        <Link to="/credits" className="link fancy">
          Attributions & Credits
        </Link>
      </Tippy>
      <IconBar />
    </footer>
  );
}
