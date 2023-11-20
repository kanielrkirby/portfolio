import { router, palette, palettes } from "./main";
import { session, toolTip, popOver, local, confirmation } from "./utils";
import { signInWithEmail, } from "./auth"
import { Slot } from "./palette";
export default function handleClicks() {
  // Magic Link Form Page
  const magicLinkForm = document.querySelector(
    ".magic-form",
  ) as HTMLElement;
  const magicLinkFormInput = magicLinkForm.querySelector(
    "input",
  ) as HTMLInputElement;
  const magicLinkFormButton = magicLinkForm.querySelector(
    "button",
  ) as HTMLButtonElement;
  magicLinkForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = magicLinkFormInput.value;
    if (email) {
      magicLinkFormButton.disabled = true;
    }
    await signInWithEmail(email);
    magicLinkFormButton.disabled = false;
  };

  // Create Page Palette
  let cancelClick = false;
  const pal = document.querySelector("#palette") as HTMLElement;
  pal.onclick = pal.ontouchend = paletteClick;
  async function paletteClick(e: MouseEvent | TouchEvent) {
    if (cancelClick) return;
    cancelClick = true;
    setTimeout(() => {
      cancelClick = false;
    }, 75);

    const target = e.target as HTMLElement;
    // Add Button
    const add = target.closest(".plus-container svg");
    if (add) {
      // Gets the data index of the add symbol and adds the slot hex to the URL
      const { ids } = router.deconstructURL(location.pathname) as { ids: string[] }
      const addIndex = parseInt(add.getAttribute("data-color-index") as string);
      const slot = palette.addSlot({ index: addIndex + 1 });
      ids.splice(addIndex + 1, 0, slot.hex);
      history.replaceState("", "", `/polychrome/create/${ids.join("-")}`);
      palette.plus.hide();
      session.create.push({
        undo() {
          palette.removeSlot(slot, { animations: false });
          ids.splice(addIndex + 1, 1);
          history.replaceState("", "", `/polychrome/create/${ids.join("-")}`);
          palette.plus.hide();
        },
        redo() {
          palette.addSlot(slot, { animations: false });
          ids.splice(addIndex + 1, 0, slot.hex);
          history.replaceState("", "", `/polychrome/create/${ids.join("-")}`);
          palette.plus.hide();
        },
      });
      if (palette.slots.length > 9) palette.plus.hide();
      return;
    }

    // Lock Button
    const lock = target.closest(".lock") as HTMLElement;
    if (lock) {
      const swatch = target.closest(".swatch") as HTMLElement;
      const index = parseInt(swatch.getAttribute("data-color-index") as string);
      const slot = palette.slots[index];
      slot.isLocked = !slot.isLocked;
      lock.classList.toggle("locked");
      session.create.push({
        undo() {
          const slot = palette.slots[index];
          const swatch = document.getElementById(slot.id) as HTMLElement;
          slot.isLocked = !slot.isLocked;
          (swatch.querySelector(".lock") as HTMLElement).classList.toggle("locked");
        },
        redo() {
          const slot = palette.slots[index];
          const swatch = document.getElementById(slot.id) as HTMLElement;
          slot.isLocked = !slot.isLocked;
          (swatch.querySelector(".lock") as HTMLElement).classList.toggle("locked");
        },
      });
      return;
    }

    // X Button
    if (target.closest(".x")) {
      const swatch = target.closest(".swatch") as HTMLElement;
      const slot =
        palette.slots[parseInt(swatch.getAttribute("data-color-index") as string)];
      const { ids } = router.deconstructURL(location.pathname) as { ids: string[] }
      palette.removeSlot(slot);
      ids.splice(slot.data, 1);
      history.replaceState("", "", ids.join("-"));
      palette.plus.hide();
      session.create.push({
        undo() {
          palette.addSlot(slot, { animations: false });
          ids.splice(slot.data, 0, slot.hex);
          history.replaceState("", "", ids.join("-"));
          palette.plus.hide();
        },
        redo() {
          palette.removeSlot(slot, { animations: false });
          ids.splice(slot.data, 1);
          history.replaceState("", "", ids.join("-"));
          palette.plus.hide();
        },
      });
      return;
    }

    // Copy Button
    if (target.closest(".info")) {
      cancelClick = true;
      setTimeout(() => {
        cancelClick = false;
      }, 75);
      const swatch = target.closest(".swatch") as HTMLElement;
      const slot =
        palette.slots[parseInt(swatch.getAttribute("data-color-index") as string)];
      if (target.closest(".icon")) {
        await navigator.clipboard.writeText(slot.hex).then(
          () => {
            const tip = toolTip("Copied hex to clipboard!", {
              pos: [
                (e as MouseEvent).x ||
                  (e as TouchEvent).changedTouches[
                    (e as TouchEvent).changedTouches.length - 1
                  ].pageX,
                (e as MouseEvent).y ||
                  (e as TouchEvent).changedTouches[
                    (e as TouchEvent).changedTouches.length - 1
                  ].pageY,
              ],
            });
            tip.classList.add("at-mouse-pos");
            document.body.append(tip);
          },
          () => {
            const tip = toolTip("Copy to clipboard failed.", {
              pos: [
                (e as MouseEvent).x ||
                  (e as TouchEvent).changedTouches[
                    (e as TouchEvent).changedTouches.length - 1
                  ].pageX,
                (e as MouseEvent).y ||
                  (e as TouchEvent).changedTouches[
                    (e as TouchEvent).changedTouches.length - 1
                  ].pageY,
              ],
            });
            tip.classList.add("at-mouse-pos");
            document.body.append(tip);
          },
        );
        return;
      }
    }
  }

  // Palettes Page Palette Container
  const pals = document.querySelector(".saved-palettes-wrapper") as HTMLElement;
  pals.ontouchend = pals.onclick = palettesClick;
  async function palettesClick(e: MouseEvent | TouchEvent) {
    if (cancelClick) return;
    cancelClick = true;
    setTimeout(() => {
      cancelClick = false;
    }, 75);

    const target = e.target as HTMLElement;
    // Copy Swatch
    const swatch = target.closest(".swatch") as HTMLElement;
    if (swatch) {
      const pal = (swatch.parentElement as HTMLElement).parentElement as HTMLElement;
      await navigator.clipboard
        .writeText(
          palettes.items[parseInt(pal.getAttribute("data-palette-index") as string)][
            parseInt(swatch.getAttribute("data-color-index") as string)
          ],
        )
        .then(
          () =>
            document.body.append(
              toolTip("Copied hex to clipboard!", {
                pos: [
                  (e as MouseEvent).x ||
                    (e as TouchEvent).changedTouches[
                      (e as TouchEvent).changedTouches.length - 1
                    ].pageX,
                  (e as MouseEvent).y ||
                    (e as TouchEvent).changedTouches[
                      (e as TouchEvent).changedTouches.length - 1
                    ].pageY,
                ],
              }),
            ),
          () =>
            document.body.append(
              toolTip("Copy to clipboard failed.", {
                pos: [
                  (e as MouseEvent).x ||
                    (e as TouchEvent).changedTouches[
                      (e as TouchEvent).changedTouches.length - 1
                    ].pageX,
                  (e as MouseEvent).y ||
                    (e as TouchEvent).changedTouches[
                      (e as TouchEvent).changedTouches.length - 1
                    ].pageY,
                ],
              }),
            ),
        );
      return;
    }

    // More Button
    const more = target.closest(".more") as HTMLElement;
    if (more) {
      cancelClick = true;
      setTimeout(() => {
        cancelClick = false;
      }, 75);
      (more.parentElement as HTMLElement).append(
        popOver(
          [
            {
              message: "Open",
              call() {
                router.navigateTo(
                  `/create/${
                    local.savedPalettes.items[
                      parseInt(
                        (target
                          .closest(".palette-container") as HTMLElement)
                          .getAttribute("data-palette-index") as string,
                      )
                    ].join("-")}`,
                );
              },
            },
            {
              message: "Copy",
              async call() {
                await navigator.clipboard
                  .writeText(
                    palettes.items[
                      parseInt(
                        (target
                          .closest(".palette-container") as HTMLElement)
                          .getAttribute("data-palette-index") as string,
                      )
                    ].join("\n"),
                  )
                  .then(
                    () =>
                      document.body.append(
                        toolTip("Copied hex to clipboard!", {
                          pos: [
                            (e as MouseEvent).x ||
                              (e as TouchEvent).changedTouches[
                                (e as TouchEvent).changedTouches.length - 1
                              ].pageX,
                            (e as MouseEvent).y ||
                              (e as TouchEvent).changedTouches[
                                (e as TouchEvent).changedTouches.length - 1
                              ].pageY,
                          ],
                        }),
                      ),
                    () =>
                      document.body.append(
                        toolTip("Copy to clipboard failed.", {
                          pos: [
                            (e as MouseEvent).x ||
                              (e as TouchEvent).changedTouches[
                                (e as TouchEvent).changedTouches.length - 1
                              ].pageX,
                            (e as MouseEvent).y ||
                              (e as TouchEvent).changedTouches[
                                (e as TouchEvent).changedTouches.length - 1
                              ].pageY,
                          ],
                        }),
                      ),
                  );
              },
            },
            {
              message: "Remove",
              call() {
                const index = parseInt(
                  (target
                    .closest(".palette-container") as HTMLElement)
                    .getAttribute("data-palette-index") as string,
                );
                const item = palettes.items[index];
                session.palettes.push({
                  undo() {
                    palettes.addItem(item, index);
                  },
                  redo() {
                    palettes.removeItem(index);
                  },
                });
                palettes.removeItem(index);
                document.body.append(toolTip("Removed palette."));
              },
            },
          ],
          { type: "menu" },
        ),
      );
      return;
    }
  }

  //* Toolbar
  const tool = document.querySelector(".toolbar") as HTMLElement;
  tool.ontouchend = tool.onclick = toolbarClick;
  async function toolbarClick(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    if (cancelClick) return;
    cancelClick = true;
    setTimeout(() => {
      cancelClick = false;
    }, 75);

    const target = e.target as HTMLElement;
    // Undo Button
    if (target.closest(".undo")) {
      const url = router.deconstructURL(location.pathname);
      if (url.base === "create") session.create.undo();
      else session.palettes.undo();
      return;
    }

    // Redo Button
    if (target.closest(".redo")) {
      if (router.deconstructURL(location.pathname).base === "create")
        session.create.redo();
      else session.palettes.redo();
      return;
    }

    // Copy Button
    if (target.closest(".copy")) {
      copyButton();
      return;
    }

    // Generate
    if (target.closest(".generate")) {
      const prevIds: string[] = [];
      for (const { hex } of palette.slots) prevIds.push(hex);
      palette.generate();
      const ids: string[] = [];
      for (const { hex } of palette.slots) ids.push(hex);
      history.replaceState("", "", `/polychrome/create/${ids.join("-")}`);
      if (prevIds)
        session.create.push({
          undo: () => {
            palette.generate(prevIds);
            history.replaceState(
              "",
              "",
              `/polychrome/create/${prevIds.join("-")}`,
            );
          },
          redo: () => {
            palette.generate(ids);
            history.replaceState("", "", `/polychrome/create/${ids.join("-")}`);
          },
        });
      return;
    }

    // Save Button
    if (target.closest(".save")) {
      saveButton();
      return;
    }

    // Remove All Button
    if (target.closest(".remove-all")) {
      removeAllButton();
      return;
    }

    // Import Button
    if (target.closest(".import")) {
      importButton();
      return;
    }

    if (target.closest(".more")) {
      moreButton();
      return;
    }
  }

  const mainNav = document.querySelector(".main-nav") as HTMLElement;
  const mainHeader = document.querySelector(".main-header") as HTMLElement;
  //* Misc
  window.ontouchend = window.onclick = globalClick;
  async function globalClick(e: MouseEvent | TouchEvent) {
    if (!cancelClick) {
      cancelClick = true;
      setTimeout(() => {
        cancelClick = false;
      }, 75);

      const target = e.target as HTMLElement;

      // Settings Button
      if (target.closest("#settings")) {
        e.preventDefault();
        confirmation("Settings", {
          confirmation: {
            confirm: {
              message: "Confirm",
              call() {
                if (cancelClick) return;
                cancelClick = true;
                setTimeout(() => {cancelClick = false}, 75);
                const pendingSettings = local.settings;
                let element = (document.querySelector(
                  ".confirmation-screen .box ul.options",
                ) as HTMLElement).firstChild as HTMLElement;
                for (const key of Object.keys(pendingSettings)) {
                  console.log(key);
                  pendingSettings[key as keyof typeof pendingSettings] =
                    (element.querySelector("select") as HTMLSelectElement).selectedIndex;
                  element = element.nextSibling as HTMLElement;
                }
                pendingSettings.algorithm = (
                  document.querySelector(
                    ".confirmation-screen #algorithm",
                  ) as HTMLSelectElement
                ).selectedIndex;
                local.settings = pendingSettings;
                document.body.append(toolTip("Changes saved."));
              },
            },
            cancel: {
              message: "Cancel",
              call() {
                if (cancelClick) return;
                cancelClick = true;
                setTimeout(() => { cancelClick = false }, 75);
                document.body.append(toolTip("Changes discarded."));
              },
            },
          },
          settings: [
            {
              message: "Algorithm",
              value: "algorithm",
              choices: [
                { message: "Random Algorithm" },
                { message: "Monochromatic" },
                { message: "Analogous" },
                { message: "Complementary" },
                { message: "Split Complementary" },
                { message: "Triadic" },
                { message: "Tetradic" },
                { message: "Square" },
                { message: "Randomize" },
              ],
            },
            {
              message: "Cookies",
              value: "cookies",
              choices: [
                { message: "No, thank you", value: 0 },
                { message: `Sure, that's fine`, value: 1 },
              ],
            },
            {
              message: "Login?",
              value: "login",
              choices: [
                { message: "Login", value: "login", href: "/polychrome/magic" },
              ]
            }
          ],
        });
        return;
      }

      // Confirmation Screens
      const confirmationScreen = target.closest(".confirmation-screen");
      if (confirmationScreen) {
        // All overlays
        if (target.closest(".overlay")) {
          if (confirmationScreen === document.querySelector(".cookies")) {
            local.settings.cookies = 0;
            local.info = { firstVisit: true };
          }
          confirmationScreen.remove();
        }

        // Remove All
        if (confirmationScreen.classList.contains("remove-all")) {
          if (target.closest(".yes")) {
            for (let i = 0; palettes.items.length; i++) palettes.removeItem(0);
            confirmationScreen.remove();
            const tip = toolTip("All palettes removed.");
            document.body.append(tip);
          } else if (target.closest(".no")) confirmationScreen.remove();
          return;
        }

        // Are cookies okay?
        if (
          confirmationScreen === document.querySelector(".cookies-confirmation")
        ) {
          const confirm = target.closest(".yes");
          const cancel = target.closest(".no");
          if (confirm) {
            local.settings.cookies = 1;
            confirmationScreen.remove();
            const tip = toolTip("Thanks, enjoy the site! :)");
            document.body.append(tip);
          } else if (cancel) {
            local.settings.cookies = 0;
            confirmationScreen.remove();
            const tip = toolTip(
              "You won't be able to save your palettes. You can change this in settings.",
              {
                duration: 2500,
              },
            );
            document.body.append(tip);
          }
          return;
        }
      }

      // Links
      const a = target.closest("a") as HTMLElement;
      if (a) {
        e.preventDefault();
        const aLink = a.getAttribute("href") as string;
        mainNav.classList.remove("visible");
        document.body.style.overflowY = "";
        document.querySelector(".overlay")?.remove();
        if (aLink !== location.pathname) router.navigateTo(aLink);
        return;
      }

      if (target.closest("#nav-button")) {
        mainNav.classList.add("visible");
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        mainHeader.append(overlay);
        document.body.style.overflowY = "hidden";
        palette.plus.hide();
        overlay.onclick = overlay.ontouchend = () => {
          if (cancelClick) return;
          cancelClick = true;
          setTimeout(() => { cancelClick = false }, 75);
          overlay.remove();
          mainNav.classList.remove("visible");
          document.body.style.overflowY = "";
        };
        return;
      }
    }
  }
}

