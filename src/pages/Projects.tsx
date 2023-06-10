import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useBreakpoint from "../hooks/useBreakpoint";

export default function Projects() {
  const { isSm, isMd } = useBreakpoint();
  const projects = [
    {
      title: "Polychrome",
      description:
        "A versatile color palette generator with multiple algorithms.",
      link: "https://piratey7007.github.io/polychrome/",
      video: `${import.meta.env.VITE_IMAGE_URL}/polychrome.gif`,
    },
    {
      title: "Bazaar",
      description: "A feature-rich online marketplace.",
      link: "https://We-Got-This-2023.github.io/bazaar/",
      video: `${import.meta.env.VITE_IMAGE_URL}/bazaar.gif`,
    },
    {
      title: "Healthcare Portal",
      description: "A web portal for a healthcare professional.",
      link: "https://piratey7007.github.io/healthcare-portal/",
      video: `${import.meta.env.VITE_IMAGE_URL}/healthcare-portal.gif`,
    },
  ];

  return (
    <div className={"flex w-full flex-col items-center gap-2"}>
      {projects.map(({ title, description, link, video }, index) => {
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
                <img
                  src={video}
                  about={description}
                  className={`flex aspect-[2/1.25] h-fit w-[30rem] max-w-[90vw] items-center justify-center bg-black object-cover shadow-sm transition-all duration-300 hover:scale-[102%] hover:shadow-xl ${
                    isSm ? "rounded-md" : "rounded-lg"
                  }`}
                  alt={"GIF of " + title}
                />
              </a>
            </Tippy>
            <div className="flex w-1/2 flex-col items-center justify-around gap-2 p-4 text-center">
              <h2 className="text-2xl">{title}</h2>
              <p className={`text-sm ${isSm ? "w-[50ch]" : "w-[30ch]"}`}>
                {description}
              </p>
              <Tippy
                content={`Get a closer look at how ${title} was made!`}
                className="text-center"
                placement={isSm || isMd ? "bottom" : "left"}
              >
                <Link
                  to={`/projects/${title
                    .toLowerCase()
                    .replaceAll(" ", "-")
                    .replaceAll("'", "")}`}
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
