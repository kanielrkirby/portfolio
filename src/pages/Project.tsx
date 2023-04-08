import { Navigate, useParams } from "react-router-dom";
import Polychrome from "../projects/Polychrome";
import Banter from "../projects/Banter";
import Bazaar from "../projects/Bazaar";
import { Helmet } from "react-helmet";

export default function Project({ className }: { className?: string }) {
  const { id } = useParams();
  if (!id) return <Navigate to="/404" replace />;
  const title = id
    .split("")
    .map((char, i) => (i === 0 ? char.toUpperCase() : char))
    .join("");
  return (
    <div className="flex h-full min-h-fit w-full justify-center p-4">
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content={`Tells about the process that went into creating the project '${title}'.`}
        />
      </Helmet>
      <div className="flex h-full min-h-fit w-full max-w-[85ch] rounded-md bg-white px-24 py-16 text-lg text-black selection:bg-red-300">
        {(() => {
          switch (id) {
            case "polychrome":
              return <Polychrome className={className} />;
            case "banter":
              return <Banter className={className} />;
            case "bazaar":
              return <Bazaar className={className} />;
            default:
              <Navigate to="/404" replace />;
          }
        })()}
      </div>
    </div>
  );
}
