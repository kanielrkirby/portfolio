import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useBreakpoint from "../hooks/useBreakpoint";
import { SetStateAction, cloneElement, useRef, useState } from "react";

export default function Projects() {
  const { isSm, isMd } = useBreakpoint();
  const projects = [
    {
      title: "Polychrome",
      description:
        "A versatile color palette generator with multiple algorithms.",
      summary:
        "I have developed Polychrome, a custom color palette generator that offers a range of versatile algorithms. This innovative tool took me three months to build entirely from scratch. By incorporating TypeScript and PostCSS, I streamlined the development process to be efficient and accessible. In order to create the most effective algorithms, I dedicated significant time to studying color theory and delving into the intricacies of color interactions. Additionally, I personally designed and crafted all the scalable vector graphics (SVGs), including the logo and icons. Furthermore, I made sure to optimize the website for seamless responsiveness on mobile devices.",
      link: "https://piratey7007.github.io/polychrome/",
      video: `${import.meta.env.VITE_IMAGE_URL}/polychrome.gif`,
    },
    {
      title: "Bazaar",
      description: "A feature-rich online marketplace.",
      summary:
        "Bazaar is a comprehensive online marketplace that provides users with the ability to create accounts, post products, search for items based on filters, add items to their cart, and complete a simulated checkout process. In addition, users can review their previous orders and manage their profile and payment information. The platform was developed using a range of technologies, including React TypeScript, Tailwind, and NestJS, and leverages various libraries to deliver a seamless and efficient development experience. Additionally, I leveraged Figma to create a wireframe for the platform. Bazaar was my first team project where I worked with other developers to create a more expansive website than what I could create on my own. The experience taught me vital communication and team building skills.",
      link: "https://We-Got-This-2023.github.io/bazaar/",
      video: `${import.meta.env.VITE_IMAGE_URL}/bazaar.gif`,
    },
    {
      title: "Doctor Jay's Clinic",
      description: "A web portal for a healthcare professional.",
      summary: "",
      link: "https://piratey7007.github.io/healthcare-portal/",
      video: `${import.meta.env.VITE_IMAGE_URL}/healthcare-portal.gif`,
    },
  ];

  return (
    <div className={"flex w-full flex-col items-center gap-2"}>
      <h1 className="mb-5 text-4xl font-bold">My Projects</h1>
      {projects.map(({ title, description, summary, link, video }, index) => {
        const openState = useState(false);
        return (
          <div
            key={title + index}
            className={`flex w-full items-center p-4 ${
              isSm ? "flex-col-reverse justify-around" : "justify-center"
            }`}
          >
            <Helmet>
              <title>Projects</title>
              <meta name="description" content="A list of my projects." />
            </Helmet>
            <img
              src={video}
              about={description}
              className={`flex aspect-[2/1.25] h-fit w-[30rem] max-w-[90vw] items-center justify-center bg-black object-cover shadow-sm transition-all duration-300 hover:scale-[102%] hover:shadow-xl ${
                isSm ? "rounded-md" : "rounded-lg"
              }`}
              alt={"GIF of " + title}
            />
            <div className="flex w-1/2 flex-col items-center justify-around gap-2 p-4 text-center">
              <h2 className="whitespace-nowrap text-3xl">{title}</h2>
              <p
                onClick={() => openState[1](true)}
                className={`${isSm ? "w-[50ch]" : "w-[30ch]"}`}
              >
                {description}
              </p>
              <div className="flex flex-col justify-between">
                <Tippy
                  content={`Look into how ${title} was made!`}
                  className="text-center"
                  placement={isSm || isMd ? "bottom" : "left"}
                >
                  <Popover content={summary} openState={openState}>
                    <span
                      onClick={() => openState[1]((prev) => !prev)}
                      className="link fancy relative cursor-pointer whitespace-nowrap"
                    >
                      More info.
                    </span>
                  </Popover>
                </Tippy>
                <Tippy
                  content={`Get a closer look at ${title}!`}
                  className="text-center"
                  placement={isSm || isMd ? "bottom" : "left"}
                >
                  <Link
                    to={link}
                    className="link fancy relative whitespace-nowrap"
                  >
                    See it yourself.
                  </Link>
                </Tippy>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Popover({
  content,
  children: anchor,
  openState,
}: {
  content: string;
  children: JSX.Element;
  openState: [boolean, React.Dispatch<SetStateAction<boolean>>];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const a = useState();
  const [open, setOpen] = openState;
  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 top-0 z-50 m-auto h-full w-full backdrop-blur-md transition-all duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="h-full w-full bg-black opacity-50" />
        <div
          className={`absolute bottom-0 left-0 right-0 top-0 m-auto h-fit w-full max-w-[45rem] rounded-md bg-white px-4 py-12 text-black transition-all duration-200`}
        >
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="z-index:50 group absolute right-0 top-0 m-2 p-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:z-40 after:m-auto after:h-full after:w-0 after:rounded-md after:bg-black after:transition-all after:duration-200 after:content-[''] hover:after:w-[105%]"
          >
            <span className="relative z-50 text-black group-hover:font-bold group-hover:text-red-500">
              Close
            </span>
          </button>
          <button onClick={() => setOpen((prev) => !prev)} />
          {content}
        </div>
      </div>
      {cloneElement(anchor, {
        ...anchor.props,
        key: anchor.key,
        ref,
      })}
    </>
  );
}
