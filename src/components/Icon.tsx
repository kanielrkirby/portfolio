import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";

export default function Icon({
  name,
  link,
  tippy,
  place,
}: {
  name: string;
  link?: string;
  tippy?: string;
  place?: "top" | "bottom" | "left" | "right";
}) {
  const component = (
    <>
      <img
        src={`/public/${name.toLowerCase()}.png`}
        alt={name}
        className="absolute bottom-0 left-0 right-0 top-0 z-0 m-auto h-full w-full cursor-pointer opacity-40 transition-all duration-150 ease-out group-hover:scale-110 group-hover:opacity-80"
      />
      <div className="absolute -left-2 bottom-0 top-0 -z-10 my-auto h-[150%] w-[150%] rounded-full bg-gradient-radial from-black to-transparent opacity-10 transition-all duration-100 group-hover:scale-125 group-hover:opacity-25" />
    </>
  );
  return (
    <div className="relative aspect-square h-8 w-8 overflow-visible">
      <Tippy content={tippy ?? name} placement={place}>
        {(link && (
          <Link
            to={link}
            target="_blank"
            className="link group pointer-events-auto relative block h-full w-full"
          >
            {component}
          </Link>
        )) ||
          component}
      </Tippy>
    </div>
  );
}
