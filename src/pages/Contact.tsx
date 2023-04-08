import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import IconBar from "../components/IconBar";
import Tippy from "@tippyjs/react";
import { useEffect, useState } from "react";
import { useDev } from "../contexts/DevContext";

export default function Contact({ className }: { className: string }) {
  const [counter, setCounter] = useState(0);
  const [content, setContent] = useState("Image of Kaniel Kirby");
  const { dev, setDev } = useDev();

  useEffect(() => {
    if (counter >= 1) {
      if (counter > 9) {
        if (!dev) setDev(true);
        if (counter > 10) {
          setContent("You're already a developer!");
          return;
        }
      }
      setContent(`${10 - counter} clicks until you're a developer.`);
    }
  }, [counter]);

  return (
    <div className={className}>
      <Helmet>
        <title>Contact</title>
        <meta name="description" content="Kaniel Kirby's 'Contact' page." />
      </Helmet>
      <div className="relative flex flex-col items-center gap-8">
        <Tippy content={content} hideOnClick={false}>
          <img
            src="/src/assets/kaniel-kirby-2.jpg"
            alt="Picture of Kaniel Kirby"
            className="peer h-[20rem] w-[20rem] cursor-pointer rounded-[5rem] object-cover shadow-lg shadow-[#00000080] transition-all duration-200 hover:scale-[102%] hover:shadow-xl hover:shadow-[#00000080]"
            onClick={() => setCounter(counter + 1)}
          />
        </Tippy>
        <div className="peer pointer-events-none absolute z-10 h-[20rem] w-[20rem] rounded-[5rem] bg-black opacity-20 transition-all duration-200 peer-hover:scale-[102%]" />
        <IconBar className="-mt-4" place="bottom" />
      </div>
    </div>
  );
}
