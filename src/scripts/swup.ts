import { closeModal } from "@/scripts/modal";

const listener = () =>
  window.swup.hooks.before("page:load", () => closeModal("nav"));

const unsubscribe = () => window.swup.hooks.off("page:load", listener);

document.addEventListener("swup:enable", listener);

document.addEventListener("swup:disable", unsubscribe);
