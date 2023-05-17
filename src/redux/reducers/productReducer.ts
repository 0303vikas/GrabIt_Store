import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

import { ProductType } from "../../types/Product"
import { NewProductType } from "../../types/NewProduct"
import { UpdateProductType } from "../../types/UpdateProduct"

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

export const createProduct = createAsyncThunk(
  "createProduct",
  async (product: NewProductType) => {
    try {
      const request = await axios.post<ProductType>(
        "https://api.escuelajs.co/api/v1/products/",
        product
      )
      return request.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (product: UpdateProductType) => {
    try {
      const request = await axios.post<ProductType>(
        `https://api.escuelajs.co/api/v1/products/${product.id}`,
        product.update
      )
      return request.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id: number) => {
    try {
      const request = await axios.delete<boolean>(
        `https://api.escuelajs.co/api/v1/products/${id}`
      )
      return id
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

// type CreateProductType = Omit<ProductType, "id">

const productSlice = createSlice({
  name: "product",
  initialState: initilState,
  reducers: {
    getAll: (state, action) => {
      state.products
    },

    updateOne: (state, action) => {},
    deleteAll: (state) => {
      return initilState
    },
    sortAsc: (state, action) => {
      if (action.payload === "asc") {
        state.products.sort((a, b) => a.title.localeCompare(b.title))
      } else {
        state.products.sort((a, b) => b.title.localeCompare(a.title))
      }
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.products = action.payload
        }
        state.loading = false
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.error = "Cannot fetch data"
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.products.push(action.payload)
        }
        state.loading = false
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          const newitem = action.payload
          const products = state.products.map((product) => {
            if (newitem.id === product.id) {
              return { ...product, ...newitem }
            }
            return product
          })
          return {
            ...state,
            products,
          }
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          const response = action.payload
          const updatedArray = state.products.filter(
            (item) => item.id !== response
          )
          state.products = updatedArray
        }
        state.loading = false
      })
  },
})

const productReducer = productSlice.reducer
export const { getAll, updateOne, deleteAll } = productSlice.actions

export default productReducer
