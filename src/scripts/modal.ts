import MicroModal from "micromodal";

MicroModal.init();

export function initModal(btnIds: string | string[], modalId: string) {
  if (typeof btnIds === "string") btnIds = [btnIds];
  for (let btnId of btnIds) {
    if (!btnId.startsWith("#")) btnId = "#" + btnId;
    document
      .querySelector(btnId)
      ?.addEventListener("click", () => MicroModal.show(modalId));
  }
}
