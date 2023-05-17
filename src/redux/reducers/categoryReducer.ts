import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

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

type CreateCategoryType = Omit<CategoryType, "id">
type UpdateCategoryType = {
  id: number
  update: { name: string; image: string }
}

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    createCategory: (state, action: PayloadAction<CreateCategoryType>) => {
      state.category.push({ id: state.category.length + 1, ...action.payload })
    },
    updateCategory: (state, action: PayloadAction<UpdateCategoryType>) => {
      const category = state.category.map((category) => {
        if (category.id === action.payload.id) {
          return { ...category, ...action.payload.update }
        }
        return category
      })
      return {
        ...state,
        category,
      }
    },
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
export const { createCategory, updateCategory } = categorySlice.actions

export default categoryReducer
