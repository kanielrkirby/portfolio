import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import useBreakpoint from "../hooks/useBreakpoint";
import useLocal from "../hooks/useLocal";

export default function About() {
  const { isSm, isMd } = useBreakpoint();
  const { decrement, message } = useLocal();
  return (
    <>
      <Helmet>
        <title>About Me</title>
        <meta name="description" content="Kaniel Kirby's 'About Me' page." />
      </Helmet>
      <h1 className="text-4xl font-bold">About Me</h1>
      <div
        className={`flex w-full items-center justify-around gap-8 p-8 text-center ${
          isMd || isSm ? "flex-col-reverse" : ""
        }`}
      >
        <div
          className={`flex w-full flex-col items-center justify-center gap-4 ${
            isSm || isMd ? "max-w-[90vw]" : "sticky bottom-12 top-24"
          }`}
        >
          <Tippy
            content={message || "Image of myself."}
            hideOnClick={false}
            placement={isSm || isMd ? "bottom" : "right"}
          >
            <div
              onClick={decrement}
              className="relative z-0 m-4 flex h-fit min-h-[30rem] w-full max-w-[25rem] cursor-pointer items-center justify-center overflow-hidden rounded-[1.5rem] shadow-md shadow-[#00000080] transition-all duration-200 hover:scale-[102%] hover:shadow-xl hover:shadow-[#00000080]"
            >
              <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-full bg-black opacity-20" />
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/kaniel-kirby-1.jpg`}
                alt="Image of myself."
                className="relative left-0 top-0 z-10 w-full max-w-[95vw] object-contain text-center align-middle"
              />
            </div>
          </Tippy>
          <div className="mx-4 flex w-full max-w-[25rem] flex-col flex-wrap items-center justify-between gap-4">
            <Tippy content="Contact Me">
              <Link
                to="/contact"
                className={`link fancy w-fit whitespace-nowrap`}
              >
                Contact Me
              </Link>
            </Tippy>
            <Tippy content="My Projects">
              <Link
                to="/projects"
                className={`link fancy w-fit whitespace-nowrap`}
              >
                My Projects
              </Link>
            </Tippy>
            <Tippy content="My Resume">
              <a
                href="https://www.google.com"
                className={`link fancy w-fit whitespace-nowrap`}
              >
                My Resume
              </a>
            </Tippy>
          </div>
        </div>
        <div
          className={`flex w-full flex-col items-center gap-4 ${
            isSm || isMd ? "" : "max-w-[60%]"
          }`}
        >
          <h3>Hey there!</h3>
          <p className="mb-4 w-full max-w-[60ch]">
            I'm Kaniel Kirby, a 20-year-old web developer from Abilene, Texas. I
            have a passion for creating beautiful, user-friendly websites that
            are interactive and visually engaging. I am proficient in
            React-Typescript, a tech stack I use to build and design user
            interfaces that are as functional as they are aesthetic.
          </p>
          <p className="mb-4 w-full max-w-[60ch]">
            When I'm not building websites, I enjoy drinking coffee, making
            music, and biking. I aspire to build a career around my skills and
            talents in web development by creating functional and engaging
            websites for my clientele. I enjoy working in a team setting and
            leading projects. Being flexible and always willing to learn new
            things, I quickly adapt to new technologies and techniques to ensure
            my clients are satisfied with their results.
          </p>
          <p className="mb-4 w-full max-w-[60ch]">
            I began programming because I wanted to build websites{" "}
            <strong className="inline-block scale-105 font-black [text-shadow:1px_1px_2px_#00000050]">
              the right way.
            </strong>{" "}
            I believe every client deserves a website that is built with the
            kind of care and passion that I put into my projects. Tired of
            outdated, clunky web pages? So am I. I want to work with you every
            step of the way as I create a personalized website that is
            accessible for you and your consumers.
          </p>
        </div>
      </div>
    </>
  );
}