// Copy Button
async function copyButton() {
  if (router.deconstructURL(location.pathname).base === "create") {
    const colors = [];
    for (const { hex } of palette.slots) colors.push(hex);
    await navigator.clipboard.writeText(colors.join("\n")).then(
      () => {
        const tip = toolTip("Copied palette!");
        document.body.append(tip);
      },
      () => {
        const tip = toolTip("Failed to copy.");
        document.body.append(tip);
      },
    );
  } else {
    const pals = [];
    for (const pal of palettes.items) pals.push(pal.join("-"));
    await navigator.clipboard.writeText(pals.join(",\n")).then(
      () => {
        const tip = toolTip("Copied palettes to clipboard!");
        document.body.append(tip);
      },
      () => {
        const tip = toolTip("Copy to clipboard failed.");
        document.body.append(tip);
      },
    );
  }
  return;
}

// Save Button
function saveButton() {
  if (!local.settings.cookies) {
    document.body.append(
      toolTip("You'll need to enable cookies in settings for that feature."),
    );
    return;
  }
  const array = [];
  for (const { hex } of palette.slots) array.push(hex);
  palettes.addItem(array);
  const tip = toolTip("Saved palette!");
  document.body.append(tip);
  return;
}

function colorAmountButton(amount: number) {
  const { ids } = router.deconstructURL(location.pathname) as { ids: string[] }
  const slots: Slot[] = [];
  for (let i = 0; i < amount; i++) {
    slots.push(palette.addSlot({}));
    ids.push(slots[i].hex);
  }
  history.replaceState("", "", ids.join("-"));
  session.create.push({
    undo() {
      for (let i = 0; i < amount; i++) {
        palette.removeSlot(slots[slots.length - 1 - i], { animations: false });
        ids.pop();
      }
      history.replaceState("", "", ids.join("-"));
    },
    redo() {
      for (let i = 0; i < amount; i++) {
        palette.addSlot(slots[i], { animations: false });
        ids.push(slots[i].hex);
      }
      history.replaceState("", "", ids.join("-"));
    },
  });
  return;
}

