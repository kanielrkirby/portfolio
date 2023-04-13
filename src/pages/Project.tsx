import { Navigate, useParams } from "react-router-dom";
import Polychrome from "../projects/Polychrome";
import Banter from "../projects/Banter";
import Bazaar from "../projects/Bazaar";
import { Helmet } from "react-helmet";

export default function Project() {
  const { id } = useParams();
  if (!id) return <Navigate to="/404" replace />;
  const title = id
    .split("")
    .map((char, i) => (i === 0 ? char.toUpperCase() : char))
    .join("");
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content={`Tells about the process that went into creating the project '${title}'.`}
        />
      </Helmet>
      <div className="m-4 flex h-fit w-full max-w-[85ch] flex-col items-center gap-6 rounded-md bg-white px-24 py-16 text-lg text-black selection:bg-red-300">
        {getProject(id)}
      </div>
    </>
  );
}

function getProject(id: string) {
  switch (id) {
    case "polychrome":
      return <Polychrome />;
    case "banter":
      return <Banter />;
    case "bazaar":
      return <Bazaar />;
    default:
      return <Navigate to="/404" replace />;
  }
}
