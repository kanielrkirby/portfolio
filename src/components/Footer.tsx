import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function Footer({ className }: { className?: string }) {
  return (
    <div className={"mt-8 " + className}>
      <ul className="flex justify-end gap-4 p-2">
        <li>
          <Tippy content="LinkedIn">
            <Link
              to="https://www.linkedin.com/in/kaniel-kirby-9b1460261/"
              target="_blank"
            >
              <img
                src="/src/assets/linkedin.png"
                alt="LinkedIn"
                className="h-8 cursor-pointer opacity-40 transition-all duration-150 ease-out hover:scale-110 hover:opacity-70"
              />
            </Link>
          </Tippy>
        </li>
        <li>
          <Tippy content="Github">
            <Link to="https://github.com/piratey7007" target="_blank">
              <img
                src="/src/assets/github.png"
                alt="GitHub"
                className="h-8 cursor-pointer opacity-40 transition-all duration-150 ease-out hover:scale-110 hover:opacity-70"
              />
            </Link>
          </Tippy>
        </li>
        <li>
          <Tippy content="Discord">
            <Link
              to="https://discordapp.com/users/347554007750803459"
              target="_blank"
            >
              <img
                src="/src/assets/discord.png"
                alt="Discord"
                className="h-8 cursor-pointer opacity-40 transition-all duration-150 ease-out hover:scale-110 hover:opacity-70"
              />
            </Link>
          </Tippy>
        </li>
        <li>
          <Tippy content="Reddit">
            <Link
              to="https://www.reddit.com/user/CompetitiveAd7245"
              target="_blank"
            >
              <img
                src="/src/assets/reddit.png"
                alt="Reddit"
                className="h-8 cursor-pointer opacity-40 transition-all duration-150 ease-out hover:scale-110 hover:opacity-70"
              />
            </Link>
          </Tippy>
        </li>
      </ul>
    </div>
  );
}
