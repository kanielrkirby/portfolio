import { useEffect } from "react";
import Background from "./components/Background/Main";

export default function App() {
  useEffect(() => {}, []);
  return <div className="App">{<Background />}</div>;
}
