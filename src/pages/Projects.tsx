export default function Projects({ className }: { className: string }) {
  const projects = [
    {
      title: "Polychrome",
      description: {
        short: "A simple color palette generator.",
        long: "A simple color palette generator.",
      },
      link: "https://piratey7007.github.io/polychrome/",
      image: "https://piratey7007.github.io/polychrome/polychrome.png",
      video: "https://www.youtube.com/embed/",
    },
    {
      title: "Banter",
      description: { short: "A chat app.", long: "A chat app." },
      link: "https://piratey7007.github.io/banter/",
      image: "https://piratey7007.github.io/banter/banter.png",
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
