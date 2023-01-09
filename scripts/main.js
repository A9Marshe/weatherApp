import { updateThemeMode, updateThemeScheme } from "./Theme.js";

//assign click event listenrs to buttons with their appropriate function invocations
document.querySelectorAll("[data-color]").forEach(b => b.addEventListener("click", (e) => updateThemeScheme(e.target.value)));
document.querySelector("[data-theme-mode = toggle]").addEventListener("click", updateThemeMode)