import { Link } from "react-router-dom";
import IconBar from "./IconBar";

export default function Footer({}: {}) {
  return (
    <div className="relative bottom-0 flex w-full items-center justify-between p-2">
      <Link to="/credits" className="w-full">
        Attributions & Credits
      </Link>
      <IconBar />
    </div>
  );
}
