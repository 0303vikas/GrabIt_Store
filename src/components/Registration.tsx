/**
 * @file Registration
 * @description User Registration Component
 * @Author Vikas Singh
 */
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
import darkLogo from "../icons/DarkImage.png"
import lightLogo from "../icons/LightImage.png"
import {
  clearUserLogin,
  createUser,
  fetchAllUsers,
} from "../redux/reducers/userReducer"
import { useEffect } from "react"
import { ErrorComponent } from "./ErrorComponent"

/**
 * @description For registing new users, for data consists of username, useremail, password and image upload
 * @returns JSX.Element registration form
 */
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

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  const onSubmit: SubmitHandler<RegistrationType> = (data, e) => {
    e?.preventDefault()
    const isEmailExisting = checkEmailAvailableHook(
      userStore.users,
      data.userName
    )
    if (isEmailExisting) {
      setError("userName", {
        type: "manual",
        message: "Email is not available",
      })
      return false
    }

    if (
      !data.file[0] ||
      !data.file[0].type ||
      data.file[0].type.indexOf("image") === -1
    ) {
      setError("file", {
        type: "manual",
        message: "Selected file is not an image",
      })
      return
    }

    const imgFormData = new FormData()
    imgFormData.append("file", data.file[0], data.file[0].name)

    const userData = {
      file: imgFormData,
      user: {
        name: data.userName,
        email: data.userEmail,
        password: data.password,
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
      },
    }

    dispatch(createUser(userData)).then((res) => {
      if (userStore.error.message !== "") {
        setTimeout(() => {
          dispatch(clearUserLogin())
        }, 3000)
      }
      alert("Registration Successful")
      navigate("/login")
    })
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
      <ImageContainer
        src={theme.palette.mode === "light" ? lightLogo : darkLogo}
      />
      <FormContainerLoginRegister
        style={{
          display: "flex",
          justifyContent: "center",
          rowGap: "1rem",
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
            <>
              <Input
                className="input--userName"
                type="string"
                placeholder="UserName"
                sx={{
                  fontWeight: "bolder",
                  color: theme.palette.common.black,
                  backgroundColor: theme.palette.common.white,
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
            </>
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
            <>
              <Input
                className="input--userEmail"
                type="string"
                placeholder="Email"
                sx={{
                  fontWeight: "bolder",
                  color: theme.palette.common.black,
                  backgroundColor: theme.palette.common.white,
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
            </>
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
            <>
              <Input
                className="input--password"
                type="password"
                placeholder="Password"
                sx={{
                  fontWeight: "bolder",
                  color: theme.palette.common.black,
                  backgroundColor: theme.palette.common.white,
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
            </>
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
                  color: theme.palette.common.black,
                  backgroundColor: theme.palette.common.white,
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

        <Controller
          name="file"
          control={control}
          rules={{ required: "Image is required" }}
          render={({ field }) => (
            <>
              <input
                type="file"
                accept="image/*"
                {...register("file")}
                name="file"
                required
                placeholder="Upload Image"
                style={{ width: "14rem" }}
              />
              {errors.file && (
                <p
                  style={{
                    color: theme.palette.error.main,
                    fontSize: theme.typography.fontSize,
                    margin: "0",
                  }}
                >
                  *{errors.file.message}
                </p>
              )}
            </>
          )}
        />
        {userStore.error.message && (
          <ErrorComponent
            message={userStore.error.message}
            statusCode={userStore.error.statusCode}
          />
        )}
        <SubmitBtn type="submit">Register</SubmitBtn>
      </FormContainerLoginRegister>
    </ContainerLoginRegister>
  )
}

export default Registration
