const prefix = document.documentElement.getAttribute("data-class") ?? "tt";

const setContent = (element: HTMLElement) =>
  element?.style?.setProperty(`--${prefix}-content`, `"${element.innerText}"`);

const setA11y = (element: HTMLElement) => {
  element.addEventListener("keydown", (e) => {
    if (e.key === "Escape") element.blur();
    if (e.key === "Enter") {
      e.preventDefault();
      element.blur();
    }
  });
  element.addEventListener("mousedown", (e) => {
    e.preventDefault();
    element.blur();
  });
  element.addEventListener("touchstart", (e) => {
    e.preventDefault();
    element.blur();
  });
};

const documentObserver = new MutationObserver((mutations) => {
  for (const node of document.querySelectorAll(`.${prefix}-mirror`)) {
    if (
      !(node instanceof HTMLElement) ||
      node?.style?.getPropertyValue(`--${prefix}-content`) ===
        `"${node.innerText}"`
    )
      continue;
    setContent(node);
    setA11y(node);
    elementObserver.observe(node, {
      childList: true,
    });
  }
});

const elementObserver = new MutationObserver(
  ([node]) => node.target instanceof HTMLElement && setContent(node.target)
);

documentObserver.observe(document, {
  subtree: true,
  childList: true,
});

for (const node of document?.querySelectorAll(`.${prefix}-mirror`)) {
  if (!(node instanceof HTMLElement)) continue;
  setContent(node);
  setA11y(node);
  elementObserver.observe(node, {
    childList: true,
  });
}
