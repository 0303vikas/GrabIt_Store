import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { CategoryType } from "../../types/Category"
import axios, { AxiosError } from "axios"

const CATEGORYAPI = "https://api.escuelajs.co/api/v1/categories"

const initialState: {
  category: CategoryType[]
  loading: boolean
  error: string
} = {
  category: [],
  loading: false,
  error: "",
}

export const fetchCategoryData = createAsyncThunk("getCategory", async () => {
  try {
    const request = await axios.get(CATEGORYAPI)
    return request.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
})

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    getAll: (state) => {},
  },
  extraReducers: (build) => {
    build.addCase(fetchCategoryData.pending, (state) => {
      state.loading = true
    })
    build.addCase(fetchCategoryData.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message
      } else {
        state.category = action.payload
      }
      state.loading = false
    })
    build.addCase(fetchCategoryData.rejected, (state) => {
      state.error = "Cannot Fetch Data"
    })
  },
})

const categoryReducer = categorySlice.reducer
export const { getAll } = categorySlice.actions

export default categoryReducer
