import React, { createContext, useEffect, useState } from "react"
import { ThemeProvider } from "@mui/material"

import { darkMode, lightMode } from "./themes/mainTheme"
import { fetchProductData } from "./redux/productReducer"
import { useAppDispatch } from "./hooks/useAppDispatch"
import { useAppSelector } from "./hooks/useAppSelector"
import { Login } from "./pages/Home"

const App = () => {
  const [darkTheme, setDarkTheme] = useState<false | true>(false)
  const changeMode = () => setDarkTheme(!darkTheme)
  const ModeContext = createContext<typeof changeMode | null>(null)
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.product)

  useEffect(() => {
    dispatch(fetchProductData())
  }, [])

  console.log(data)

  if (darkTheme)
    return (
      <ModeContext.Provider value={changeMode}>
        <ThemeProvider theme={darkMode}>
          <div>App Dark</div>
        </ThemeProvider>
      </ModeContext.Provider>
    )

  return (
    <ModeContext.Provider value={changeMode}>
      <ThemeProvider theme={lightMode}>
        <div>App Light</div>
        <Login />
      </ThemeProvider>
    </ModeContext.Provider>
  )
}

export default App
