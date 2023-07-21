import { useEffect, useState } from "react"
import { Button, CardMedia, Input, TextField, useTheme } from "@mui/material"

import ContainerProductCategory, { DisplayGrid } from "../themes/categoryTheme"
import {
  DisplayCardHorizontal,
  HorizontalCardBox,
} from "../themes/horizontalCardTheme"
import UploadImageForm from "./UploadImageForm"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { fetchAllUsers, updateUser } from "../redux/reducers/userReducer"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

interface PasswordType {
  password: string
  retryPassword: string
}

const Profile = () => {
  const { currentUser, users } = useAppSelector((store) => store.user)
  const theme = useTheme()
  const [image, setImage] = useState(currentUser?.avatar)
  const [name, setName] = useState(currentUser?.name)
  const [email, setEmail] = useState(currentUser?.email)
  const [emailerror, setEmailError] = useState("")
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<PasswordType>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  const updateHandler = () => {
    if (currentUser?.email !== email) {
      if (users.find((item) => item.email === email)) {
        setEmailError("Email Already Exists")
        return
      }
    }
    if (currentUser) {
      const updateData = {
        id: currentUser.id,
        updateData: {
          email: email,
          name: name,
          image: image,
        },
      }
      dispatch(updateUser(updateData)).then(() => {
        alert("User Updated Successfully.")
      })
    }
  }

  const updatePasswordHandler: SubmitHandler<PasswordType> = (data, e) => {
    e?.preventDefault()

    if (currentUser) {
      const updateData = {
        id: currentUser.id,
        updateData: {
          password: data.password,
        },
      }
      dispatch(updateUser(updateData)).then(() => {
        alert("PasswordUpdated Successfully.")
      })
    }
  }

  const addImage = (arg: string) => {
    setImage(arg)
    alert("Image added Successfully.")
  }
  const password = watch("password")

  const validatePasswordReset = (value: string) => {
    if (value === password) {
      return true
    } else {
      return "Password do not match"
    }
  }

  return (
    <ContainerProductCategory
      id="create--container"
      className="productCategory--container"
    >
      <h1
        id="page-heading"
        style={{
          ...theme.typography.h2,
          textTransform: "uppercase",
          fontSize: "4rem",
        }}
      >
        <span id="page-heading--firstLetter" style={{ fontSize: "100px" }}>
          P
        </span>
        rofile
      </h1>

      <DisplayGrid gap={2} gridTemplateColumns={"repeat(1,1fr)"}>
        <DisplayCardHorizontal>
          <aside id="image-handling">
            <CardMedia
              component="img"
              height="400"
              image={image ? image : ""}
              alt={name ? name + " image." : "Category Image."}
              sx={{
                [theme.breakpoints.down("md")]: {
                  display: "none",
                },
              }}
            />
          </aside>

          <HorizontalCardBox>
            <div style={{ display: "grid", rowGap: "2rem" }} id="create-Form">
              <TextField
                id="create-Form--Name"
                label="Name"
                type="string"
                variant="filled"
                value={name ? name : currentUser?.name}
                onChange={(e) => setName(e.target.value)}
                onClick={() => setEmailError("")}
              />
              <TextField
                id="create-Form--email"
                label="Email"
                type="email"
                variant="filled"
                value={email ? email : currentUser?.email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              {emailerror && (
                <p style={{ color: theme.palette.error.main }}>{emailerror}</p>
              )}

              <form
                onSubmit={handleSubmit(updatePasswordHandler)}
                style={{ border: "black 1px solid", padding: "1rem" }}
              >
                <h4 style={{ color: theme.palette.warning.main }}>
                  Reset Your Password
                </h4>
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
                          color: "black",
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
                          color: "black",
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
                <Button variant="contained" color="warning" type="submit">
                  Reset
                </Button>
              </form>

              <UploadImageForm addImage={addImage} />
            </div>
            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={updateHandler}
              >
                Update User
              </Button>
            </div>
          </HorizontalCardBox>
        </DisplayCardHorizontal>
      </DisplayGrid>
    </ContainerProductCategory>
  )
}

export default Profile
