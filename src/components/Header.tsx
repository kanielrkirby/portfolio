import Logo from "../assets/Logo";
import { Link } from "react-router-dom";
import Settings from "../assets/Settings";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function Header({ className }: { className?: string }) {
  return (
    <div
      className={
        "relative mb-4 flex h-28 items-center justify-around p-2" +
        (className ?? "")
      }
    >
      <div className="relative flex h-full w-full select-none items-center justify-center">
        <Tippy content="Contact">
          <Link
            to="/contact"
            className="relative px-10 py-5 transition-all duration-200 [text-shadow:0px_0px_5px_#000000] hover:-rotate-3 hover:scale-110 hover:[text-shadow:2px_2px_8px_#000000] max-sm:hidden"
          >
            Contact
          </Link>
        </Tippy>
      </div>
      <Tippy content="Home">
        <Link to="/projects" className="group relative aspect-square p-4">
          <Logo className="relative left-0 right-0 top-0 bottom-0 m-auto w-20 rounded-xl shadow-[1px_1px_6px_2px_#00000050] transition-all duration-300 group-hover:-translate-x-1 group-hover:scale-105 group-hover:shadow-[3px_3px_10px_4px_#00000040]" />
        </Link>
      </Tippy>
      <div className="relative flex h-full w-full select-none items-center justify-center">
        <Tippy content="About">
          <Link
            to="/about"
            className="relative px-10 py-5 transition-all duration-200 [text-shadow:0px_0px_5px_#000000] hover:rotate-3 hover:scale-110 hover:[text-shadow:2px_2px_8px_#000000] max-sm:hidden"
          >
            About
          </Link>
        </Tippy>
      </div>
      <Tippy content="Settings">
        <div className="absolute right-3 overflow-hidden">
          <Settings />
        </div>
      </Tippy>
    </div>
  );
}
