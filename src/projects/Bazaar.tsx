export default function Bazaar() {
  return (
    <>
      <h1 className="mb-4 text-2xl text-black">Bazaar</h1>
      <P>
        <a
          href="https://piratey7007.github.io/banter/"
          target="_blank"
          className="blog-link blog-fancy"
        >
          Bazaar
        </a>{" "}
        is a comprehensive online marketplace that provides users with the
        ability to create accounts, post products, search for items based on
        filters, add items to their cart, and complete a simulated checkout
        process. In addition, users can review their previous orders and manage
        their profile and payment information. The platform was developed using
        a range of technologies, including React TypeScript, Tailwind, and
        NestJS, and leverages various libraries to deliver a seamless and
        efficient development experience.
      </P>
      <P>
        The primary goal behind Bazaar was to create an easy-to-use platform
        that can effectively facilitate the buying and selling of products. This
        included implementing user-friendly features such as search filters,
        easy checkout, and a straightforward posting process for sellers.
      </P>
      <P>
        In terms of design, I leveraged Figma to create a wireframe for the
        platform. This allowed me to visualize the platform's layout and
        functionality before beginning development. The wireframe was then
        converted into a prototype, which was used to test the platform's
        functionality and ensure that it was easy to use. The prototype was then
        distributed to team members, who were able to provide feedback on the
        platform's design and functionality, as well as start development on
        their assigned components.
      </P>
      <P>
        For team planning and communication, we set up a Notion and Discord
        workspace. This allowed us to keep track of our progress and discuss
        issues and ideas. We also used GitHub to manage our codebase and
        collaborate on the project. These combined technologies allowed us to
        effectively manage our project and focus more on development and
        deployment.
      </P>
      <P>
        Working remotely on this project was challenging for collaboration.
        Notion helped us keep track of tasks and deadlines. However, learning
        the value of separation of concerns proved crucial to completing the
        project on time and ensuring team members were able to focus on their
        assigned tasks.
      </P>
      <P>
        Overall, I learned a lot about backend development and the importance of
        planning and communication. I will use this experience to improve my
        team management skills and communication in the future, as well as
        continue to develop my skills in backend and frontend development.
      </P>
    </>
  );
}

const P = ({ children }: { children: React.ReactNode }) => {
  return <p className="font-body text-black">{children}</p>;
};
