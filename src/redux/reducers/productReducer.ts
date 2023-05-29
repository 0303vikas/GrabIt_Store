import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

import { ProductType } from "../../types/Product"
import { NewProductType } from "../../types/NewProduct"
import { UpdateProductType } from "../../types/UpdateProduct"
import { FilterProductType } from "../../types/FilterProduct"

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

export const fetchProductData = createAsyncThunk(
  "getProduct",
  async (params) => {
    try {
      const request = await axios.get<ProductType[]>(
        "https://api.escuelajs.co/api/v1/products"
      )
      return request.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

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
      if (error.response) {
        return JSON.stringify(error.response.data)
      }
      return error.message
    }
  }
)

// Filter product reducer
export const filterProduct = createAsyncThunk(
  "filterProduct",
  async (product: FilterProductType) => {
    try {
      let request
      if (product.title) {
        console.log(product.title)
        request = await axios.get<ProductType[]>(
          `https://api.escuelajs.co/api/v1/products/?title=${product.title}`
        )
      } else if (product.price) {
        request = await axios.get<ProductType[]>(
          `https://api.escuelajs.co/api/v1/products/?price=${product.price}`
        )
      } else if (product.categoryId) {
        request = await axios.get<ProductType[]>(
          `https://api.escuelajs.co/api/v1/products/?categoryId=${product.categoryId}`
        )
      } else {
        request = await axios.get<ProductType[]>(
          `https://api.escuelajs.co/api/v1/products/?price_min=${
            product.range?.price_min || 1
          }&price_max=${product.range?.price_max || 10000}`
        )
      }
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
      const request = await axios.put<ProductType>(
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
      console.log(e)
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
    // getAll: (state, action) => {
    //   state.products
    // },
    // updateOne: (state, action) => {},
    clearProductStore: (state) => {
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
      .addCase(createProduct.pending, (state, actioin) => {
        state.loading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload
        } else {
          state.products.push(action.payload)
        }
        state.loading = false
      })
      .addCase(updateProduct.pending, (state, actioin) => {
        state.loading = true
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
      .addCase(filterProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(filterProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.products = action.payload
        }
        state.loading = false
      })
      .addCase(filterProduct.rejected, (state, action) => {
        state.error = "Cannot fetch data"
      })
  },
})

const productReducer = productSlice.reducer
export const { clearProductStore, sortAsc } = productSlice.actions

export default productReducer
