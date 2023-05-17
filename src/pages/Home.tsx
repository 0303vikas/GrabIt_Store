import React from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Input } from "@mui/material"
import { Outlet } from "react-router-dom"

interface LoginForm {
  userName: string
  password: string
}
const Home = () => {
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
