import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

import { UserType } from "../../types/User"

const initialState: {
  users: UserType[]
  loading: boolean
  error: string
  rootUser: UserType[]
} = {
  users: [],
  loading: false,
  error: "",
  rootUser: [
    {
      id: 182828373,
      name: "testroot",
      role: "root",
      email: "root@email.com",
      password: "root",
      avatar: "",
    },
    {
      id: 182828374,
      name: "testadmin",
      role: "admin",
      email: "testadmin@email.com",
      password: "testadmin",
      avatar: "",
    },
    {
      id: 182828375,
      name: "testcustomer",
      role: "customer",
      email: "testcustomer@email.com",
      password: "testcustomer",
      avatar: "",
    },
  ],
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

type CreateUserAction = Omit<UserType, "id">

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    createUser: (state, action: PayloadAction<CreateUserAction>) => {
      let newUserId = state.users.length
      let newUser = { id: newUserId, ...action.payload }
      state.users.push(newUser)
    },
    updateUser: (state, action) => {
      console.log(action.payload)
      const users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          console.log(user.id)
          return { ...user, ...action.payload.update }
        }
        return user
      })
      console.log({
        ...state,
        users,
      })
      return {
        ...state,
        users,
      }
    },
    sortUserByEmail: (state, action) => {
      if (action.payload === "asc") {
        state.users.sort((a, b) => a.email.localeCompare(b.email))
      } else {
        state.users.sort((a, b) => b.email.localeCompare(a.email))
      }
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
          state.users = [...action.payload, ...state.rootUser]
        }
        state.loading = false
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.error = "Cannot fetch data"
      })
  },
})

const userReducer = userSlice.reducer
export const { createUser, updateUser, sortUserByEmail } = userSlice.actions
export default userReducer
