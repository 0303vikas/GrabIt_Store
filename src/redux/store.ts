import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./productReducer"

const store = configureStore({
  reducer: {
    product: productReducer,
  },
})

export type GlobalStoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
