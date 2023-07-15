let f = (e) => e?.style?.setProperty("--tt-content", `"${e.innerText}"`);

const o = new MutationObserver(([e]) => f(e.target));

const o2 = new MutationObserver((mutations) => {
  for (const e of document.querySelectorAll(".tt-mirror")) {
    if (e?.style?.getPropertyValue("--tt-content") === `"${e.innerText}"`)
      continue;
    f(e);
    o.observe(e, {
      childList: true,
    });
  }
});

o2.observe(document.body, {
  subtree: true,
  childList: true,
});

for (const e of document?.querySelectorAll(".tt-mirror")) {
  f(e);
  o.observe(e, {
    childList: true,
  });
}
