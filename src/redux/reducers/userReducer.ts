import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

import { UserLoginType, UserType } from "../../types/User"
import { NewUserType } from "../../types/NewUser"

const initialState: {
  users: UserType[]
  loading: boolean
  authloading: boolean
  error: string
  currentUser?: UserType
  imageString?: string
  registered: boolean
} = {
  users: [],
  loading: false,
  error: "",
  authloading: true,
  registered: false,
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
        console.log(data)
        return axios.post<UserType>("https://api.escuelajs.co/api/v1/users/", {
          ...userData.user,
          avatar: data.payload,
        })
      })
      .then((newUser) => newUser.data)
      .catch((e) => {
        const error = e as AxiosError
        if (error.response) {
          return JSON.stringify(error.response.data)
        }
        return error.message
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
      if (error.response) {
        return JSON.stringify(error.response.data)
      }
      return error.message
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

export const imageUpload = createAsyncThunk(
  "ImageUpload",
  async (file: FormData) => {
    try {
      const request = await axios.post(
        "https://api.escuelajs.co/api/v1/files/upload",
        file,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      return request.data.location
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
    clearUserLogin: (state) => {
      state.currentUser = initialState.currentUser
      state.authloading = false
    },
    clearAllUsers: (state) => {
      return initialState
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.users = action.payload
        }
        state.loading = false
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.error = "Cannot fetch data"
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.registered = true
        if (typeof action.payload === "string") {
          state.error = action.payload
        } else {
          state.users.push(action.payload)
        }
        state.registered = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload
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
          state.error = action.payload.message
        } else {
          state.currentUser = action.payload
        }
        state.loading = false
        state.authloading = true
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
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
          state.error = action.payload.message
        } else {
          state.imageString = action.payload
        }
        state.loading = false
      })
  },
})

const userReducer = userSlice.reducer
export const { clearAllUsers, createUserLocally, clearUserLogin } =
  userSlice.actions
export default userReducer
