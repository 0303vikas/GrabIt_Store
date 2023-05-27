import React, { Fragment, ReactNode, useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import { useAppSelector } from "../hooks/useAppSelector"
import { LoggedInUserContext } from "../App"

export const Protected = ({ children }: {children: ReactNode}) => {
  
   const {currentUser, error,authloading} = useAppSelector(state => state.user)
  const navigate = useNavigate()


  if(error) {
    return(
        <div>
            Error registration. Redirecting to loginPage
            <Navigate to="/login" replace />  
            </div>
    )
  }
  if(authloading) return <div>Loading...</div>

  if (!currentUser){    
    return <Navigate to="/login" replace />  
  } else {
    if(currentUser.role !== "admin"){
        
    return <Navigate to="/login" replace />  
    }
    return <Fragment> {children}</Fragment>
 }
}
