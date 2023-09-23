import MicroModal from "micromodal";
MicroModal.init();
export function initModal(btnClasses: string | string[], modalId: string) {
  if (typeof btnClasses === "string") btnClasses = [btnClasses];
  for (let btnClass of btnClasses) {
    if (!btnClass.startsWith(".")) btnClass = "." + btnClass;
    for (const item of document.querySelectorAll(btnClass)) {
      item?.addEventListener("click", () => MicroModal.show(modalId));
    }
  }
  document.querySelector(modalId)?.classList.remove("hidden")
  document.querySelector(modalId)?.classList.add("flex")
}

export function closeModal(name: string) {
  MicroModal.close(`${name}-modal`);
}
