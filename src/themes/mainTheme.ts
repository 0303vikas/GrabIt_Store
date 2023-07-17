import { createTheme } from "@mui/material/styles"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    common: {
      black: "rgb(255,255,255)",
      white: "rgb(24,36,50)",
    },
  },
})

const lightTheme = createTheme({
  palette: {
    mode: "light",
    common: {
      black: "rgb(24,36,50)",
      white: "rgb(255,255,255)",
    },
  },
})

const commonTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(80,183,239)",
      light: "rgba(24,255,255,0.25)",
      dark: "rgb(33,150,243)",
    },
    secondary: {
      main: "rgb(9,234,172)",
      light: "rgb(29,233,182)",
      dark: "rgb(100,255,218)",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
    warning: {
      main: "#ffa726",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    info: {
      main: "#29b6f6",
      light: "#4fc3f7",
      dark: "#0288d1",
    },
    success: {
      main: "#66bb6a",
      light: "#81c784",
      dark: "#388e3c",
    },
    common: {
      black: "#000",
      white: "#fff",
    },
  },
})

const darkMerge = createTheme({
  ...commonTheme,
  palette: {
    ...commonTheme.palette,
    common: { ...darkTheme.palette.common },
    mode: darkTheme.palette.mode,
  },
})

const lightMerge = createTheme({
  ...commonTheme,
  palette: {
    ...commonTheme.palette,
    common: { ...lightTheme.palette.common },
    mode: lightTheme.palette.mode,
  },
})

export const darkMode = darkMerge
export const lightMode = lightMerge
export const commonMode = commonTheme
