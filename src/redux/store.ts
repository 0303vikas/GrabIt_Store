import { configureStore } from "@reduxjs/toolkit"

import productReducer from "./reducers/productReducer"
import categoryReducer from "./reducers/categoryReducer"
import cartReducer from "./reducers/cartReducer"
import userReducer from "./reducers/userReducer"

const store = configureStore({
  reducer: {
    product: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
    user: userReducer,
  },
})

export type GlobalStoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
