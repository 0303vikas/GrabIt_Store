import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Input, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"

import ContainerLoginRegister, {
  FormContainerLoginRegister,
  HeadingContainer,
  ImageContainer,
  SubmitBtn,
} from "../themes/formTheme"
import { RegistrationType } from "../types/NewUser"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { checkEmailAvailableHook } from "../hooks/checkEmailAvailibility"
import darkLogo from "../icons/darkLogo.png"
import { createUser } from "../redux/reducers/userReducer"

const Registration = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const navigate = useNavigate()
  const userStore = useAppSelector((store) => store.user)
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
    watch,
    register,
  } = useForm<RegistrationType>()
  const onSubmit: SubmitHandler<RegistrationType> = (data, e) => {
    e?.preventDefault()
    const isEmailAvailable = checkEmailAvailableHook(
      userStore.users,
      data.userName
    )
    if (isEmailAvailable) {
      setError("userName", {
        type: "manual",
        message: "Email is not available",
      })
      return false
    }

    const reader = new FileReader()
    reader.onload = function (event) {
      const binaryFile = event.target?.result
      const userData = {
        file: binaryFile,
        user: {
          name: data.userName,
          email: data.userEmail,
          password: data.password,
          avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
        },
      }
      dispatch(createUser(userData))
    }

    reader.readAsBinaryString(data.imageFile[0])

    // setTimeout(() => {
    //   if (userStore.error) {
    //     return false
    //   } else {
    //     alert("Registration Successful")

    //     navigate("/login")
    //   }
    // },2000)
  }
  const password = watch("password")
  const retryPassword = watch("retryPassword")

  const validatePasswordReset = (value: string) => {
    if (value === password) {
      return true
    } else {
      return "Password do not match"
    }
  }

  return (
    <ContainerLoginRegister>
      <ImageContainer src={darkLogo} />
      <FormContainerLoginRegister
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <HeadingContainer>SIGN UP</HeadingContainer>
        <Controller
          name="userName"
          control={control}
          rules={{
            required: "UserName is required",
          }}
          render={({ field }) => (
            <div>
              <Input
                className="input--userName"
                type="string"
                placeholder="UserName"
                sx={{
                  fontWeight: "bolder",
                  color: "white",
                  backgroundColor: theme.palette.common.black,
                }}
                color={errors.userName ? "error" : "secondary"}
                required
                {...field}
              />
              {errors.userName && (
                <p
                  style={{
                    color: theme.palette.error.main,
                    fontSize: theme.typography.fontSize,
                    margin: "0",
                  }}
                >
                  *{errors.userName.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="userEmail"
          control={control}
          rules={{
            required: "UserEmail is Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <div>
              <Input
                className="input--userEmail"
                type="string"
                placeholder="Email"
                sx={{
                  fontWeight: "bolder",
                  color: "white",
                  backgroundColor: theme.palette.common.black,
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
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
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
                  backgroundColor: theme.palette.common.black,
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
        <Controller
          name="retryPassword"
          control={control}
          rules={{
            required: "Password confirmation is required",
            validate: validatePasswordReset,
          }}
          render={({ field }) => (
            <div>
              <Input
                className="input--password"
                type="password"
                placeholder="ReEnter Password"
                sx={{
                  fontWeight: "bolder",
                  color: "white",
                  backgroundColor: theme.palette.common.black,
                }}
                color={errors.retryPassword ? "error" : "secondary"}
                required
                {...field}
              />
              {errors.retryPassword && (
                <p
                  style={{
                    color: theme.palette.error.main,
                    fontSize: theme.typography.fontSize,
                    margin: "0",
                  }}
                >
                  *{errors.retryPassword.message}
                </p>
              )}
            </div>
          )}
        />
        <input
          type="file"
          accept="image/*"
          {...register("imageFile")}
          name="imageFile"
          required
        />
        {userStore.error && (
          <p
            style={{
              color: theme.palette.error.main,
              fontSize: theme.typography.fontSize,
              margin: "0",
            }}
          >
            {userStore.error}
          </p>
        )}
        <SubmitBtn type="submit">Register</SubmitBtn>
      </FormContainerLoginRegister>
    </ContainerLoginRegister>
  )
}

export default Registration
