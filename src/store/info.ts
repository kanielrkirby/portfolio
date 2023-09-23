import { atom } from "nanostores";

export const $info = atom({
  title: "",
  content: "",
});

const open = (title: string, content: string) => {
  $info.set({ title, content });
};

for (const c of document.querySelectorAll(".info-container")) {
  c.querySelector(".info-modal-btn")?.addEventListener("click", () =>
    open(
      (c.querySelector(".info-modal-title") as HTMLElement).innerText,
      (c.querySelector(".info-modal-content") as HTMLElement).innerText
    )
  );
}
