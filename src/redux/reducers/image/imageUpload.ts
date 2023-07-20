import { createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

export const imageUpload = createAsyncThunk(
  "ImageUpload",
  async (file: FormData) => {
    try {
      const request = await axios.post(
        "https://api.escuelajs.co/api/v1/files/upload",
        file,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      return request.data.location
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)
