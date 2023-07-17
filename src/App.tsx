/**
 * @file Routing Page
 * @description Consists of Create Browser List, theme provider and change mode button
 * @Author Vikas Singh
 * @note
 * - change mode button is not working yet
 */
import React, { createContext, useEffect, useState } from "react"
import { ThemeProvider, useTheme } from "@mui/material/styles"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { darkMode, lightMode } from "./themes/mainTheme"
import { useAppDispatch } from "./hooks/useAppDispatch"
import Home from "./pages/Home"
import Login from "./components/Login"
import Registration from "./components/Registration"
import Category from "./components/Category"
import Product from "./components/Product"
import Cart from "./components/Cart"
import { Protected } from "./components/Protected"
import { UpdateProduct } from "./components/UpdateProduct"
import { authenticateUser } from "./redux/reducers/userReducer"
import { UserType } from "./types/User"
import { SingleProduct } from "./components/SingleProduct"
import { CreateProduct } from "./components/CreateProduct"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Page Not Found</div>,
    children: [
      {
        index: true,
        element: <Product />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/categories",
        element: <Category />,
      },
      {
        path: "/category/:id/products",
        element: <Product />,
      },
      {
        path: "/product/cart",
        element: <Cart />,
      },
      {
        path: "/product/edit/:id",
        element: (
          <Protected>
            <UpdateProduct />
          </Protected>
        ),
      },
      {
        path: "/createproduct",
        element: (
          <Protected>
            <CreateProduct />
          </Protected>
        ),
      },
      {
        path: "/single/product/:id",
        element: <SingleProduct />,
      },
    ],
  },
])

const App = () => {
  const [darkTheme, setDarkTheme] = useState<false | true>(false)
  const changeMode = () => setDarkTheme(!darkTheme)
  const ModeContext = createContext<typeof changeMode | null>(null)
  const accessToken = localStorage.getItem("userToken")
  const dispatch = useAppDispatch()

  // if token exists in localStorage, then
  // get user authenticated
  useEffect(() => {
    // if (accessToken) {
    //   dispatch(authenticateUser(accessToken))
    // }
  }, [accessToken])

  return (
    <ModeContext.Provider value={changeMode}>
      {darkTheme ? (
        <ThemeProvider theme={darkMode}>
          <RouterProvider router={appRouter} />
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={lightMode}>
          <RouterProvider router={appRouter} />
        </ThemeProvider>
      )}
    </ModeContext.Provider>
  )
}

export default App
