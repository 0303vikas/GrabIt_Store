import { useEffect, useState } from "react"
import { Button, CardMedia, TextField, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"

import { DisplayGrid } from "../themes/categoryTheme"
import {
  DisplayCardHorizontal,
  HorizontalCardBox,
} from "../themes/horizontalCardTheme"
import UploadImageForm from "./UploadImageForm"
import { NewCategoryType } from "../types/NewCategory"
import { useAppDispatch } from "../hooks/useAppDispatch"
import {
  createCategory,
  fetchCategoryData,
} from "../redux/reducers/categoryReducer"
import { useAppSelector } from "../hooks/useAppSelector"

const CreateCategory = () => {
  const theme = useTheme()
  const [image, setImage] = useState(
    "https://slp-statics.astockcdn.net/static_assets/staging/23summer/home/EMEA/curated-collections/card-1.jpg?width=580&format=webp"
  )
  const [name, setName] = useState("")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { category, error } = useAppSelector((store) => store.categories)

  useEffect(() => {
    dispatch(fetchCategoryData())
  }, [])

  const createHandler = () => {
    if (category.find((item) => item.name === name)) {
      alert("Category with the name already belongs to db.")

      return
    }

    const newCategory: NewCategoryType = {
      name: name,
      image: image,
    }

    dispatch(createCategory(newCategory)).then(() => {
      if (error) {
        return false
      } else {
        alert("Category created.")
        navigate("/")
      }
    })
  }

  const addImage = (arg: string) => {
    setImage(arg)
    alert("Image added Successfully.")
  }
  return (
    <DisplayGrid gap={2} gridTemplateColumns={"repeat(1,1fr)"}>
      <DisplayCardHorizontal>
        <aside id="image-handling">
          <CardMedia
            component="img"
            height="400"
            image={image ? image : ""}
            alt={name ? name + " image." : "Category Image."}
            sx={{
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }}
          />
        </aside>

        <HorizontalCardBox>
          <div style={{ display: "grid", rowGap: "2rem" }} id="create-Form">
            <TextField
              id="create-Form--Text"
              label="Title"
              variant="filled"
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              id="create-Form--Image"
              label="Images"
              value={image ? image : ""}
              onChange={(e) => setImage(e.target.value)}
            />

            <UploadImageForm addImage={addImage} />
          </div>
          <div style={{ display: "flex" }}>
            <Button variant="contained" color="primary" onClick={createHandler}>
              Create
            </Button>
          </div>
        </HorizontalCardBox>
      </DisplayCardHorizontal>
    </DisplayGrid>
  )
}

export default CreateCategory
