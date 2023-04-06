import { useNavigate, useParams } from "react-router-dom";
import Polychrome from "../projects/Polychrome";
import Banter from "../projects/Banter";
import Bazaar from "../projects/Bazaar";

export default function Project({ className }: { className?: string }) {
  const { id } = useParams();
  const navigate = useNavigate();
  if (id === "polychrome") return <Polychrome className={className} />;
  if (id === "banter") return <Banter className={className} />;
  if (id === "bazaar") return <Bazaar className={className} />;
  navigate("/404", { replace: true });
  return null;
}
