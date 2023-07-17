import { createTheme } from "@mui/material/styles"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
    common: {
      black: "rgb(255,255,255)",
      white: "rgb(24,36,50)",
    },
  },
})

const lightTheme = createTheme({
  palette: {
    mode: "light",
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
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      margin: "1.5rem 0",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.3,
      margin: "1.3rem 0",
    },
    h3: {
      fontSize: "1.8rem",
      fontWeight: 700,
      lineHeight: 1.4,
      margin: "1.2rem 0",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.5,
      margin: "1rem 0",
    },
    h5: {
      fontSize: "1.3rem",
      fontWeight: 700,
      lineHeight: 1.6,
      margin: "0.8rem 0",
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 700,
      lineHeight: 1.7,
      margin: "0.3rem 0",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.6,
      margin: "1rem 0",
    },
    body2: {
      fontSize: "0.9rem",
      fontWeight: 400,
      lineHeight: 1.6,
      margin: "0.8rem 0",
    },
  },
})

const darkMerge = createTheme({
  ...commonTheme,
  palette: {
    ...commonTheme.palette,
    ...darkTheme.palette,
  },
})

const lightMerge = createTheme({
  ...commonTheme,
  palette: {
    ...commonTheme.palette,
    ...lightTheme.palette,
  },
})

export const darkMode = darkMerge
export const lightMode = lightMerge
export const commonMode = commonTheme
