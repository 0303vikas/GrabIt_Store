import React, { createContext, useEffect, useState } from "react"
import { ThemeProvider } from "@mui/material"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { darkMode, lightMode } from "./themes/mainTheme"
import { fetchProductData } from "./redux/reducers/productReducer"
import { useAppDispatch } from "./hooks/useAppDispatch"
import { useAppSelector } from "./hooks/useAppSelector"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import "./styles/style.scss"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
])

const App = () => {
  const [darkTheme, setDarkTheme] = useState<false | true>(false)
  const changeMode = () => setDarkTheme(!darkTheme)
  const ModeContext = createContext<typeof changeMode | null>(null)

  if (darkTheme)
    return (
      <ModeContext.Provider value={changeMode}>
        <ThemeProvider theme={darkMode}>
          <RouterProvider router={appRouter} />
        </ThemeProvider>
      </ModeContext.Provider>
    )

  return (
    <ModeContext.Provider value={changeMode}>
      <ThemeProvider theme={lightMode}>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </ModeContext.Provider>
  )
}

export default App
