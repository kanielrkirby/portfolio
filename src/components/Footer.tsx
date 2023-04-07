import { Link } from "react-router-dom";
import IconBar from "./IconBar";
import { fancyBorder } from "../styles";
import Tippy from "@tippyjs/react";

export default function Footer({}: {}) {
  return (
    <div className="pointer-events-none relative bottom-0 flex w-full items-center justify-between p-2">
      <Tippy content="Attributions & Credits">
        <Link
          to="/credits"
          className={`pointer-events-auto relative w-fit text-blue-400 transition-all duration-150 [text-shadow:0_0_4px_#00000050] after:bg-blue-400 hover:text-blue-300 hover:[text-shadow:0_0_8px_#00000050] hover:after:bg-blue-300 ${fancyBorder}`}
        >
          Attributions & Credits
        </Link>
      </Tippy>
      <IconBar />
    </div>
  );
}
