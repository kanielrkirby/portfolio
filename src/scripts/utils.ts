import { testSize } from "./main";

function deconstructHex(hex: string) {
  const r = parseInt(hex[0] + hex[1], 16) / 255
  const g = parseInt(hex[2] + hex[3], 16) / 255
  const b = parseInt(hex[4] + hex[5], 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h
  let s
  const lum = r * 0.299 + g * 0.587 + b * 0.114
  const l = (max + min) / 2; if (max === min) h = s = 0;
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h = h * 60;
  }
  return { r, g, b, h, s, l, lum };
}

const local = {
  get info(): { firstVisit: boolean } {
    const storageItem = localStorage.getItem("info");
    if (storageItem) {
      return JSON.parse(storageItem);
    } else {
      localStorage.setItem(
        "info",
        JSON.stringify({
          firstVisit: true,
        }),
      );
      return this.info;
    }
  },
  set info(changes) {
    const items = this.info;
    if (changes)
      for (const [key, value] of Object.entries(changes) as [keyof typeof changes, boolean][]) {
        items[key] = value;
      }
    localStorage.setItem("info", JSON.stringify(items));
  },
  get settings(): { algorithm: number; cookies: number, account: string } {
    const storageItem = localStorage.getItem("settings");
    if (storageItem) {
      return JSON.parse(storageItem);
    } else {
      localStorage.setItem(
        "settings",
        JSON.stringify({
          algorithm: 2,
          cookies: 0,
          account: "",
        }),
      );
      return this.settings;
    }
  },
  set settings(changes) {
    const items = this.settings;
    if (changes)
      for (const [key, value] of Object.entries(changes) as [keyof typeof changes, number][]) {
        items[key] = value;
      }
    localStorage.setItem("settings", JSON.stringify(items));
  },
  savedPalettes: {
    get items() {
      const localString = localStorage.getItem("saved-palettes");
      let storageItems;
      if (localString) {
        const array = [];
        storageItems = JSON.parse(localString);
        for (const item of storageItems) array.push(item);
        return array;
      } else return [];
    },
    set items(palettes: string[][]) {
      localStorage.setItem("saved-palettes", JSON.stringify(palettes));
    },
    addItem(item: string[]) {
      const array = this.items;
      array.push(item);
      this.items = array;
    },
    removeItem(index: number) {
      this.items.splice(index, 1);
    },
  },
};

const session = {
  create: {
    cmds: <{ undo: () => void; redo: () => void }[]>[],
    cmdIndex: -1,
    push(cmd: { undo: () => void; redo: () => void }) {
      this.cmds.splice(this.cmdIndex + 1, Infinity, cmd);
      this.cmdIndex = this.cmds.length - 1;
    },
    undo() {
      if (this.cmdIndex > -1) {
        this.cmds[this.cmdIndex].undo();
        this.cmdIndex--;
      }
    },
    redo() {
      if (this.cmdIndex < this.cmds.length - 1) {
        this.cmdIndex++;
        this.cmds[this.cmdIndex].redo();
      }
    },
  },
  palettes: {
    cmds: <{ undo: () => void; redo: () => void }[]>[],
    cmdIndex: -1,
    push(cmd: { undo: () => void; redo: () => void }) {
      this.cmds.splice(this.cmdIndex + 1, Infinity, cmd);
      this.cmdIndex = this.cmds.length - 1;
    },
    undo() {
      if (this.cmdIndex > -1) {
        const cmd = this.cmds[this.cmdIndex];
        this.cmdIndex--;
        cmd.undo();
      }
    },
    redo() {
      if (this.cmdIndex < this.cmds.length - 1) {
        this.cmdIndex++;
        const cmd = this.cmds[this.cmdIndex];
        cmd.redo();
      }
    },
  },
};

const random = (min: number, max: number) => Math.random() * (max - min) + min;

function toolTip(
  message: string,
  options?: { pos?: [x: number, y: number]; duration?: number },
) {
  const tip = document.createElement("div");
  tip.classList.add("tooltip", "appearing");
  const text = document.createElement("h2");
  text.innerHTML = message;
  tip.append(text);
  if (
    options?.pos &&
    !(
      navigator.userAgent.includes("Android") ||
      navigator.userAgent.includes("like Mac")
    )
  ) {
    tip.style.left = `${options.pos[0]}px`;
    tip.style.top = `${options.pos[1]}px`;
    setTimeout(() => {
      if (options.pos && tip.clientWidth + options.pos[0] > document.body.clientWidth) {
        tip.style.translate = "-100%";
        if (tip.clientHeight + options.pos[1] > document.body.clientHeight)
          tip.style.translate = "-100 -100%";
      } else if (
        options.pos && tip.clientHeight + options.pos[1] > document.body.clientHeight
      )
        tip.style.translate = "0 -100%";
    }, 0);
  } else tip.classList.add("centered");
  tip.addEventListener(
    "animationend",
    () => {
      tip.classList.remove("appearing");
      setTimeout(() => {
        tip.classList.add("disappearing");
        tip.addEventListener(
          "animationend",
          () => {
            tip.remove();
          },
          { once: true },
        );
      }, options?.duration || 1000);
    },
    { once: true },
  );
  return tip;
}

