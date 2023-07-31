import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

import { UserLoginType, UserType } from "../../types/User"
import { NewUserType } from "../../types/NewUser"
import { imageUpload } from "./image/imageUpload"
import { ErrorMessageType } from "../../types/ErrorType"

const initialState: {
  users: UserType[]
  loading: boolean
  authloading: boolean
  error: ErrorMessageType
  currentUser?: UserType
  imageString?: string
} = {
  users: [],
  loading: false,
  error: {
    message: "",
    statusCode: 200,
  },
  authloading: true,
}

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  try {
    const request = await axios.get<UserType[]>(
      "https://api.escuelajs.co/api/v1/users"
    )
    return request.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
})

export const createUser = createAsyncThunk(
  "createUser",
  async (
    userData: { file: FormData; user: Omit<NewUserType, "imageFile"> },
    { dispatch }
  ) => {
    const imageString = dispatch(imageUpload(userData.file))
      .then((data) => {
        return axios.post<UserType>("https://api.escuelajs.co/api/v1/users/", {
          ...userData.user,
          avatar: data.payload,
        })
      })
      .then((newUser) => newUser.data)
      .catch((e) => {
        const error = e as AxiosError
        return error
      })

    return imageString
  }
)

export const updateUser = createAsyncThunk(
  "updateUser",
  async (user: { id: number; updateData: Partial<UserType> }) => {
    try {
      const request = await axios.put<UserType>(
        `https://api.escuelajs.co/api/v1/users/${user.id}`,
        user.updateData
      )
      return request.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)
export const authenticateUser = createAsyncThunk(
  "authentication",
  async (token: string) => {
    try {
      const request = await axios.get<UserType>(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return request.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

export const loginUser = createAsyncThunk(
  "login",
  async ({ email, password }: UserLoginType, { dispatch }) => {
    try {
      const request = await axios.post<{
        access_token: string
        refresh_token: string
      }>("https://api.escuelajs.co/api/v1/auth/login", { email, password })
      localStorage.setItem("userToken", request.data.access_token)
      localStorage.setItem("userRefreshToken", request.data.refresh_token)
      const authentication = await dispatch(
        authenticateUser(request.data.access_token)
      )
      return authentication.payload as UserType
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    createUserLocally: (state, action: PayloadAction<UserType>) => {
      state.users.push(action.payload)
    },
    clearUserError: (state) => {
      state.error = initialState.error
    },
    clearUserLogin: (state) => {
      state.currentUser = initialState.currentUser
      state.error = initialState.error
      state.authloading = false
    },
    clearAllUsers: (state) => {
      return initialState
    },
    findOneUser: (state) => {},
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.response?.data as ErrorMessageType
        } else {
          state.users = action.payload
        }
        state.loading = false
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.error = { message: "Cannot fetch data", statusCode: 500 }
      })
      .addCase(createUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.response?.data as ErrorMessageType
        } else {
          state.users.push(action.payload)
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.response?.data as ErrorMessageType
        } else {
          const newdata = action.payload
          const updatedUsers = state.users.map((user) => {
            if (newdata.id === user.id) {
              return { ...user, ...newdata }
            }
            return user
          })

          return {
            ...state,
            updatedUsers,
          }
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.response?.data as ErrorMessageType
        } else {
          state.currentUser = action.payload
        }
        state.loading = false
        state.authloading = true
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.response?.data as ErrorMessageType
        } else {
          state.currentUser = action.payload
        }
        state.authloading = false
      })
      .addCase(authenticateUser.pending, (state) => {
        state.authloading = true
      })
      .addCase(imageUpload.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.response?.data as ErrorMessageType
        } else {
          state.imageString = action.payload
        }
        state.loading = false
      })
  },
})

const userReducer = userSlice.reducer
export const {
  clearAllUsers,
  createUserLocally,
  clearUserLogin,
  clearUserError,
} = userSlice.actions
export default userReducer
