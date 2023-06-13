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
              <p className={`${isSm ? "w-[50ch]" : "w-[30ch]"}`}>
                {description}
              </p>
              <Tippy
                content={`Get a closer look at ${title}!`}
                className="text-center"
                placement={isSm || isMd ? "bottom" : "left"}
              >
                <Link
                  to={`/projects/${title
                    .toLowerCase()
                    .replaceAll(" ", "-")
                    .replaceAll("'", "")}`}
                  className="link fancy relative whitespace-nowrap"
                >
                  See it yourself.
                </Link>
              </Tippy>
            </div>
          </div>
        );
      })}
    </div>
  );
}
