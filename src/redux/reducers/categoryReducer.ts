import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { CategoryType, UpdateCategoryType } from "../../types/Category"
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

export const createCategory = createAsyncThunk(
  "createCategory",
  async (category: Omit<CategoryType, "id">) => {
    try {
      const request = await axios.post(
        "https://api.escuelajs.co/api/v1/categories",
        category
      )
      return request.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (category: UpdateCategoryType) => {
    try {
      const request = await axios.put<CategoryType>(
        `https://api.escuelajs.co/api/v1/categories/${category.id}`,
        category.newData
      )
      return request.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (id: number) => {
    try {
      const request = await axios.put<CategoryType>(
        `https://api.escuelajs.co/api/v1/categories/${id}`
      )
      return id
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    // createCategory: (state, action: PayloadAction<CreateCategoryType>) => {
    //   state.category.push({ id: state.category.length + 1, ...action.payload })
    // },
    // updateCategory: (state, action: PayloadAction<UpdateCategoryType>) => {
    //   const category = state.category.map((category) => {
    //     if (category.id === action.payload.id) {
    //       return { ...category, ...action.payload.update }
    //     }
    //     return category
    //   })
    //   return {
    //     ...state,
    //     category,
    //   }
    // },
    // deleteCategory: (state, action) => {
    //   state.category = []
    // },
    sortCategory: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.category.sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        )
      } else {
        state.category.sort((a, b) =>
          a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        )
      }
    },
  },

  extraReducers: (build) => {
    build
      .addCase(fetchCategoryData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCategoryData.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.category = action.payload
        }
        state.loading = false
      })
      .addCase(fetchCategoryData.rejected, (state) => {
        state.error = "Cannot Fetch Data"
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.category.push(action.payload)
        }
        state.loading = false
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          const updatedItem = action.payload
          const categoryUpdate = state.category.map((item) => {
            if (item.id === updatedItem.id) {
              return { ...item, ...updatedItem }
            }
            return item
          })
          return {
            ...state,
            categoryUpdate,
          }
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          const deleteId = action.payload
          const newCategoryList = state.category.filter(
            (item) => item.id !== deleteId
          )
          state.category = newCategoryList
        }
      })
  },
})

const categoryReducer = categorySlice.reducer
export const { sortCategory } = categorySlice.actions

export default categoryReducer
