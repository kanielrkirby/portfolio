import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoadScreenProvider } from "./contexts/LoadScreen";
import { DevProvider } from "./contexts/DevContext";
import Background from "./components/Background/Main";
import { ModalProvider } from "./contexts/ModalContext";
import { LocalProvider } from "./contexts/LocalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LocalProvider>
      <DevProvider>
        <LoadScreenProvider>
          <BrowserRouter>
            <ModalProvider>
              <App />
              <Background className="fixed bottom-0 left-0 right-0 top-0 m-auto h-screen w-screen bg-black" />
            </ModalProvider>
          </BrowserRouter>
        </LoadScreenProvider>
      </DevProvider>
    </LocalProvider>
  </React.StrictMode>
);
