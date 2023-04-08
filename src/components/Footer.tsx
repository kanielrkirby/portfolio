import { Link } from "react-router-dom";
import IconBar from "./IconBar";
import Tippy from "@tippyjs/react";

export default function Footer({}: {}) {
  return (
    <div className="pointer-events-none relative bottom-0 flex w-full items-center justify-between p-2">
      <Tippy content="Attributions & Credits">
        <Link to="/credits" className="link fancy">
          Attributions & Credits
        </Link>
      </Tippy>
      <IconBar />
    </div>
  );
}
