import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoadScreenProvider } from "./contexts/LoadScreen";
import Background from "./components/Background/Main";
import { ModalProvider } from "./contexts/ModalContext";
import { LocalProvider } from "./contexts/LocalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LocalProvider>
      <LoadScreenProvider>
        <BrowserRouter>
          <ModalProvider>
            <App />
          </ModalProvider>
        </BrowserRouter>
      </LoadScreenProvider>
    </LocalProvider>
  </React.StrictMode>
);
