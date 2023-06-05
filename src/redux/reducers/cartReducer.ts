import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { CartType } from "../../types/CartType"

const initialState: CartType[] = []

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartType>) => {
      if (!state.length) {
        return [action.payload]
      } else {
        const checkDuplicate = state.findIndex(
          (item) => item.id === action.payload.id
        )
        if (checkDuplicate === -1) {
          return [...state, action.payload]
        } else {
          state[checkDuplicate] = action.payload
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload)
    },
    updateCart: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity }
        }
        return item
      })
    },
    clearCart: (state) => {
      return initialState
    },
  },
})

const cartReducer = cartSlice.reducer
export const { addToCart, removeFromCart, updateCart, clearCart } =
  cartSlice.actions
export default cartReducer
