import React, { createContext, useEffect, useState } from "react"
import { ThemeProvider } from "@mui/material/styles"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { darkMode, lightMode } from "./themes/mainTheme"
import { fetchProductData } from "./redux/reducers/productReducer"
import { useAppDispatch } from "./hooks/useAppDispatch"
import { useAppSelector } from "./hooks/useAppSelector"
import Home from "./pages/Home"
import Login from "./components/Login"
import Registration from "./components/Registration"
import "./styles/style.scss"
import Category from "./components/Category"
import Product from "./components/Product"
import Cart from "./components/Cart"
import { Protected } from "./components/Protected"
import { UserEdit } from "./components/UserEdit"
import { authenticateUser } from "./redux/reducers/userReducer"
import { UserType } from "./types/User"

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
        path: "/user/edit",
        element: (
          <Protected>
            <UserEdit />
          </Protected>
        ),
      },
      {
        path: "/product/edit",
        element: (<Protected><UserEdit /></Protected>)
      },
      {
        path: "/product/create",
        element: (<Protected><UserEdit /></Protected>)
      }
    ],
  },
])

export const LoggedInUserContext = createContext<UserType | null | false>(null)

const App = () => {
  const [darkTheme, setDarkTheme] = useState<false | true>(false)
  const changeMode = () => setDarkTheme(!darkTheme)
  const ModeContext = createContext<typeof changeMode | null>(null)
  // const { currentUser } = useAppSelector((state) => state.user)

  const accessToken = localStorage.getItem("userToken")
  const dispatch = useAppDispatch()
  // const loggedIn = useAppSelector( state => state.)

  useEffect(() => {
    if (accessToken) {
      console.log('this is running')
      dispatch(authenticateUser(accessToken))
    }
  }, [accessToken])
  console.log('app.js re-rendering')

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
