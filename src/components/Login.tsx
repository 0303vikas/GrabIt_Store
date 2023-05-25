import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useEffect } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Input, TextField } from "@mui/material"

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
  updateUser,
} from "../redux/reducers/userReducer"



interface LoginForm {
  userName: string
  password: string
  UserImage: File
}

const Login = () => {
  const { register, handleSubmit, setError, control , formState: {errors}} = useForm<LoginForm>()
  
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  const onSubmit: SubmitHandler<LoginForm> = (data,e) =>{   
    
  } 

  console.log(data)
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
          name="userName"
          control={control}
          render={({ field }) => (
            <Input
              className="input--username"
              type="string"
              placeholder="User Name"
              style={{
                fontWeight: "bolder",
                color: "white",
              }}
              color="secondary"
              required
              {...field}
            />
          )}
        />
        
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              className="input--password"
              type="string"
              placeholder="Password"
              sx={{
                fontWeight: "bolder",
                color: "white",
              }}
              required
              {...field}
            />
            
          )}          
        />
        
        
        <SubmitBtn type="submit" >Log In</SubmitBtn>
      </FormContainerLoginRegister>
    </ContainerLoginRegister>
  )
}

export default Login


{/* <TextField sx={{
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
          </TextField> */}