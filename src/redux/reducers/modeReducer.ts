import { createSlice } from "@reduxjs/toolkit"

const initialState: {
  mode: "light" | "dark"
} = { mode: "light" }

const modeSlice = createSlice({
  name: "ThemeMode",
  initialState,
  reducers: {
    getMode: (state) => {
      return state
    },
    changeMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"
    },
  },
})

export const { getMode, changeMode } = modeSlice.actions
export default modeSlice.reducer
