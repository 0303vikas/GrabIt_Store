import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useContext,
  useEffect,
} from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Input, TextField, useTheme } from "@mui/material"

import ContainerLoginRegister, {
  FormContainerLoginRegister,
  HeadingContainer,
  ImageContainer,
  SubmitBtn,
} from "../themes/formTheme"
import darkLogo from "../icons/darkLogo.png"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import {
  createUser,
  fetchAllUsers,
  loginUser,
  updateUser,
} from "../redux/reducers/userReducer"
import { findOneUserHook } from "../hooks/findOneUser"
import { useNavigate } from "react-router-dom"

interface LoginForm {
  userEmail: string
  password: string
}

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<LoginForm>()

  const dispatch = useAppDispatch()
 
  const { users } = useAppSelector((state) => state.user)
  const theme = useTheme()
  const navigate = useNavigate() 

  const onSubmit: SubmitHandler<LoginForm> = (data, e) => {
    e?.preventDefault()
    const userEmailExist = findOneUserHook(users, data.userEmail)

    if (!userEmailExist) {
      setError("userEmail", {
        type: "manual",
        message: "*Email is wrong",
      })
      return false
    }

    if (data.password !== userEmailExist.password) {
      setError("password", {
        type: "manual",
        message: "*Password Didn't match",
      })
      return false
    }
    const loginData = {
      email: data.userEmail,
      password: data.password
    }

    dispatch(loginUser(loginData))
    navigate('/')

  }

  return (
    <ContainerLoginRegister>
      <ImageContainer src={darkLogo} />
      <FormContainerLoginRegister
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <HeadingContainer>SIGN IN</HeadingContainer>

        <Controller
          name="userEmail"
          control={control}
          rules={{
            required: "*Email is required.",
          }}
          render={({ field }) => (
            <div>
            <Input
              className="input--userEmail"
              type="string"
              placeholder="Email"
              style={{
                fontWeight: "bolder",
                color: "white",
              }}
              color={errors.userEmail ? "error" : "secondary"}
              required
              {...field}
            />
            {errors.userEmail && (
                <p
                  style={{
                    color: theme.palette.error.main,
                    fontSize: theme.typography.fontSize,
                    margin: "0",
                  }}
                >
                  *{errors.userEmail.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "*Password is required",
          }}
          render={({ field }) => (
            <div>
            <Input
              className="input--password"
              type="password"
              placeholder="Password"
              sx={{
                fontWeight: "bolder",
                color: "white",
              }}
              color={errors.password ? "error" : "secondary"}
              required
              {...field}
            />
            {errors.password && (
                <p
                  style={{
                    color: theme.palette.error.main,
                    fontSize: theme.typography.fontSize,
                    margin: "0",
                  }}
                >
                  *{errors.password.message}
                </p>
              )}
            </div>
          )}
        />

        <SubmitBtn type="submit">Log In</SubmitBtn>
      </FormContainerLoginRegister>
    </ContainerLoginRegister>
  )
}

export default Login

{
  /* <TextField sx={{
                fontWeight: "bolder",
                color: "white",
              }}>
        <Controller
          name="imageFile"
          control={control}
          render={({ field: { onChange, value, ...field} }) => (
            <input
              className="input--file"
              type="file"
              placeholder="Upload"              
              required              
              {...field}
              
            />
          )}
          />
          </TextField> */
}
