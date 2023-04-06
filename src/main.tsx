import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoadScreenProvider } from "./contexts/LoadScreen";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadScreenProvider>
        <App />
      </LoadScreenProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
