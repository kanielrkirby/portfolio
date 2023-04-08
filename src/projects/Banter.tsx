export default function Banter({ className }: { className?: string }) {
  return (
    <>
      <h1 className="mb-4 text-2xl text-black">Banter</h1>
      As my first solo project, I created{" "}
      <a
        href="https://piratey7007.github.io/banter/"
        target="_blank"
        className="blog-link blog-fancy"
      >
        Banter
      </a>
      <P>
        Banter is a real-time chat application that enables users to create
        customizable profiles, engage in instant messaging, and enjoy a range of
        additional features. Built using React TypeScript and Tailwind, Banter
        offers a modern and interactive chatting experience.
      </P>
      <P>
        The initial concept behind Banter was to develop a chat application that
        caters to users' needs for real-time communication and personalization.
        The project's primary objectives were to create an intuitive and
        engaging platform and ensure seamless performance across various
        devices. The target user base includes individuals and teams seeking an
        efficient and customizable chatting experience.
      </P>
      <P>
        In designing Banter, the focus was on creating a user-centric interface
        that is visually appealing and easy to navigate. The design process
        involved developing wireframes and prototypes to establish the layout,
        user flow, and overall look and feel of the application. This approach
        allowed for testing and refining the design before moving on to the
        development phase.
      </P>
      <P>
        Banter was built using React TypeScript for robust front-end development
        and Tailwind for streamlined and responsive styling. This combination of
        technologies allowed for rapid development and a highly interactive user
        experience. Challenges encountered during development included
        optimizing real-time communication and ensuring cross-device
        compatibility. These challenges were addressed through thorough testing
        and leveraging best practices in web development.
      </P>
      <P>
        Banter is a modern real-time chat application that offers users a
        customizable and engaging chatting experience. The project showcases the
        power of React TypeScript and Tailwind in creating highly interactive
        and visually appealing web applications. Through this project, valuable
        insights were gained into the development of real-time communication
        platforms, which will serve as a solid foundation for future projects.
      </P>
    </>
  );
}

const P = ({ children }: { children: React.ReactNode }) => {
  return <p className="font-body text-black">{children}</p>;
};
