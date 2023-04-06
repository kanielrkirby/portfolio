import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";

export default function Icon({ name, link }: { name: string; link?: string }) {
  const component = (
    <>
      <img
        src={`/src/assets/${name.toLowerCase()}.png`}
        alt={name}
        className="absolute top-0 bottom-0 right-0 left-0 z-0 m-auto h-full w-full cursor-pointer opacity-40 transition-all duration-150 ease-out group-hover:scale-110 group-hover:opacity-80"
      />
      <div className="absolute top-0 bottom-0 -left-2 -z-10 my-auto h-[150%] w-[150%] rounded-full bg-gradient-radial from-black to-transparent opacity-10 transition-all duration-150 group-hover:scale-125 group-hover:opacity-25" />
    </>
  );
  return (
    <div className="relative aspect-square h-8 overflow-hidden">
      <Tippy content={name}>
        {(link && (
          <Link
            to={link}
            target="_blank"
            className="group pointer-events-auto relative block h-full w-full"
          >
            {component}
          </Link>
        )) ||
          component}
      </Tippy>
    </div>
  );
}
