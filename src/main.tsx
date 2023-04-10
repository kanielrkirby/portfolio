import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoadScreenProvider } from "./contexts/LoadScreen";
import { DevProvider } from "./contexts/DevContext";
import Background from "./components/Background/Main";
import { ModalProvider } from "./contexts/ModalContext";

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
          <ModalProvider>
            <App />
            <Background className="fixed top-0 left-0 right-0 bottom-0 m-auto h-screen w-screen bg-black" />
          </ModalProvider>
        </BrowserRouter>
      </LoadScreenProvider>
    </DevProvider>
  </React.StrictMode>,
);
