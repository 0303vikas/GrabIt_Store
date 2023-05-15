import { createSlice } from "@reduxjs/toolkit"

const initialState = "string"

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
})

const cartReducer = cartSlice.reducer
export const {} = cartSlice.actions
export default cartReducer
