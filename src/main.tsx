import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoadScreenProvider } from "./contexts/LoadScreen";
import { DevProvider } from "./contexts/DevContext";

const html = document.documentElement;

onmouseup = () => {
  html.classList.add("user-is-interacting");
};

onmousedown = () => {
  html.classList.remove("user-is-interacting");
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
