import Logo from "../assets/Logo";
import { Link } from "react-router-dom";
import Menu from "../assets/Menu";

export default function Header({ className }: { className?: string }) {
  return (
    <div
      className={
        "relative flex h-28 items-center justify-center gap-36 p-2 " + className
      }
    >
      <Link
        to="/projects"
        className="transition-all duration-200 [text-shadow:0px_0px_5px_#000000] hover:-rotate-3 hover:scale-110 hover:[text-shadow:2px_2px_8px_#000000]"
      >
        Projects
      </Link>
      <Link to="/">
        <Logo className="w-20 rounded-xl shadow-[1px_1px_6px_2px_#00000050] transition-all duration-300 hover:-translate-x-1 hover:scale-105 hover:shadow-[3px_3px_10px_4px_#00000040]" />
      </Link>
      <Link
        to="/contact"
        className="transition-all duration-200 [text-shadow:0px_0px_5px_#000000] hover:rotate-3 hover:scale-110 hover:[text-shadow:2px_2px_8px_#000000]"
      >
        Contact
      </Link>
      <Menu className="absolute right-3" />
    </div>
  );
}
