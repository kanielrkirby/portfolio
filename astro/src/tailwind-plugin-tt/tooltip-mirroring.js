const prefix = document.currentScript.getAttribute("data-class") ?? "tt";

let f = (e) => e?.style?.setProperty(`--${prefix}-content`, `"${e.innerText}"`);

const o = new MutationObserver(([e]) => f(e.target));

const o2 = new MutationObserver((mutations) => {
  for (const e of document.querySelectorAll(`.${prefix}-mirror`)) {
    if (
      e?.style?.getPropertyValue(`--${prefix}-content`) === `"${e.innerText}"`
    )
      continue;
    f(e);
    o.observe(e, {
      childList: true,
    });
  }
});

o2.observe(document, {
  subtree: true,
  childList: true,
});

for (const e of document?.querySelectorAll(`.${prefix}-mirror`)) {
  f(e);
  o.observe(e, {
    childList: true,
  });
}
