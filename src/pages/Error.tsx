/**
 * @file Error
 * @description Store error handling page
 * @Author Vikas Singh
 */
import { useTheme } from "@mui/material"
import React from "react"
import { useAppSelector } from "../hooks/useAppSelector"

/**
 * 
 * @returns JSX.Element with error
 */
const ErrorComponent = () => {
  let theme = useTheme()
  const reduxState = useAppSelector((store) => store)
  const productsError = reduxState.product.error
  const userError = reduxState.user.error
  const categoryError = reduxState.categories.error

  return (
    <div style={{ ...theme.typography.h1, color: theme.palette.error.dark }}>
      <h2>Error</h2>
      {productsError && <p>{productsError} </p>}
      {userError && <p>{userError} </p>}
      {categoryError && <p>{categoryError} </p>}
    </div>
  )
}

export default ErrorComponent
