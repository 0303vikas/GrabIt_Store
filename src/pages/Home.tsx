import React from "react"

import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Input } from "@mui/material"
import "../styles/loginPage.scss"
import ContainerLoginRegister, {
  FormContainerLoginRegister,
} from "../themes/formTheme"

interface LoginForm {
  userName: string
  password: string
}
export const Login = () => {
  const { register, handleSubmit, control } = useForm<LoginForm>()
  const onSubmit: SubmitHandler<LoginForm> = (data) => console.log(data)
  return (
    <section>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="userName"
          control={control}
          render={({ field }) => (
            <Input
              className="input--username"
              type="string"
              placeholder="User Name"
              sx={{
                borderColor:
                  "linear-gradient(90deg, rgba(9,234,172,1) 30%, rgba(80,183,239,1) 70%)",
              }}
              required
              {...field}
            />
          )}
        />

        <input {...register("userName", { required: true })} />
        <input {...register("password", { required: true })} />
        <input type="submit" />
      </form> */}
      <ContainerLoginRegister>
        <FormContainerLoginRegister>
          <form
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3>SIGN UP</h3>
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
                  error
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
                    borderColor:
                      "linear-gradient(90deg, rgba(9,234,172,1) 30%, rgba(80,183,239,1) 70%)",
                  }}
                  required
                  {...field}
                />
              )}
            />

            {/* <input {...register("userName", { required: true })} />
            <input {...register("password", { required: true })} /> */}
            <input type="submit" />
          </form>
        </FormContainerLoginRegister>
      </ContainerLoginRegister>
    </section>
  )
}
