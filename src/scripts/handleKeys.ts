import { palette, router } from "./main";
import { session } from "./utils";

const nav = document.querySelector(".main-nav") as HTMLElement;
export default function handleKeys() {
  onkeydown = (e) => {
    if (document.querySelector(".confirmation-screen")) {
      if (e.key === "Escape") {
        document.querySelector(".confirmation-screen")?.remove();
      }
      return;
    }
    if (e.metaKey || e.ctrlKey) {
      const { base } = router.deconstructURL(location.pathname);
      if (e.key === "z" || e.key === "Z") {
        if (base === "palettes") {
          if (e.shiftKey) session.palettes.redo();
          else session.palettes.undo();
          return;
        } else {
          if (e.shiftKey) session.create.redo();
          else session.create.undo();
          return;
        }
      }
    }
    const number = parseInt(e.key);
    if (number >= 0 && number <= 9) {
      const { base } = router.deconstructURL(location.pathname);
      if (base === "create") {
        e.preventDefault();
        const slot =
          palette.slots[number - 1] || palette.slots[palette.slots.length - 1];
        const swatch = document.getElementById(slot.id) as HTMLElement;
        session.create.push({
          undo() {
            const slot =
              palette.slots[number - 1] ||
              palette.slots[palette.slots.length - 1];
            const swatch = document.getElementById(slot.id) as HTMLElement;
            slot.isLocked = !slot.isLocked;
            (swatch.querySelector(".lock") as HTMLElement).classList.toggle("locked");
          },
          redo() {
            const slot =
              palette.slots[number - 1] ||
              palette.slots[palette.slots.length - 1];
            const swatch = document.getElementById(slot.id) as HTMLElement;
            slot.isLocked = !slot.isLocked;
            (swatch.querySelector(".lock") as HTMLElement).classList.toggle("locked");
          },
        });
        slot.isLocked = !slot.isLocked;
        (swatch.querySelector(".lock") as HTMLElement).classList.toggle("locked");
        return;
      }
    }
    if (e.key === " ") {
      //* Space Generate
      const { base } = router.deconstructURL(location.pathname);
      if (base === "create") {
        e.preventDefault();
        const prevIds: string[] = [];
        for (const { hex } of palette.slots) prevIds.push(hex);
        palette.generate();
        const ids: string[] = [];
        for (const { hex } of palette.slots) ids.push(hex);
        history.replaceState("", "", `/polychrome/create/${ids.join("-")}`);
        session.create.push({
          undo: () => {
            palette.generate(prevIds);
            history.replaceState(
              "",
              "",
              `/polychrome/create/${prevIds.join("-")}`
            );
            palette.plus.hide();
          },
          redo: () => {
            palette.generate(ids);
            history.replaceState("", "", `/polychrome/create/${ids.join("-")}`);
          },
        });
      }
      return;
    }
    if (e.key === "Escape") {
      nav.classList.remove("visible");
      document.querySelector(".overlay")?.remove();
      document.querySelector(".clear-overlay")?.remove();
      document.querySelector(".popover")?.remove();
      return;
    }
    //! NOT DONE
    if (e.key === "Enter") {
      const a: HTMLElement = document.activeElement as HTMLElement;
      console.log(a);
      return;
    }
    if (e.key === "/") {
      //! DEBUG
    }
  };
}
