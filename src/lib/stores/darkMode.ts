import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Create a writable store for dark mode
function createDarkModeStore() {
  // Get initial value from localStorage
  const initialValue = browser ? localStorage.getItem("darkMode") === "true" || localStorage.getItem("darkMode") === "enabled" : false;

  const { subscribe, set, update } = writable(initialValue);

  return {
    subscribe,
    toggle: () => {
      update((value) => {
        const newValue = !value;
        if (browser) {
          localStorage.setItem("darkMode", newValue ? "true" : "false");
          if (newValue) {
            document.body.classList.add("dark");
          } else {
            document.body.classList.remove("dark");
          }
        }
        return newValue;
      });
    },
    set: (value: boolean) => {
      if (browser) {
        localStorage.setItem("darkMode", value ? "true" : "false");
        if (value) {
          document.body.classList.add("dark");
        } else {
          document.body.classList.remove("dark");
        }
      }
      set(value);
    },
    init: () => {
      if (browser) {
        const saved = localStorage.getItem("darkMode");
        const isDark = saved === "true" || saved === "enabled";
        if (isDark) {
          document.body.classList.add("dark");
        }
        set(isDark);
      }
    },
  };
}

export const darkMode = createDarkModeStore();
