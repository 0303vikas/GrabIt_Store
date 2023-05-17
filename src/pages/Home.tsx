import React, { useEffect } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Input } from "@mui/material"
import { Outlet } from "react-router-dom"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { fetchProductData } from "../redux/reducers/productReducer"

const Home = () => {
  // const dispatch = useAppDispatch()
  // const data = useAppSelector((state) => state.product)

  // useEffect(() => {
  //   dispatch(fetchProductData())
  // }, [])

  // console.log(data)
  return (
    <main>
      <nav>
        <p> This is the navigation Bar</p>
      </nav>
      <Outlet />
    </main>
  )
}

export default Home
