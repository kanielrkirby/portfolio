import { Link } from "react-router-dom";

export default function Polychrome({ className }: { className?: string }) {
  return (
    <>
      <h1 className="mb-4 text-2xl text-black">Polychrome</h1>
      <P>
        As my first solo project, I created{" "}
        <a
          href="https://piratey7007.github.io/polychrome/"
          target="_blank"
          className="blog-link blog-fancy"
        >
          Polychrome
        </a>
        , a custom color palette generator built entirely from scratch over a
        period of three months. I utilized TypeScript and PostCSS, ensuring that
        the app was performant and maintainable.
      </P>
      <P>
        One of the unique features of Polychrome is its extensive use of many
        color algorithms to generate custom palettes. I developed each algorithm
        myself, leveraging my extensive knowledge of color theory and
        programming skills to create an effective tool for designers.
      </P>
      <P>
        I also designed Polychrome's UI from scratch in Figma, and created all
        of the icons as scalable vector graphics. The app also includes drag and
        drop functionality with swatches, which enhances the user experience and
        makes it more intuitive to use.
      </P>
      <P>
        Overall, Polychrome showcases my skills in design, programming, and my
        deep understanding of color theory. I'm proud of this project and the
        effort that went into creating it from scratch, and I believe it
        demonstrates my ability to create high-quality projects that solve
        real-world problems.
      </P>
    </>
  );
}

const P = ({ children }: { children: React.ReactNode }) => {
  return <p className="font-body text-black">{children}</p>;
};
