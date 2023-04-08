import { Link } from "react-router-dom";

export default function Polychrome({ className }: { className?: string }) {
  return (
    <>
      <h1 className="mb-4 text-2xl text-black">Polychrome</h1>
      <P>
        As my first real project, I created{" "}
        <a
          href="https://piratey7007.github.io/polychrome/"
          target="_blank"
          className="blog-link blog-fancy"
        >
          Polychrome
        </a>
        , a custom color palette generator built entirely from scratch over a
        period of three months. I utilized TypeScript and PostCSS.
      </P>
      <P>
        One of the more difficult aspects of working on Polychrome was
        implementing its many color algorithms to generate palettes. I developed
        each algorithm myself, spending a lot of time researching color theory
        to understand how colors interact with each other. I also had to
        implement a way to convert between different color spaces, such as RGB
        and HSL, to ensure that the algorithms would work properly.
      </P>
      <P>
        As for Polychrome's UI, it was created using Figma. All of the icons are
        scalable vector graphics (SVGs) which I worked on myself, including the
        logo. The landing page was designed to be simple and clean, with a
        minimal amount of text and a large button to get started. The app itself
        is designed to be intuitive and easy to use, with a simple color wheel
        and a "Generate" button to generate a palette. The most difficult part
        of the design, by far, was making the website responsive for mobile
        devices. I had to make sure that the app would work on a variety of
        screen sizes, and would still be easy to use on a small screen.
      </P>
      <P>
        The app includes drag and drop functionality for each swatch to make it
        more intuitive to use, a copy/paste feature to easily copy palettes and
        colors, a save feature to save palettes to local storage, color-locking
        to prevent a color from being changed, and a custom-made modal
        component. I learned a lot about the underlying methods used to create
        these features, and I'm proud of how they turned out.
      </P>
    </>
  );
}

const P = ({ children }: { children: React.ReactNode }) => {
  return <p className="font-body text-black">{children}</p>;
};
