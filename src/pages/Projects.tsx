import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useBreakpoint from "../hooks/useBreakpoint";

export default function Projects() {
  const { isSm, isMd } = useBreakpoint();
  const projects = [
    {
      title: "Polychrome",
      description: {
        short: "A versatile color palette generator with multiple algorithms.",
        long: "Polychrome is a versatile color palette generator that features multiple color algorithms, drag and drop swatches, copy/paste functionality, and more. As my first project, it took 3 months to complete and was built using Plain TypeScript and PostCSS, with minimal reliance on external libraries.",
      },
      link: "https://piratey7007.github.io/polychrome/",
      image: "https://piratey7007.github.io/polychrome/polychrome.png",
      video: "https://www.youtube.com/embed/",
    },
    {
      title: "Banter",
      description: {
        short: "A real-time chat app with customizable profiles.",
        long: "Banter is a real-time chat app that allows users to create customizable profiles, engage in instant messaging, and more. Built using React TypeScript and Tailwind, Banter provides a modern and interactive chatting experience.",
      },
      link: "https://piratey7007.github.io/banter/",
      image: "https://piratey7007.github.io/banter/banter.png",
      video: "https://www.youtube.com/embed/",
    },
    {
      title: "Bazaar",
      description: {
        short: "A feature-rich online marketplace.",
        long: "Bazaar is a comprehensive online marketplace that allows users to create accounts, post products, search for items based on filters, add items to their cart, and complete a simulated checkout process. Users can also review their previous orders. Bazaar was built using React TypeScript, Tailwind, NestJS, and makes use of numerous libraries to provide a seamless shopping experience.",
      },
      link: "https://We-Got-This-2023.github.io/bazaar/",
      image: "https://We-Got-This-2023.github.io/bazaar/bazaar.png",
      video: "https://www.youtube.com/embed/",
    },
  ];

  return (
    <div className={"flex w-full flex-col items-center gap-2"}>
      {projects.map(({ title, description, link, image, video }, index) => {
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
            <Tippy
              content="Link to site"
              placement={isMd || isSm ? "bottom" : "right"}
            >
              <a href={link} className="w-fit">
                <video
                  src={video}
                  about={description.short}
                  className="w-[30rem] max-w-full rounded-xl bg-black"
                >
                  <img src={image} alt={description.short} />
                </video>
              </a>
            </Tippy>
            <div className="flex w-1/2 flex-col items-center justify-around gap-2 p-4 text-center">
              <h2 className="text-2xl">{title}</h2>
              <p className={`text-sm ${isSm ? "w-[50ch]" : "w-[30ch]"}`}>
                {description.short}
              </p>
              <Tippy
                content={`Get a closer look at how ${title} was made!`}
                className="text-center"
                placement={isSm || isMd ? "bottom" : "left"}
              >
                <Link
                  to={`/projects/${title.toLowerCase()}`}
                  className="link fancy relative"
                >
                  More Info
                </Link>
              </Tippy>
            </div>
          </div>
        );
      })}
    </div>
  );
}
