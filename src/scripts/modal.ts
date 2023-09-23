import MicroModal from "micromodal";
MicroModal.init();
export function initModal(Modal: HTMLElement, btnClasses: string | string[], modalId: string) {
  if (typeof btnClasses === "string") btnClasses = [btnClasses];
  for (let btnClass of btnClasses) {
    if (!btnClass.startsWith(".")) btnClass = "." + btnClass;
    for (const item of document.querySelectorAll(btnClass)) {
      item?.addEventListener("click", () => MicroModal.show(modalId));
    }
  }
  Modal.classList.add("invisible", "hidden");
  setTimeout(() => {
    Modal.classList.remove("hidden", "invisible");
  }, 1000);

}

export function closeModal(name: string) {
  MicroModal.close(`${name}-modal`);
}
