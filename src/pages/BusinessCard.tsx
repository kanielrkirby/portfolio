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
      <div className="fixed left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-[1rem] bg-neutral-900 text-center">
        <Card
          front={
            <div
              className={`flex h-full w-full flex-col items-center justify-center`}
            >
              <Logo
                className={`mb-[1%] aspect-square ${
                  isSm || isMd ? "w-[50%]" : "h-[50%]"
                }`}
              />
              <div className="flex flex-col gap-[1vw]">
                <h1
                  className={`font-body ${
                    isSm || isMd
                      ? "text-[6vh] [line-height:7vh] "
                      : "text-[6vw] [line-height:7vw] "
                  }`}
                >
                  Kaniel Kirby
                </h1>
                <h2
                  className={`font-body opacity-70 ${
                    isSm || isMd ? "text-[3vh]" : "text-[3vw]"
                  }`}
                >
                  Web Developer
                </h2>
              </div>
            </div>
          }
          back={
            <div
              className={`flex h-full w-full items-center ${
                isSm || isMd ? "flex-col-reverse" : "flex-row-reverse"
              }`}
            >
              <Tippy
                content="My Website"
                placement={isSm || isMd ? "bottom" : "left"}
              >
                <Link
                  to="/"
                  className={`mr-[3%] ${isSm || isMd ? "w-[50%]" : "w-[26%]"}`}
                >
                  <img
                    src={qr}
                    alt=""
                    className={`aspect-square w-full cursor-pointer rounded-lg border-solid border-black shadow-md transition-all duration-200 [border-width:.35vw] hover:scale-105 hover:shadow-xl
                      `}
                  />
                </Link>
              </Tippy>
              <div
                className={`flex h-full flex-col items-center justify-center gap-[5%] ${
                  isSm || isMd ? "w-full" : "w-[67%]"
                }`}
              >
                <img
                  src="/kaniel-kirby-1.jpg"
                  alt=""
                  className={`relative aspect-square rounded-lg border-solid border-black object-cover [border-width:.35vw] ${
                    isSm || isMd ? "w-[50%]" : "h-[43%] -translate-x-[30%]"
                  }`}
                />
                <h2
                  className={`text-center font-body text-[max(5vw,2rem)] font-bold ${
                    isSm || isMd ? "" : "-translate-x-[30%]"
                  }`}
                >
                  Kaniel Kirby
                </h2>
                <ul
                  className={`flex w-full flex-col text-[max(3vw,1.5rem)] ${
                    isSm || isMd ? "items-center" : "items-start"
                  }`}
                >
                  <Tippy
                    content="My Cell"
                    placement={isSm || isMd ? "bottom" : "top"}
                  >
                    <li className="group">
                      <a
                        href="tel:325.443.6046"
                        className={`flex items-center gap-[7%] transition-all duration-200 group-hover:scale-105
                          ${
                            isSm || isMd
                              ? "flex items-center justify-between px-[5%]"
                              : ""
                          }
                          `}
                      >
                        <img
                          src={phone}
                          alt=""
                          className="w-[8%] drop-shadow-lg transition-all duration-200 group-hover:-rotate-12"
                        />
                        <span className="">325.443.6046</span>
                      </a>
                    </li>
                  </Tippy>
                  <Tippy
                    content="My Email"
                    placement={isSm || isMd ? "bottom" : "top"}
                  >
                    <li className="group">
                      <a
                        href="mailto:kanielrkirby@runbox.com"
                        className={`flex items-center gap-[7%] transition-all duration-200 group-hover:scale-105
                          ${
                            isSm || isMd
                              ? "flex items-center justify-between px-[5%]"
                              : ""
                          }
                          `}
                      >
                        <img
                          src={mail}
                          alt=""
                          className="w-[8%] drop-shadow-lg transition-all duration-200 group-hover:-rotate-12"
                        />
                        <span className="text-[max(3vw,1.5rem)]">
                          kanielrkirby@runbox.com
                        </span>
                      </a>
                    </li>
                  </Tippy>
                  <Tippy
                    content="My LinkedIn"
                    placement={isSm || isMd ? "bottom" : "top"}
                  >
                    <li className="group">
                      <a
                        href="https://www.linkedin.com/in/kanielrkirby/"
                        className={`flex items-center gap-[7%] transition-all duration-200 group-hover:scale-105
                          ${
                            isSm || isMd
                              ? "flex items-center justify-between px-[5%]"
                              : ""
                          }
                          `}
                      >
                        <img
                          src={linkedin}
                          alt=""
                          className="w-[8%] drop-shadow-lg transition-all duration-200 group-hover:-rotate-12"
                        />
                        <span className="">@kanielrkirby</span>
                      </a>
                    </li>
                  </Tippy>
                </ul>
              </div>
            </div>
          }
        />
        <Tippy content="My Website" placement="bottom">
          <div>
            <Link to="/" className="fancy link group flex gap-4">
              <img src={link} className="w-8" alt="" />
              Back to my website!
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
  const { isSm, isMd } = useBreakpoint();

  return (
    <div
      className={`relative transition-all duration-300 [perspective:1000px] ${
        className ?? ""
      } ${
        isMd || isSm
          ? " aspect-[2/3.5] h-[95%] min-h-[25rem] max-w-[90%]"
          : "aspect-[3.5/2] w-[85%] min-w-[25rem]"
      }
      `}
    >
      <div
        className={`relative h-full w-full rounded-md transition-all duration-300 [transform-style:preserve-3d] ${
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
                  isSm || isMd ? "h-[6%]" : "w-[8%]"
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
                  isSm || isMd ? "h-[6%]" : "w-[8%]"
                }`}
                onClick={(e) => {
                  setFlipped((prev) => !prev);
                }}
              >
                <Flip />
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
  const { isSm, isMd } = useBreakpoint();
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
          isSm || isMd
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
          isSm || isMd
            ? flipped
              ? "left-[0%] top-[-5%] rotate-[60deg]"
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
          isSm || isMd
            ? flipped
              ? "bottom-[-20%] left-[60%] hidden"
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
          isSm || isMd
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
