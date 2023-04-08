import { Helmet } from "react-helmet";
import Icon from "../components/Icon";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import ReactCodepen from "react-codepen-embed";

const imgCl =
  "h-40 aspect-square rounded-lg object-cover shadow-lg shadow-[#00000080] transition-all duration-200 hover:scale-[102%] hover:shadow-xl hover:shadow-[#00000080]";

export default function Credits({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center gap-4 text-center ${className}`}
    >
      <Helmet>
        <title>Credits</title>
        <meta name="description" content="Gives credit to those that helped." />
      </Helmet>
      <div className="flex w-[40rem] flex-col gap-2">
        <hr className="w-full" />
        <p>Hover over anything to see where it came from.</p>
        <p>Click anything to see more.</p>
        <p>Anything else is made by me.</p>
        <hr className="w-full" />
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-8">
        <div className="flex flex-col gap-4">
          <h5>Icons</h5>
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            <Icon
              name="Github"
              link="https://www.iconfinder.com/icons/317712/code_repository_github_repository_resource_icon"
              tippy="Github Icon found on IconFinder"
            />
            <Icon
              name="LinkedIn"
              link="https://www.iconfinder.com/icons/4747495/linked_in_social_media_networking_icon"
              tippy="LinkedIn Icon found on IconFinder"
            />
            <Icon
              name="Discord"
              link="https://www.iconfinder.com/icons/8546766/discord_icon"
              tippy="Discord Icon found on IconFinder"
            />
            <Icon
              name="Reddit"
              link="https://www.iconfinder.com/search?q=reddit&category=social-media"
              tippy="RedditIcon found on IconFinder"
            />
            <Icon
              name="Email"
              link="https://www.flaticon.com/free-icons/email"
              tippy="Email Icon created by Pixel Perfect - Flaticon"
            />
            <Icon
              name="Resume"
              link="https://www.flaticon.com/free-icons/resume-and-cv"
              tippy="Resume Icon created by nawicon - Flaticon"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h5>Images</h5>
          <div className="flex gap-3">
            <Tippy content="Taken by Zoe M. Harris">
              <Link
                className="link"
                to="https://www.linkedin.com/in/zoe-harris-cadmuswriting/"
                target="_blank"
              >
                <img
                  src="/src/assets/kaniel-kirby.jpg"
                  alt="Image of Kaniel Kirby"
                  className={imgCl}
                />
              </Link>
            </Tippy>
            <Tippy content="Taken by Zoe M. Harris">
              <Link
                className="link"
                to="https://www.linkedin.com/in/zoe-harris-cadmuswriting/"
                target="_blank"
              >
                <img
                  src="/src/assets/kaniel-kirby-2.jpg"
                  alt="Image of Kaniel Kirby"
                  className={imgCl}
                />
              </Link>
            </Tippy>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <Tippy content="Adapted from a CodePen by Kevin Levron">
              <div>
                <Link
                  className="link"
                  to="https://codepen.io/soju22/pen/xxGqJxj"
                  target="_blank"
                >
                  Background Animation
                </Link>
                <ReactCodepen
                  hash="xxGqJxj"
                  user="soju22"
                  defaultTab="result"
                  title={"Background Animation by Kevin Levron"}
                />
              </div>
            </Tippy>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h5>Libraries</h5>
          <div className="grid grid-cols-2 justify-items-center gap-1">
            <Tippy content="React">
              <Link className="link" to="https://reactjs.org/" target="_blank">
                React
              </Link>
            </Tippy>
            <Tippy content="Tippy.js">
              <Link
                className="link"
                to="https://atomiks.github.io/tippyjs/"
                target="_blank"
              >
                Tippy.js
              </Link>
            </Tippy>
            <Tippy content="React Helmet">
              <Link
                className="link"
                to="https://www.npmjs.com/package/react-helmet"
                target="_blank"
              >
                React Helmet
              </Link>
            </Tippy>
            <Tippy content="React CodePen Embed">
              <Link
                className="link"
                to="https://www.npmjs.com/package/react-codepen-embed/"
                target="_blank"
              >
                React CodePen Embed
              </Link>
            </Tippy>
            <Tippy content="React Router">
              <Link
                className="link"
                to="https://reactrouter.com/"
                target="_blank"
              >
                React Router
              </Link>
            </Tippy>
            <Tippy content="Tailwind CSS">
              <Link
                className="link"
                to="https://tailwindcss.com/"
                target="_blank"
              >
                Tailwind CSS
              </Link>
            </Tippy>
            <Tippy content="Vite">
              <Link className="link" to="https://vitejs.dev/" target="_blank">
                Vite
              </Link>
            </Tippy>
            <Tippy content="TypeScript">
              <Link
                className="link"
                to="https://www.typescriptlang.org/"
                target="_blank"
              >
                TypeScript
              </Link>
            </Tippy>
            <Tippy content="React Three Fiber">
              <Link
                className="link"
                to="docs.pmnd.rs/react-three-fiber"
                target="_blank"
              >
                React Three Fiber
              </Link>
            </Tippy>
            <Tippy content="ThreeJS">
              <Link className="link" to="https://threejs.org/" target="_blank">
                ThreeJS
              </Link>
            </Tippy>
            <Tippy content="ChromaJS">
              <Link
                className="link"
                to="https://gka.github.io/chroma.js/"
                target="_blank"
              >
                ChromaJS
              </Link>
            </Tippy>
            <Tippy content="Prettier">
              <Link className="link" to="https://prettier.io/" target="_blank">
                Prettier
              </Link>
            </Tippy>
          </div>
        </div>
      </div>
    </div>
  );
}
