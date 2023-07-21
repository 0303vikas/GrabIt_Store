/**
 * @file Protected Route
 * @description Filtering pages according to logged in state and logged in user role
 * @Author Vikas Singh
 */
import { Fragment, ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useTheme, Box, CircularProgress } from "@mui/material"

import { useAppSelector } from "../hooks/useAppSelector"

/**
 * @description applied on two routes, Update product and Create Product
 * @param param0: ReactNode
 * if user login error
 * @returns error message @redirects login component
 * else if authLoading === true
 * @returns loading...
 * else if user !== admin
 * @returns @redirects login component
 * else
 * @returns to edit product/create product component
 *
 */
export const Protected = ({
  children,
  routerType,
}: {
  children: ReactNode
  routerType: string
}) => {
  const theme = useTheme()
  const { currentUser, error, authloading } = useAppSelector(
    (state) => state.user
  )

  if (error) {
    return (
      <div>
        Error regisered. Redirecting to loginPage
        <Navigate to="/login" replace />
      </div>
    )
  }

  if (!currentUser) {
    if (authloading)
      return (
        <Box sx={{ marginLeft: "50%" }}>
          <h1 style={{ color: theme.palette.info.main }}>Loading</h1>
          <CircularProgress style={{ color: theme.palette.info.main }} />
        </Box>
      )
    return <Navigate to="/login" replace />
  } else {
    if (currentUser.role !== "admin" && currentUser.role !== "customer") {
      return <Navigate to="/login" replace />
    } else if (currentUser.role !== "admin" && routerType !== "profile") {
      return <Navigate to="/login" replace />
    }
    return <Fragment> {children}</Fragment>
  }
}
