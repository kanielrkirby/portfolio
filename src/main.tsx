import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoadScreenProvider } from "./contexts/LoadScreen";
import { DevProvider } from "./contexts/DevContext";

// wrap all selected text in a span anytime the user selects text
document.addEventListener("selectionchange", handleSelection, { once: true });

function handleSelection() {
  for (const span of document.querySelectorAll(".selected-text")) {
    span.replaceWith(...span.childNodes);
  }
  const selection = document.getSelection();
  if (selection?.rangeCount) {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.className = "selected-text";
    range.surroundContents(span);
  }
  document.addEventListener("selectionchange", handleSelection, { once: true });
}

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
