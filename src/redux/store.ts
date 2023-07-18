import { configureStore } from "@reduxjs/toolkit"

import productReducer from "./reducers/productReducer"
import categoryReducer from "./reducers/categoryReducer"
import cartReducer from "./reducers/cartReducer"
import userReducer from "./reducers/userReducer"
import modeReducer from "./reducers/modeReducer"

const storedCart = localStorage.getItem("ProductCart")
const cartData = storedCart !== null ? JSON.parse(storedCart) : []

const store = configureStore({
  reducer: {
    product: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
    user: userReducer,
    mode: modeReducer,
  },
  preloadedState: {
    product: {
      products: [],
      loading: false,
      error: "",
    },
    categories: {
      category: [],
      loading: false,
      error: "",
    },
    cart: cartData,
    user: {
      users: [],
      loading: false,
      error: "",
      authloading: true,
      registered: false,
    },
    mode: {
      mode: "light",
    },
  },
})

store.subscribe(() => {
  localStorage.setItem("ProductCart", JSON.stringify(store.getState().cart))
})

export type GlobalStoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
