import { configureStore } from "@reduxjs/toolkit"

import productReducer from "./reducers/productReducer"
import categoryReducer from "./reducers/categoryReducer"
import cartReducer from "./reducers/cartReducer"
import userReducer from "./reducers/userReducer"

const storedCart = localStorage.getItem('ProductCart')
const cartData= storedCart !==null?JSON.parse(storedCart): []

const store = configureStore({
  reducer: {
    product: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
    user: userReducer,
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
      rootUser: [
        {
          id: 182828373,
          name: "testroot",
          role: "root",
          email: "root@email.com",
          password: "root",
          avatar: "",
        },
        {
          id: 182828374,
          name: "testadmin",
          role: "admin",
          email: "testadmin@email.com",
          password: "testadmin",
          avatar: "",
        },
        {
          id: 182828375,
          name: "testcustomer",
          role: "customer",
          email: "testcustomer@email.com",
          password: "testcustomer",
          avatar: "",
        },
      ],
    }

  }
})

store.subscribe(() => {
  localStorage.setItem("ProductCart", JSON.stringify(store.getState().cart))
})

export type GlobalStoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
