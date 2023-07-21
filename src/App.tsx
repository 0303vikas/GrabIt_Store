/**
 * @file Routing Page
 * @description Consists of Create Browser List, theme provider and change mode button
 * @Author Vikas Singh
 * @note
 * - change mode button is not working yet
 */
import React, { createContext, useEffect } from "react"
import { ThemeProvider } from "@mui/material/styles"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { darkMode, lightMode } from "./themes/mainTheme"
import { useAppDispatch } from "./hooks/useAppDispatch"
import Home from "./pages/Home"
import Login from "./components/Login"
import Registration from "./components/Registration"
import Category from "./components/Category"
import Product from "./components/Product"
import Cart from "./components/Cart"
import Create from "./components/Create"
import { Protected } from "./components/Protected"
import { UpdateProduct } from "./components/UpdateProduct"
import { authenticateUser } from "./redux/reducers/userReducer"
import { SingleProduct } from "./components/SingleProduct"
import { useAppSelector } from "./hooks/useAppSelector"

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
            <Create createType="product" />
          </Protected>
        ),
      },
      {
        path: "/createcategory",
        element: (
          <Protected>
            <Create createType="category" />
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

interface ModeContextType {
  changeMode: () => void
}

export const ModeContext = createContext<ModeContextType | null>(null)

const App = () => {
  const modeReduxState = useAppSelector((state) => state.mode)
  const accessToken = localStorage.getItem("userToken")
  const dispatch = useAppDispatch()

  // if token exists in localStorage, then
  // get user authenticated
  useEffect(() => {
    if (accessToken) {
      dispatch(authenticateUser(accessToken))
    }
  }, [accessToken])

  return (
    <>
      {modeReduxState.mode === "light" ? (
        <ThemeProvider theme={lightMode}>
          <RouterProvider router={appRouter} />
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={darkMode}>
          <RouterProvider router={appRouter} />
        </ThemeProvider>
      )}
    </>
  )
}

export default App
