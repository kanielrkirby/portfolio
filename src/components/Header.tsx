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
      <Link to="/projects" className="cursor-pointer">
        Projects
      </Link>
      <Link to="/">
        <Logo className="w-20 rounded-xl shadow-[1px_1px_8px_3px_#00000050]" />
      </Link>
      <Link to="/contact" className="cursor-pointer">
        Contact
      </Link>
      <Menu className="absolute right-3 w-20" />
    </div>
  );
}