let cancelClick = false;

function popOver(
  choices: {
    message: string;
    call?: () => void;
    classes?: string[];
    attributes?: string[][];
  }[],
  options?: { type?: string },
) {
  const div = document.createElement("div");
  div.classList.add("popover");
  const obs = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry.isIntersecting && entry.intersectionRatio < 1)
        div.style.translate = "0 -100%";
    },
    { root: document, threshold: 1 },
  );
  setTimeout(() => {
    obs.observe(div);
  }, 10);
  if (options?.type === "tool-menu") div.classList.add("bottom");
  const overlay = document.createElement("div");
  overlay.classList.add("clear-overlay");
  document.body.append(overlay);
  const list = document.createElement("ul");
  list.classList.add("list");
  const remove = () => {
    overlay.remove();
    div.remove();
  };
  overlay.onclick = overlay.ontouchend = () => {
    if (cancelClick) return;
    cancelClick = true;
    setTimeout(() => {
      cancelClick = false;
    }, 75);
    remove();
  };
  if (choices)
    for (const { message, classes, attributes, call } of choices) {
      const item = document.createElement("div");
      item.classList.add("choice");
      item.innerHTML = message;
      if (classes) for (const className of classes) item.classList.add(className);
      if (attributes)
        for (const attribute of attributes)
          item.setAttribute(attribute[0], attribute[1]);
      list.append(item);
      div.append(list);
      setTimeout(() => {
        item.onclick = item.ontouchend = () => {
          if (cancelClick) return;
          cancelClick = true;
          setTimeout(() => {
            cancelClick = false;
          }, 75);
          if (call) call();
          remove();
        };
      }, 25);
    }
  return div;
}

function confirmation(
  message: string,
  options?: {
    settings?: {
      message: string;
      value: string;
      choices: { message: string; value?: string | number }[];
      href?: string;
    }[];
    confirmation?: {
      value?: string;
      confirm: { message: string; call?: () => void };
      cancel: { message: string; call?: () => void };
    };
    choices?: { message: string; value: string; call?: () => void }[];
    type?: string;
    class?: string;
  },
) {
  const div = document.createElement("div");
  div.classList.add("confirmation-screen");
  if (options?.class) div.classList.add(options.class);
  const h2 = document.createElement("h2");
  h2.innerHTML = message;
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  const remove = () => {
    (document.querySelector(".main-nav") as HTMLElement).classList.remove("visible");
    div.remove();
    document.querySelector(".overlay")?.remove();
    setTimeout(testSize, 50);
  };
  overlay.onclick = overlay.ontouchend = remove;
  const box = document.createElement("div");
  box.classList.add("box");
  box.append(h2);
  div.append(box, overlay);
  function confirmationElem() {
    if (options?.confirmation?.value)
      div.classList.add(options.confirmation.value);
    const confirmationElement = document.createElement("ul");
    const confirm = document.createElement("li");
    confirm.classList.add("yes");
    confirm.innerHTML = options?.confirmation?.confirm.message || "Confirm";
    const cancel = document.createElement("li");
    cancel.classList.add("no");
    cancel.innerHTML = options?.confirmation?.cancel.message || "Cancel";
    const call = () => {
      if (options?.confirmation?.confirm.call)
        options.confirmation.confirm.call();
      remove();
    };
    const call2 = () => {
      if (options?.confirmation?.cancel.call)
        options.confirmation.cancel.call();
      remove();
    };
    confirm.onclick = confirm.ontouchend = call;
    cancel.onclick = cancel.ontouchend = call2;
    confirmationElement.append(cancel, confirm);
    return confirmationElement;
  }
  if (options?.type === "input") {
    const field = document.createElement("textarea");
    box.append(field);
  }
  if (options) {
    if (options.settings) {
      const settings = document.createElement("ul");
      settings.classList.add("options");
      for (const { message, value, choices } of options.settings) {
        const settingElement = document.createElement("li");
        const settingHeading = document.createElement("label");
        settingHeading.innerText = message;
        let settingChoices: HTMLSelectElement | HTMLButtonElement | HTMLAnchorElement;
        if (choices?.length === 1) {
          settingChoices = document.createElement("a") as HTMLAnchorElement;
          settingChoices.href = (choices as { message: string; value: string; href: string }[])[0].href;
          settingChoices.classList.add("button");
          settingChoices.innerText = (choices as { message: string; value: string }[])[0].message;
          settingChoices.onclick = () => (choices as [{ message: string; value: string; call: () => void }])[0].call();
        } else {
          settingChoices = document.createElement("select");
          settingChoices.id = value;
          let i = 0;
          for (const { message, value } of choices) {
            const choice = document.createElement("option");
            choice.innerText = message;
            choice.id = (typeof value === "number" ? value : i).toString();
            i++;
            settingChoices.append(choice);
          }
        }
        settingChoices.selectedIndex = local.settings[value as keyof typeof local.settings];
        settingElement.append(settingHeading, settingChoices);
        settings.append(settingElement);
      }
      box.append(settings);
    }
  }
  box.append(confirmationElem());
  document.body.append(div);
}

export {
  local,
  session,
  random,
  deconstructHex,
  toolTip,
  popOver,
  confirmation,
};
