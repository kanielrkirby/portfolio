import { Helmet } from "react-helmet";
import IconBar from "../components/IconBar";
import Tippy from "@tippyjs/react";
import { useDev } from "../contexts/DevContext";
import { Link } from "react-router-dom";

export default function Contact() {
  const { decrement, message } = useDev();

  return (
    <>
      <Helmet>
        <title>Contact</title>
        <meta name="description" content="Kaniel Kirby's 'Contact' page." />
      </Helmet>
      <div className="relative flex flex-col items-center gap-8">
        <Tippy content={message ?? "Image of myself"} hideOnClick={false}>
          <img
            src="/src/assets/image-2.jpg"
            alt="Image of myself"
            className="peer flex h-[20rem] w-[20rem] cursor-pointer items-center justify-center rounded-[5rem] object-cover text-center shadow-lg shadow-[#00000080] transition-all duration-200 hover:scale-[102%] hover:shadow-xl hover:shadow-[#00000080]"
            onClick={decrement}
          />
        </Tippy>
        <div className="peer pointer-events-none absolute z-10 h-[20rem] w-[20rem] rounded-[5rem] bg-black opacity-20 transition-all duration-200 peer-hover:scale-[102%]" />
        <P>
          I am always open to new opportunities and collaborations. If you'd
          like to discuss a project or just chat about web development or
          programming, feel free to contact me through the following channels:
        </P>
        <IconBar className="-mt-4" place="bottom" />
        <P>
          I look forward to connecting with you and working together to create
          amazing web experiences!
        </P>
      </div>
      <div className="w-full p-2">
        <Tippy content="Attributions & Credits">
          <Link to="/credits" className="link fancy w-fit">
            Attributions & Credits
          </Link>
        </Tippy>
      </div>
    </>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 max-w-lg text-center">{children}</p>;
}
