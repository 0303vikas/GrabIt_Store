export const checkBrowserMode = (): boolean => {
  const mode = localStorage.getItem("grabItMode")
  if (mode) {
    if (mode === "light") return false
    else return true
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return true
  }

  return false
}
