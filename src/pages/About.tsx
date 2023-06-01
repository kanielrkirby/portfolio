import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import useBreakpoint from "../hooks/useBreakpoint";
import { useDev } from "../contexts/DevContext";

export default function About() {
  const { isSm, isMd } = useBreakpoint();
  const { decrement, message } = useDev();
  return (
    <>
      <Helmet>
        <title>About Me</title>
        <meta name="description" content="Kaniel Kirby's 'About Me' page." />
      </Helmet>
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
                src="/src/assets/image.jpg"
                alt="Image of myself."
                className="relative left-0 top-0 z-10 w-full max-w-[95vw] object-contain text-center align-middle"
              />
            </div>
          </Tippy>
          <div className="mx-4 flex w-full max-w-[25rem] flex-wrap justify-between gap-4">
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
          </div>
        </div>
        <div
          className={`flex w-full flex-col items-center gap-4 ${
            isSm || isMd ? "" : "max-w-[60%]"
          }`}
        >
          <h3>Hey there!</h3>
          <p className="mb-4 w-full max-w-[60ch]">
            Hi there! I'm Kaniel Kirby, a 20-year-old aspiring web developer
            from Abilene, Texas. I am passionate about creating user-friendly,
            interactive, and visually appealing web applications that make a
            real impact on users' experiences.
          </p>
          <h3>My Skills</h3>
          <hr className="w-1/2" />
          <h4>Front-end Development</h4>
          <p className="mb-4 w-full max-w-[60ch]">
            Proficient in React, TypeScript, and Tailwind, I am capable of
            building engaging user interfaces that are both functional and
            visually appealing.
          </p>
          <h4>Design</h4>
          <p className="mb-4 w-full max-w-[60ch]">
            With experience in Figma, I can create and implement beautiful
            designs that enhance the overall usability of web applications.
          </p>
          <h4>Back-end Development</h4>
          <p className="mb-4 w-full max-w-[60ch]">
            Although I have minor experience in Node/Express and Firebase, I am
            eager to expand my skill set in back-end development to create more
            comprehensive and robust applications.
          </p>
          <h4>Adaptability</h4>
          <p className="mb-4 w-full max-w-[60ch]">
            Being flexible and always willing to learn new things, I quickly
            adapt to new technologies and techniques to ensure projects are
            completed efficiently and to a high standard.
          </p>
        </div>
      </div>
    </>
  );
}
