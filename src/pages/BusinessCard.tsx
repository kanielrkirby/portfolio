import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import useBreakpoint from "../hooks/useBreakpoint";
import useLocal from "../hooks/useLocal";
import Logo from "../assets/Logo";
import { useEffect, useState } from "react";
import Flip from "../assets/Flip";

export default function BusinessCard() {
  const { isSm, isMd } = useBreakpoint();
  return (
    <>
      <Helmet>
        <title>Kaniel Kirby</title>
        <meta
          name="description"
          content="Kaniel Kirby's Virtual Business Card."
        />
      </Helmet>
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center text-center">
        <Card
          front={
            <>
              <Logo className="w-[45%]" />
              <h1 className="text-[2.25rem]">Kaniel Kirby</h1>
              <h2 className="text-[1.5rem] opacity-70">Web Developer</h2>
            </>
          }
          back={<>Web Developer</>}
        />
      </div>
    </>
  );
}

function Card({
  front,
  back,
  className,
}: {
  front: JSX.Element | JSX.Element[];
  back: JSX.Element | JSX.Element[];
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const [icons, setIcons] = useState<any>();
  const flip = (pos: string) => (
    <Flip
      id={`business-card-${pos}-flip-icon`}
      className={`absolute right-2 top-2 w-10 transition-all duration-1000`}
      onClick={(e) => {
        const elem = document.getElementById(`business-card-${pos}-flip-icon`)!;
        elem.classList.add("rotate-120");
        setTimeout(() => {
          elem.classList.remove("rotate-120");
        }, 1000);
        setFlipped((prev) => !prev);
      }}
    />
  );
  useEffect(() => {
    setIcons({ front: flip("front"), back: flip("back") });
  }, []);
  return (
    <div
      className={`relative aspect-[3.5/2] h-fit w-[40rem] p-10 transition-all duration-300 [perspective:1000px] ${
        className ?? ""
      }`}
    >
      <div
        className={`relative h-full w-full rounded-md transition-all duration-300 [transform-style:preserve-3d] ${
          flipped
            ? "shadow-[-7px_3px_13px_3px_#00000050] [transform:rotate3d(0,1,0,180deg)]"
            : "shadow-[7px_3px_13px_3px_#00000050] [transform:rotate3d(0,1,0,0deg)]"
        }`}
      >
        <div className="absolute flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md bg-black p-10 transition-all duration-300 [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
          <Tippy content="Flip card for more!">{icons?.front}</Tippy>
          {front}
        </div>
        <div className="absolute flex h-full w-full flex-col items-center justify-center rounded-md bg-black p-10 transition-all duration-300 [transform:rotate3d(0,1,0,180deg)] [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
          <Tippy content="Flip card">{icons?.back}</Tippy>
          {back}
        </div>
      </div>
    </div>
  );
}
