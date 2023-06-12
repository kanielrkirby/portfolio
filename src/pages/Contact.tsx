import { Helmet } from "react-helmet";
import IconBar from "../components/IconBar";
import Tippy from "@tippyjs/react";
import useLocal from "../hooks/useLocal";
import { Link } from "react-router-dom";
import useBreakpoint from "../hooks/useBreakpoint";

export default function Contact() {
  const { decrement, message } = useLocal();
  const { isSm } = useBreakpoint();

  return (
    <>
      <Helmet>
        <title>Contact</title>
        <meta name="description" content="Kaniel Kirby's 'Contact' page." />
      </Helmet>
      <div className="relative flex flex-col items-center gap-8">
        <Tippy content={message ?? "Image of myself"} hideOnClick={false}>
          <div
            className={`relative z-0 m-4 flex aspect-square h-fit w-fit cursor-pointer items-center justify-center overflow-hidden ${
              isSm ? "rounded-[1.5rem]" : "rounded-[3rem]"
            } shadow-md shadow-[#00000080] transition-all duration-200 hover:scale-[102%] hover:shadow-xl hover:shadow-[#00000080]`}
            onClick={decrement}
          >
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}/kaniel-kirby-2.jpg`}
              alt="Image of myself"
              className={`peer w-[20rem] max-w-[90vw] cursor-pointer object-cover text-center transition-all duration-200 ${
                isSm ? "rounded-[1.5rem]" : "rounded-[3rem]"
              }`}
            />
            <div
              className={`peer pointer-events-none absolute z-10 aspect-square w-[20rem] max-w-[90vw] bg-black opacity-20 transition-all duration-200 peer-hover:scale-[102%] ${
                isSm ? "rounded-[1.5rem]" : "rounded-[3rem]"
              }`}
            />
          </div>
        </Tippy>
        <p>
          I am always open to new opportunities and collaborations. If you'd
          like to discuss a project or just chat about web development or
          programming, feel free to contact me through the following channels:
        </p>
        <IconBar className="-mt-4" place="bottom" short />
        <p>
          I look forward to connecting with you and working together to create
          amazing web experiences!
        </p>
      </div>
      <div className="flex w-full justify-center p-2">
        <Tippy content="Attributions & Credits">
          <Link to="/credits" className="link fancy">
            Attributions & Credits
          </Link>
        </Tippy>
      </div>
    </>
  );
}
