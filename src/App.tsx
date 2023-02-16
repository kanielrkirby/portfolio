import { useEffect } from "react";
import Background from "./components/Background";
import Inspo from "./components/Inspo";

export default function App() {
  useEffect(() => {
    if (!document.querySelector("#canvas")) Inspo();
  }, []);
  return (
    <div className="App">
      <Background />
    </div>
  );
}
