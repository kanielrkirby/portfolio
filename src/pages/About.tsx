import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { fancyBorder } from "../styles";
import Tippy from "@tippyjs/react";

export default function About({ className }: { className: string }) {
  return (
    <div className={className}>
      <Helmet>
        <title>About Me</title>
        <meta name="description" content="Kaniel Kirby's 'About Me' page." />
      </Helmet>
      <div className="flex items-start justify-around p-8 text-center">
        <div className="flex w-1/2 flex-col items-center gap-4">
          <Tippy content="Image of Kaniel Kirby">
            <div className="relative z-0 m-4 h-[40rem] w-[30rem] cursor-pointer overflow-hidden rounded-[1.5rem] shadow-md shadow-[#00000080] transition-all duration-200 hover:scale-[102%] hover:shadow-xl hover:shadow-[#00000080]">
              <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-full bg-black opacity-20" />
              <img
                src="/src/assets/kaniel-kirby.jpg"
                alt="Picture of Kaniel Kirby"
                className="absolute top-0 left-0 z-10 w-full object-contain"
              />
            </div>
          </Tippy>
          <Link to="/contact" className="link fancy">
            Contact Me
          </Link>
          <P>
            I am always open to new opportunities and collaborations. If you'd
            like to discuss a project or just chat about web development, feel
            free to contact me through the following channels:
          </P>
          <P>
            I look forward to connecting with you and working together to create
            amazing web experiences!
          </P>
        </div>
        <div className="flex w-1/2 flex-col items-center gap-4">
          <h3>Hey there!</h3>
          <P>
            Hi there! I'm Kaniel Kirby, a 20-year-old aspiring web developer
            from Abilene, Texas. I am passionate about creating user-friendly,
            interactive, and visually appealing web applications that make a
            real impact on users' experiences.
          </P>
          <h3>My Skills</h3>
          <h5>Front-end Development</h5>
          <p>
            Proficient in React, TypeScript, and Tailwind, I am capable of
            building engaging user interfaces that are both functional and
            visually appealing.
          </p>
          <h5>Design</h5>
          <p>
            With experience in Figma, I can create and implement beautiful
            designs that enhance the overall usability of web applications.
          </p>
          <h5>Back-end Development</h5>
          <p>
            Although I have minor experience in Node/Express and Firebase, I am
            eager to expand my skill set in back-end development to create more
            comprehensive and robust applications.
          </p>
          <h5>Adaptability</h5>
          <p>
            Being flexible and always willing to learn new things, I quickly
            adapt to new technologies and techniques to ensure projects are
            completed efficiently and to a high standard.
          </p>
          <h3>
            <Link to="/projects" className="link fancy">
              My Projects
            </Link>
          </h3>
          <P>
            Throughout my journey as a web developer, I have successfully
            completed multiple projects showcasing my skills in various areas.
          </P>
        </div>
      </div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-center">{children}</p>;
}
