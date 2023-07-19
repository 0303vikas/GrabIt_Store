export const setThemeLocalStorage = (mode: "light" | "dark") => {
  localStorage.setItem("grabItMode", mode)
}
