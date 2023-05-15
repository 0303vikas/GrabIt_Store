import { configureStore } from "@reduxjs/toolkit"

import productReducer from "./productReducer"
import categoryReducer from "./categoryReducer"
import cartReducer from "./cartReducer"

const store = configureStore({
  reducer: {
    product: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
  },
})

export type GlobalStoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
