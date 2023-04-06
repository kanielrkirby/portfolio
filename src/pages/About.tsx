import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { fancyBorder } from "../styles";

export default function About({ className }: { className: string }) {
  return (
    <div className={className}>
      <Helmet>
        <title>About Me</title>
        <meta name="description" content="Kaniel Kirby's 'About Me' page." />
      </Helmet>
      <div className="flex items-start justify-around p-8 text-center">
        <div className="flex w-1/2 flex-col items-center gap-4">
          <img
            src="/src/assets/kaniel-kirby.jpg"
            alt="Picture of Kaniel Kirby"
            className="w-[30rem] overflow-hidden rounded-lg object-contain p-4"
          />
          <Link
            to="/contact"
            className={`relative text-2xl text-blue-400 transition-all duration-150 [text-shadow:0_0_2px_#00000050] hover:text-blue-300 hover:[text-shadow:0_0_4px_#00000050] ${fancyBorder} after:bg-blue-400 hover:after:bg-blue-300`}
          >
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
            <Link
              to="/projects"
              className={`relative font-normal text-blue-400 transition-all duration-150 [text-shadow:0_0_4px_#00000050] after:bg-blue-400 hover:text-blue-300 hover:[text-shadow:0_0_8px_#00000080] hover:after:bg-blue-300 ${fancyBorder}`}
            >
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
