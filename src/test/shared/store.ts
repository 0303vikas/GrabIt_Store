import { configureStore } from "@reduxjs/toolkit"

import productReducer from "../../redux/reducers/productReducer"
import categoryReducer from "../../redux/reducers/categoryReducer"
import cartReducer from "../../redux/reducers/cartReducer"
import userReducer from "../../redux/reducers/userReducer"

const store = configureStore({
  reducer: {
    product: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
    user: userReducer,
  },
})

export default store
