export default function Projects({ className }: { className: string }) {
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
    <div className={"flex flex-col " + className}>
      <h1 className="left-0 right-0 mx-auto">Projects</h1>
      <div className="flex flex-col gap-2">
        {projects.map(({ title, description, link, image, video }) => {
          return (
            <div className="flex justify-around">
              <a href={link}>
                <video
                  src={video}
                  about={description.short}
                  className="rounded-xl bg-black"
                >
                  <img src={image} alt={description.short} />
                </video>
              </a>
              <div className="flex w-1/2 flex-col items-center gap-2">
                <h2>{title}</h2>
                <p>{description.long}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
