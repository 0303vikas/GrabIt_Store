import React from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Input } from "@mui/material"

import ContainerLoginRegister, {
  FormContainerLoginRegister,
  HeadingContainer,
  ImageContainer,
  SubmitBtn,
} from "../themes/formTheme"
import darkLogo from "../icons/darkLogo.png"

interface LoginForm {
  userName: string
  password: string
}
const Login = () => {
  const { register, handleSubmit, control } = useForm<LoginForm>()
  const onSubmit: SubmitHandler<LoginForm> = (data) => console.log(data)
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
        <SubmitBtn>Log In</SubmitBtn>
      </FormContainerLoginRegister>
    </ContainerLoginRegister>
  )
}

export default Login
