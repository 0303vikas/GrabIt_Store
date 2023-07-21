import { useState } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { imageUpload } from "../redux/reducers/image/imageUpload"
import { AxiosError } from "axios"
import { Button, useTheme } from "@mui/material"

interface ImageUploadType {
  file: FileList
}

const UploadImageForm = ({
  addImage,
}: {
  addImage: (newImageData: string) => void
}) => {
  const [newImageData, setNewImageData] = useState("")
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
    register,
  } = useForm<ImageUploadType>()

  const uploadImage: SubmitHandler<ImageUploadType> = (data, e) => {
    e?.preventDefault()

    if (
      !data.file[0] ||
      !data.file[0].type ||
      data.file[0].type.indexOf("image") === -1
    ) {
      setError("file", {
        type: "manual",
        message: "Selected file is not an image",
      })
      return
    }

    const imgFormData = new FormData()
    imgFormData.append("file", data.file[0], data.file[0].name)

    dispatch(imageUpload(imgFormData))
      .then((data) => {
        setNewImageData(data.payload)
        alert("Image Uploaded Successfully. Can be added to image List.")
      })
      .catch((e) => {
        const error = e as AxiosError
        if (error.response) {
          setError("file", {
            type: "manual",
            message: JSON.stringify(error.response.data),
          })
          return
        }
        setError("file", {
          type: "manual",
          message: error.message,
        })
        return
      })
    return
  }

  return (
    <form onSubmit={handleSubmit(uploadImage)}>
      <Controller
        name="file"
        control={control}
        rules={{ required: "Image is required" }}
        render={({ field }) => (
          <>
            <input
              type="file"
              accept="image/*"
              {...register("file")}
              name="file"
              required
              placeholder="Upload Image"
              style={{ width: "14rem" }}
            />
            {errors.file && (
              <p
                style={{
                  color: theme.palette.error.main,
                  fontSize: theme.typography.fontSize,
                  margin: "0",
                }}
              >
                *{errors.file.message}
              </p>
            )}
          </>
        )}
      />
      <Button variant="contained" type="submit" color="secondary">
        Upload
      </Button>
      <Button
        variant="contained"
        type="button"
        onClick={() => addImage(newImageData)}
      >
        Add
      </Button>
    </form>
  )
}

export default UploadImageForm
