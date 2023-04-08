import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoadScreenProvider } from "./contexts/LoadScreen";
import { DevProvider } from "./contexts/DevContext";
import Background from "./components/Background/Main";

oncontextmenu = (e) => {
  const target = e.target as HTMLElement;
  const a = target.closest("a.link") as HTMLLinkElement;
  if (a) {
    e.preventDefault();
    navigator.clipboard.writeText(a.href);
    alert("Copied link to clipboard!");
  }
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DevProvider>
      <LoadScreenProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoadScreenProvider>
    </DevProvider>
  </React.StrictMode>,
);
