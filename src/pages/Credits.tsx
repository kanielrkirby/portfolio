import { Helmet } from "react-helmet";
import Icon from "../components/Icon";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";

const imgCl =
  "h-40 aspect-square rounded-lg object-cover shadow-lg shadow-[#00000080] transition-all duration-200 hover:scale-[102%] hover:shadow-xl hover:shadow-[#00000080]";

export default function Credits({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <Helmet>
        <title>Credits</title>
        <meta name="description" content="Gives credit to those that helped." />
      </Helmet>
      <h5>Icons Used</h5>
      <div className="flex gap-3">
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
      <h5>Images</h5>
      <div className="flex gap-3">
        <Tippy content="Taken by Zoe M. Harris">
          <Link
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
  );
}
