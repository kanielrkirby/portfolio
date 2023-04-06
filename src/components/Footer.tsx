import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function Footer({ className }: { className?: string }) {
  return (
    <div className={"pointer-events-none mt-8 w-full " + className}>
      <ul className="flex justify-end gap-4 p-2">
        <Icon
          name="LinkedIn"
          link="https://www.linkedin.com/in/kaniel-kirby-9b1460261/"
        />
        <Icon name="Github" link="https://github.com/piratey7007/" />
        <Icon
          name="Discord"
          link="https://discordapp.com/users/347554007750803459/"
        />
        <Icon
          name="Reddit"
          link="https://www.reddit.com/user/CompetitiveAd7245/"
        />
      </ul>
    </div>
  );
}

function Icon({ name, link }: { name: string; link: string }) {
  return (
    <li className="relative aspect-square h-8">
      <Tippy content={name}>
        <Link
          to={link}
          target="_blank"
          className="group pointer-events-auto relative block h-full w-full"
        >
          <img
            src={`/src/assets/${name.toLowerCase()}.png`}
            alt={name}
            className="absolute top-0 bottom-0 right-0 left-0 z-0 m-auto h-full w-full cursor-pointer opacity-40 transition-all duration-150 ease-out group-hover:scale-110 group-hover:opacity-80"
          />
          <div className="absolute top-0 bottom-0 -left-2 -z-10 my-auto h-[150%] w-[150%] rounded-full bg-gradient-radial from-black to-transparent opacity-10 transition-all duration-150 group-hover:scale-125 group-hover:opacity-25" />
        </Link>
      </Tippy>
    </li>
  );
}
