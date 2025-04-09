import { wait } from "../../lib/helpers";

async function Toggle(tog: Element) {
  if (!(tog instanceof Element)) return;

  const targetId = tog.getAttribute("aria-controls");
  if (!targetId) return;

  const target = document.getElementById(targetId);
  if (!target) return;

  const middle = tog.querySelector(".middle");
  const navItems = target.querySelectorAll("a");

  async function itemsIn() {
    for (const item of navItems) {
      await wait(50);
      item.classList.add("in");
      item.setAttribute("tabindex", "0");
    }
  }

  async function itemsOut() {
    for (const item of navItems) {
      item.classList.remove("in");
      item.setAttribute("tabindex", "-1");
    }
  }

  function handleEscClose(e: KeyboardEvent) {
    if (e.key === "Escape") {
      close();
    }
  }

  async function open() {
    tog.classList.add("transition-open");
    await wait(500);
    middle && middle.setAttribute("hidden", "true");
    tog.setAttribute("aria-expanded", "true");
    tog.classList.remove("transition-open");
    target && target.classList.add("open");
    itemsIn();
    navItems.forEach((item) => {
      item.addEventListener("click", close);
      item.setAttribute("tabindex", "0");
    });
    window.addEventListener("keydown", handleEscClose);
  }

  async function close() {
    tog.classList.add("transition-close");
    itemsOut();
    target && target.classList.remove("open");
    await wait(500);
    middle && middle.removeAttribute("hidden");
    tog.setAttribute("aria-expanded", "false");
    tog.classList.remove("transition-close");
    navItems.forEach((item) => {
      item.removeEventListener("click", close);
      item.setAttribute("tabindex", "-1");
    });
    window.removeEventListener("keydown", handleEscClose);
  }

  tog.addEventListener("click", () => {
    if (tog.getAttribute("aria-expanded") === "true") {
      close();
    } else {
      open();
    }
  });
}

const toggle = document.querySelector(".toggle");
toggle && Toggle(toggle);
