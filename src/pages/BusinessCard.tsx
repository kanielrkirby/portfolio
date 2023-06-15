import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import useBreakpoint from "../hooks/useBreakpoint";
import useLocal from "../hooks/useLocal";
import Logo from "../assets/Logo";
import { useEffect, useState } from "react";
import Flip from "../assets/Flip";
import mail from "../assets/icons/mail.png";
import link from "/link.png";
import phone from "../assets/icons/phone.png";
import qr from "../assets/icons/qr-code.png";
import linkedin from "../assets/icons/linkedin.png";
import blueSplash from "../assets/paint-splashes/blue-pink-splash.png";
import redSplash from "../assets/paint-splashes/red-purple-splash.png";

export default function BusinessCard() {
  const { isSm, isMd, isSideways } = useBreakpoint();
  return (
    <>
      <Helmet>
        <title>Kaniel Kirby</title>
        <meta
          name="description"
          content="Kaniel Kirby's Virtual Business Card."
        />
      </Helmet>
      <div className="fixed left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-[1rem] bg-neutral-900 text-center">
        <Card
          front={
            <div
              className={`-z-10 flex h-full w-full flex-col items-center justify-center`}
            >
              <Logo
                className={`mb-[1%] aspect-square ${
                  (isMd || isSm) && !isSideways ? "w-[50%]" : "h-[50%]"
                }`}
              />
              <div className="flex flex-col gap-[3%]">
                <h1
                  className={`whitespace-nowrap font-[courier] ${
                    (isMd || isSm) && !isSideways
                      ? "text-[5.75vh] [line-height:7vh] "
                      : "text-[5.75vw] [line-height:7vw] "
                  }`}
                >
                  Kaniel Kirby
                </h1>
                <h2
                  className={`font-[courier] opacity-70 ${
                    (isMd || isSm) && !isSideways ? "text-[3vh]" : "text-[3vw]"
                  }`}
                >
                  Web Developer
                </h2>
              </div>
            </div>
          }
          back={
            <div
              className={`relative -z-10 flex h-full w-full items-center ${
                (isMd || isSm) && !isSideways
                  ? "flex-col-reverse"
                  : "flex-row-reverse"
              }`}
            >
              <Tippy
                content="My Website"
                placement={(isMd || isSm) && !isSideways ? "bottom" : "left"}
              >
                <Link
                  to="/"
                  className={`absolute ${
                    (isMd || isSm) && !isSideways
                      ? "bottom-[5%] w-[50%]"
                      : "right-[5%] w-[26%]"
                  }`}
                >
                  <img
                    src={qr}
                    alt=""
                    className={`aspect-square cursor-pointer rounded-lg border-solid border-black shadow-md transition-all duration-200 [border-width:.35vw] hover:scale-105 hover:shadow-xl`}
                  />
                </Link>
              </Tippy>
              <img
                src="/kaniel-kirby-1.jpg"
                alt=""
                className={`absolute aspect-square rounded-lg border-solid border-black object-cover [border-width:.35vw] ${
                  (isMd || isSm) && !isSideways
                    ? "top-[3%] w-[50%]"
                    : "left-[25%] top-[2%] h-[43%] -translate-x-[30%]"
                }`}
              />
              <h2
                className={`absolute text-center font-[courier] font-bold ${
                  (isMd || isSm) && !isSideways
                    ? "top-[33%] text-[4vh]"
                    : "left-[23%] top-[48%] -translate-x-[30%] text-[5vw]"
                }`}
              >
                Kaniel Kirby
              </h2>
              <ul
                className={
                  "font-[courier] " + (isMd || isSm) && !isSideways
                    ? "text-[2.4vh]"
                    : "text-[3.4vw]"
                }
              >
                <Tippy
                  content="My Cell"
                  placement={(isMd || isSm) && !isSideways ? "bottom" : "top"}
                >
                  <li
                    className={`group absolute ${
                      (isMd || isSm) && !isSideways
                        ? "left-0 top-[41%]"
                        : "left-[5%] top-[73%]"
                    }`}
                  >
                    <a
                      href="tel:325.443.6046"
                      className={`flex items-center gap-[3%] transition-transform duration-200 group-hover:scale-105
                          ${
                            (isMd || isSm) && !isSideways
                              ? "flex items-center justify-between px-[5%]"
                              : " left-[5%]"
                          }
                          `}
                    >
                      <img
                        src={phone}
                        alt=""
                        className={`drop-shadow-lg transition-transform duration-200 group-hover:-rotate-12 ${
                          (isSm || isMd) && !isSideways ? "h-[7vh]" : "w-[7vw]"
                        }`}
                      />
                      <span className="w-full text-start font-[courier]">
                        325.443.6046
                      </span>
                    </a>
                  </li>
                </Tippy>
                <Tippy
                  content="My LinkedIn"
                  placement={(isMd || isSm) && !isSideways ? "bottom" : "top"}
                >
                  <li
                    className={`group absolute ${
                      (isMd || isSm) && !isSideways
                        ? "left-0 top-[50%]"
                        : "left-[5%] top-[58%]"
                    }`}
                  >
                    <a
                      href="https://www.linkedin.com/in/kanielrkirby/"
                      className={`flex items-center gap-[3%] transition-transform duration-200 group-hover:scale-105
                          ${
                            (isMd || isSm) && !isSideways
                              ? "flex items-center justify-between px-[5%]"
                              : ""
                          }
                          `}
                    >
                      <img
                        src={linkedin}
                        alt=""
                        className={`drop-shadow-lg transition-transform duration-200 group-hover:-rotate-12 ${
                          (isSm || isMd) && !isSideways ? "h-[7vh]" : "w-[7vw]"
                        }`}
                      />
                      <span className="w-full text-start font-[courier]">
                        @kanielrkirby
                      </span>
                    </a>
                  </li>
                </Tippy>
                <Tippy
                  content="My Email"
                  placement={(isMd || isSm) && !isSideways ? "bottom" : "top"}
                >
                  <li
                    className={`group absolute ${
                      (isMd || isSm) && !isSideways
                        ? "left-[-2%] top-[58.5%]"
                        : "left-[5%] top-[87%]"
                    }`}
                  >
                    <a
                      href="mailto:kanielrkirby@runbox.com"
                      className={`flex items-center gap-[3%] transition-transform duration-200 group-hover:scale-105
                                    ${
                                      (isMd || isSm) && !isSideways
                                        ? "flex items-center justify-between px-[5%]"
                                        : ""
                                    }
                                    `}
                    >
                      <img
                        src={mail}
                        alt=""
                        className={`drop-shadow-lg transition-transform duration-200 group-hover:-rotate-12 ${
                          (isSm || isMd) && !isSideways ? "h-[7vh]" : "w-[7vw]"
                        }`}
                      />
                      <span className="w-full text-start font-[courier]">
                        kanielrkirby@runbox.com
                      </span>
                    </a>
                  </li>
                </Tippy>
              </ul>
            </div>
          }
        />
        <Tippy content="My Website" placement="bottom">
          <div>
            <Link to="/" className="group flex gap-4">
              <img src={link} className="w-8" alt="" />
              <span className="link fancy">Back to my website!</span>
            </Link>
          </div>
        </Tippy>
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
  const { isSm, isMd, isSideways } = useBreakpoint();

  return (
    <div
      className={`relative transition-all duration-300 [perspective:1000px] ${
        className ?? ""
      } ${
        (isMd || isSm) && !isSideways
          ? "aspect-[2/3.5] h-[80%]"
          : "aspect-[3.5/2] w-[85%]"
      }
      `}
    >
      <div
        className={`relative h-full w-full rounded-md transition-all duration-300 [transform-style:preserve-3d]  ${
          flipped
            ? "shadow-[-7px_3px_13px_3px_#00000050] [transform:rotate3d(0,1,0,180deg)]"
            : "shadow-[7px_3px_13px_3px_#00000050] [transform:rotate3d(0,1,0,0deg)]"
        }`}
      >
        <div className="absolute flex h-full w-full flex-col items-center justify-center rounded-md bg-black transition-all duration-300 [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
          <div className={`relative h-full w-full ${!flipped ? "z-10" : ""}`}>
            <Tippy content="Flip card for more!" placement="bottom">
              <div
                className={`absolute right-[2%] top-[4%] cursor-pointer transition-all duration-200 hover:rotate-12 hover:scale-105 ${
                  (isMd || isSm) && !isSideways ? "h-[6%]" : "w-[8%]"
                }`}
                onClick={(e) => {
                  setFlipped((prev) => !prev);
                }}
              >
                <Flip className="h-full w-full" />
              </div>
            </Tippy>
            {front}
          </div>
          <CardBG />
        </div>
        <div className="absolute flex h-full w-full flex-col items-center justify-center rounded-md bg-black transition-all duration-300 [transform:rotate3d(0,1,0,180deg)] [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
          <div className={`relative h-full w-full ${flipped ? "z-10" : ""}`}>
            <Tippy content="Go back" placement="bottom">
              <div
                className={`absolute right-[2%] top-[4%] cursor-pointer transition-all duration-200 hover:rotate-12 hover:scale-105 ${
                  (isMd || isSm) && !isSideways ? "h-[6%]" : "w-[8%]"
                }`}
                onClick={(e) => {
                  setFlipped((prev) => !prev);
                }}
              >
                <Flip className="h-full w-full" />
              </div>
            </Tippy>
            {back}
          </div>
          <CardBG flipped />
        </div>
      </div>
    </div>
  );
}

function CardBG({ flipped = false }: { flipped?: boolean }) {
  const { isSm, isMd, isSideways } = useBreakpoint();
  return (
    <div
      className={`pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden opacity-70 ${
        flipped ? "[transform:rotate3d(0,1,0,180deg)]" : ""
      }`}
    >
      <img
        src={blueSplash}
        alt=""
        className={`absolute w-[60%] ${
          (isMd || isSm) && !isSideways
            ? flipped
              ? "left-[80%] top-[30%]"
              : "left-[-20%] top-[80%]"
            : flipped
            ? "bottom-[-70%] right-[-40%]"
            : "bottom-[-70%] right-[-30%]"
        }`}
      />
      <img
        src={blueSplash}
        alt=""
        className={`absolute ${
          (isMd || isSm) && !isSideways
            ? flipped
              ? "left-[0%] top-[-12%] rotate-[60deg]"
              : "right-[-50%] top-[75%]"
            : flipped
            ? "right-[-12%] top-[-70%] w-[80%]"
            : "right-[-20%] top-[-50%] w-[60%]"
        }`}
      />
      <img
        src={redSplash}
        alt=""
        className={`absolute ${
          (isMd || isSm) && !isSideways
            ? flipped
              ? "bottom-[-25%] left-[0%] rotate-90"
              : "left-[-5%] top-[10%]"
            : flipped
            ? "right-[55%] top-[-25%] w-[70.5%]"
            : "left-[-24%] top-[-55%] w-[60%]"
        }`}
      />
      <img
        src={redSplash}
        alt=""
        className={`absolute bottom-[-73%] left-[-25%] w-[60%] ${
          (isMd || isSm) && !isSideways
            ? flipped
              ? "bottom-[-7%] left-[30%] rotate-[110deg] scale-[175%]"
              : "left-[-20%] top-[-20%]"
            : flipped
            ? "hidden"
            : ""
        }`}
      />
    </div>
  );
}
