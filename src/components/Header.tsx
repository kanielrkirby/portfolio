import Logo from "../assets/Logo";
import { Link } from "react-router-dom";
import Settings from "../assets/Settings";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useDev } from "../contexts/DevContext";
import { useModal } from "../contexts/ModalContext";
import useBreakpoint from "../hooks/useBreakpoint";
import Nav from "../assets/Nav";
import { useState } from "react";

export default function Header({ className }: { className?: string }) {
  const { dev } = useDev();
  const { isSm, isMd } = useBreakpoint();
  const { setModalOpen } = useModal();
  const [navOpen, setNavOpen] = useState(false);
  const nav = (
    <div
      className={`justify-top fixed top-0 left-0 z-10 flex h-full w-full flex-col items-start pt-24 backdrop-blur-sm transition-all duration-500 ease-in-out ${
        navOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`fixed top-0 h-full w-full bg-black bg-opacity-50 transition-all duration-500`}
      />
      <Tippy content="Contact" placement="right">
        <Link
          to="/contact"
          className="link relative px-10 py-5 transition-all duration-200 [text-shadow:0px_0px_5px_#000000] hover:scale-110 hover:bg-[#ffffff20] hover:[text-shadow:2px_2px_8px_#000000]"
          onClick={() => setNavOpen(false)}
        >
          Contact
        </Link>
      </Tippy>
      <Tippy content="About" placement="right">
        <Link
          to="/about"
          className="link relative px-10 py-5 transition-all duration-200 [text-shadow:0px_0px_5px_#000000] hover:scale-110 hover:bg-[#ffffff20] hover:[text-shadow:2px_2px_8px_#000000]"
          onClick={() => setNavOpen(false)}
        >
          About
        </Link>
      </Tippy>
    </div>
  );

  return (
    <header
      className={
        "relative mb-4 flex h-28 w-full items-center justify-around p-2" +
        (className ?? "")
      }
    >
      {nav && nav}
      {(isSm || isMd) && (
        <Tippy content="Navigation">
          <div
            onClick={() => setNavOpen(true)}
            className={`absolute left-3 flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden transition-all duration-300 ease-in-out hover:rotate-12`}
          >
            <Nav />
          </div>
        </Tippy>
      )}
      {!(isSm || isMd) && (
        <div className="relative flex h-full w-full select-none items-center justify-center">
          <Tippy content="Contact">
            <Link
              to="/contact"
              className="link relative px-10 py-5 transition-all duration-200 [text-shadow:0px_0px_5px_#000000] hover:-rotate-3 hover:scale-110 hover:[text-shadow:2px_2px_8px_#000000]"
            >
              Contact
            </Link>
          </Tippy>
        </div>
      )}
      <Tippy content="Projects">
        <Link to="/projects" className="link group relative aspect-square p-4">
          <Logo className="relative left-0 right-0 top-0 bottom-0 m-auto w-20 rounded-xl bg-transparent shadow-[1px_1px_6px_2px_#00000050] transition-all duration-300 group-hover:-translate-x-1 group-hover:scale-105 group-hover:bg-[#ffffff15] group-hover:shadow-[3px_3px_10px_4px_#00000020]" />
        </Link>
      </Tippy>
      {!(isSm || isMd) && (
        <div className="relative flex h-full w-full select-none items-center justify-center">
          <Tippy content="About">
            <Link
              to="/about"
              className="link relative px-10 py-5 transition-all duration-200 [text-shadow:0px_0px_5px_#000000] hover:rotate-3 hover:scale-110 hover:[text-shadow:2px_2px_8px_#000000]"
            >
              About
            </Link>
          </Tippy>
        </div>
      )}
      <Tippy content="Settings">
        <div
          onClick={() => setModalOpen(true)}
          className={`absolute right-3 flex h-20 w-20 items-center justify-center overflow-hidden ${
            dev ? "" : "pointer-events-none"
          }`}
        >
          <Settings />
        </div>
      </Tippy>
    </header>
  );
}
