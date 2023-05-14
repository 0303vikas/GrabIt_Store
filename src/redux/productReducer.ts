import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

import { ProductType } from "../types/Product"

const initilState: {
  products: ProductType[]
  loading: boolean
  error: string
} = {
  products: [],
  loading: false,
  error: "",
}

// {
//     id: 0,
//     title: "",
//     price: 0,
//     description: "",
//     category: 0,
//     images: []
// }
export const fetchProductData = createAsyncThunk("getProduct", async () => {
  try {
    const request = await axios.get<ProductType[]>(
      "https://api.escuelajs.co/api/v1/products"
    )
    return request.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
})

const productSlice = createSlice({
  name: "product",
  initialState: initilState,
  reducers: {
    createProductReducer: (state, action) => {},
    updateProductReducer: (state, action) => {},
    deleteProductReducer: (state) => {
      state.products = []
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchProductData.pending, (state) => {
      state.loading = true
    })
    build.addCase(fetchProductData.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message
      } else {
        state.products = action.payload
      }
      state.loading = false
    })
    build.addCase(fetchProductData.rejected, (state, action) => {
      state.error = "Cannot fetch data"
    })
  },
})

const productReducer = productSlice.reducer
export const {
  createProductReducer,
  updateProductReducer,
  deleteProductReducer,
} = productSlice.actions

export default productReducer
