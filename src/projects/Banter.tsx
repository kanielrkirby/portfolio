export default function Banter() {
  return (
    <>
      <h1 className="mb-4 text-2xl text-black">Banter</h1>
      <P>
        <a
          href="https://piratey7007.github.io/banter/"
          target="_blank"
          className="blog-link blog-fancy"
        >
          Banter
        </a>{" "}
        is a real-time chat application that enables users to create
        customizable profiles, engage in instant messaging, and enjoy a range of
        additional features. Built using React TypeScript and Tailwind, Banter
        offers a interactive chatting experience.
      </P>
      <P>
        In designing Banter, the focus was on creating a user-centric interface
        that is visually appealing and easy to navigate. The design process
        involved developing wireframes and prototypes to establish the layout,
        user flow, and overall look and feel of the application. This approach
        allowed for testing and refining the design before moving on to the
        development phase. I can say this project went much smoother than
        previous projects, as I was able to focus on the design and development
        separately.
      </P>
      <P>
        Banter was built using React TypeScript for robust front-end development
        and Tailwind for streamlined and responsive styling. Challenges arose
        during the development process, as I had to learn about the intricacies
        of TypeScript, Tailwind, and React, and how they interact with each
        other. However, I was able to overcome these challenges by leveraging
        online resources. In addition, I was able to gain valuable insights into
        the development of real-time communication platforms, which will serve
        as a solid foundation for future projects.
      </P>
    </>
  );
}

const P = ({ children }: { children: React.ReactNode }) => {
  return <p className="font-body text-black">{children}</p>;
};