function addColorsButton() {
  const array = [
    { message: "1", classes: ["add-color"], call: () => colorAmountButton(1) },
    { message: "2", classes: ["add-color"], call: () => colorAmountButton(2) },
    { message: "3", classes: ["add-color"], call: () => colorAmountButton(3) },
    { message: "4", classes: ["add-color"], call: () => colorAmountButton(4) },
  ];
  for (let i = palette.slots.length + 4; i > 10; i--) array.pop();
  if (array.length < 1) {
    document.body.append(toolTip("Too many colors!"));
    document.querySelector("popover")?.remove();
    return;
  }
  document.body.append(popOver(array, { type: "tool-menu" }));
}

// Remove All Button
function removeAllButton() {
  confirmation(
    "Are you sure you want to delete all of your palettes? You won't be able to undo this.",
    {
      class: "remove-all",
      confirmation: {
        confirm: {
          message: "Yes, delete away.",
          call() {
            for (let i = 0; palettes.items.length; i++) palettes.removeItem(0);
            const tip = toolTip("All palettes removed.");
            document.body.append(tip);
          },
        },
        cancel: {
          message: "No, please don't delete my stuff!",
        },
      },
    },
  );
  return;
}

// Import Button
function importButton() {
  if (router.deconstructURL(location.pathname).base === "create") {
    confirmation("Paste hex code palette below!", {
      class: "create",
      confirmation: {
        confirm: {
          message: "Confirm",
          call() {
            const hexes = router.deconstructURL(location.pathname).ids as string[];
            const input = ((document
              .querySelector(".confirmation-screen") as HTMLElement)
              .querySelector("textarea") as HTMLTextAreaElement)
              .value.trim()
              .replaceAll(" ", "")
              .replaceAll("\n", "")
              .replaceAll("-", "");
            const isValid =
              /[g-z~`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?]/g.test(input) ||
              input.length === 0 ||
              input.length % 6 !== 0
                ? false
                : true;
            let message = "Invalid values entered. Try again.";
            if (isValid) {
              message = "Successfully imported values.";
              const newHexes = input.match(/.{1,6}/g) as string[];
              palette.generate(newHexes);
              session.create.push({
                undo() {
                  palette.generate(hexes);
                },
                redo() {
                  palette.generate(newHexes);
                },
              });
            }
            const tip = toolTip(message);
            document.body.append(tip);
          },
        },
        cancel: {
          message: "Cancel",
        },
      },
      type: "input",
    });
  } else {
    if (!local.settings.cookies) {
      document.body.append(
        toolTip("You'll need to enable cookies in settings for that feature."),
      );
      return;
    }
    confirmation(
      "Paste hex code palette below! Separate palettes with commas.",
      {
        confirmation: {
          confirm: {
            message: "Confirm",
            call() {
              const div = document.querySelector(".confirmation-screen") as HTMLElement;
              const input = (div
                .querySelector("textarea") as HTMLTextAreaElement)
                .value.trim()
                .replaceAll(" ", "")
                .replaceAll("\n", "")
                .replaceAll("-", "")
                .replaceAll("#", "")
                .toLowerCase();
              let message = "Invalid values entered. Try again.";
              let isValid =
                /[g-z~`!#$%\^&*+=\[\]\\';/{}|\\":<>\?]/g.test(input) ||
                input.replaceAll(",", "").length % 6 !== 0 ||
                input.length === 0
                  ? false
                  : true;
              input.replaceAll(",", "").length % 6 !== 0;
              const pals = input.split(",");
              for (const pal of pals)
                if (pal.length / 6 > 10 || !(pal.length >= 6)) isValid = false;
              if (isValid) {
                let i = 0;
                for (const pal of pals) {
                  i++;
                  palettes.addItem(pal.match(/.{1,6}/g) as string[]);
                }
                message = "Successfully imported values.";
                session.palettes.push({
                  undo() {
                    for (let j = i; j > 0; j--)
                      palettes.removeItem(palettes.items.length - 1);
                  },
                  redo() {
                    for (const pal of pals) {
                      palettes.addItem(pal.match(/.{1,6}/g) as string[]);
                    }
                  },
                });
              }
              document.body.append(toolTip(message));
              // div.remove()
            },
          },
          cancel: {
            message: "Cancel",
          },
        },
        type: "input",
      },
    );
  }
  return;
}

function moreButton() {
  if (router.deconstructURL(location.pathname).base === "create")
    document.body.append(
      popOver(
        [
          { message: "Save", classes: ["save"], call: saveButton },
          { message: "Import", classes: ["import"], call: importButton },
          { message: "Copy", classes: ["copy"], call: copyButton },
          {
            message: "Add Colors",
            classes: ["add-colors"],
            call: addColorsButton,
          },
        ],
        { type: "tool-menu" },
      ),
    );
  else
    document.body.append(
      popOver(
        [
          {
            message: "Remove All",
            classes: ["remove-all"],
            call: removeAllButton,
          },
          { message: "Import", classes: ["import"], call: importButton },
          { message: "Copy All", classes: ["copy"], call: copyButton },
        ],
        { type: "tool-menu" },
      ),
    );
}
