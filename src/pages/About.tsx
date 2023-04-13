import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import useBreakpoint from "../hooks/useBreakpoint";
import { useDev } from "../contexts/DevContext";

export default function About() {
  const { isSm, isMd } = useBreakpoint();
  const { decrement, message } = useDev();
  const image = (
    <Tippy
      content={message || "Image of myself."}
      hideOnClick={false}
      placement={isSm || isMd ? "bottom" : "right"}
    >
      <div
        onClick={decrement}
        className="relative z-0 m-4 flex h-fit w-full cursor-pointer items-center justify-center overflow-hidden rounded-[1.5rem] shadow-md shadow-[#00000080] transition-all duration-200 hover:scale-[102%] hover:shadow-xl hover:shadow-[#00000080]"
      >
        <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-full bg-black opacity-20" />
        <img
          src="/src/assets/image.jpg"
          alt="Image of myself."
          className="relative top-0 left-0 z-10 w-full max-w-[95vw] object-contain text-center align-middle"
        />
      </div>
    </Tippy>
  );
  return (
    <>
      <Helmet>
        <title>About Me</title>
        <meta name="description" content="Kaniel Kirby's 'About Me' page." />
      </Helmet>
      <div
        className={`flex items-center justify-around gap-8 p-8 text-center ${
          isMd || isSm ? "flex-col-reverse" : ""
        }`}
      >
        <div
          className={`flex w-[20rem] flex-col items-center gap-4 ${
            isSm || isMd ? "" : "sticky bottom-12 top-24"
          }`}
        >
          {image}
          <div className="mx-4 flex w-full justify-center gap-12">
            <Tippy content="Contact Me">
              <Link to="/contact" className={`link fancy w-full`}>
                Contact Me
              </Link>
            </Tippy>
            <Tippy content="My Projects">
              <Link to="/projects" className={`link fancy w-full`}>
                My Projects
              </Link>
            </Tippy>
          </div>
        </div>
        <div
          className={`flex w-1/2 max-w-[95vw] flex-col items-center gap-4 ${
            isMd || isSm ? "w-full" : "w-1/2"
          }`}
        >
          <h3>Hey there!</h3>
          <p className="mb-4">
            Hi there! I'm Kaniel Kirby, a 20-year-old aspiring web developer
            from Abilene, Texas. I am passionate about creating user-friendly,
            interactive, and visually appealing web applications that make a
            real impact on users' experiences.
          </p>
          <h3>My Skills</h3>
          <hr className="w-1/2" />
          <h4>Front-end Development</h4>
          <p className="mb-4">
            Proficient in React, TypeScript, and Tailwind, I am capable of
            building engaging user interfaces that are both functional and
            visually appealing.
          </p>
          <h4>Design</h4>
          <p className="mb-4">
            With experience in Figma, I can create and implement beautiful
            designs that enhance the overall usability of web applications.
          </p>
          <h4>Back-end Development</h4>
          <p className="mb-4">
            Although I have minor experience in Node/Express and Firebase, I am
            eager to expand my skill set in back-end development to create more
            comprehensive and robust applications.
          </p>
          <h4>Adaptability</h4>
          <p className="mb-4">
            Being flexible and always willing to learn new things, I quickly
            adapt to new technologies and techniques to ensure projects are
            completed efficiently and to a high standard.
          </p>
        </div>
      </div>
    </>
  );
}
