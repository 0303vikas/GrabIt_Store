/**
 * @file CreateProduct
 * @description Component for creating new product
 * @Author Vikas Singh
 * @notes
 *  - photo button not created yet
 */
import { useEffect, useState } from "react"
import {
  useTheme,
  Button,
  TextField,
  MenuItem,
  CardMedia,
  IconButton,
} from "@mui/material"
import { Delete } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

import { DisplayGrid } from "../themes/categoryTheme"
import { useAppSelector } from "../hooks/useAppSelector"
import {
  DisplayCardHorizontal,
  HorizontalCardBox,
} from "../themes/horizontalCardTheme"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { createProduct } from "../redux/reducers/productReducer"
import { NewProductType } from "../types/NewProduct"
import { fetchCategoryData } from "../redux/reducers/categoryReducer"
import UploadImageForm from "./UploadImageForm"

/**
 * @description Create Product page. After the product is created user is redirecd to login page
 * @returns JSX.Element
 */
export const CreateProduct = () => {
  const theme = useTheme()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [currentCategory, setCurrentCategory] = useState("")
  const [price, setPrice] = useState(0)
  const [images, setImages] = useState<string[]>([])
  const [currentImage, setCurrentImage] = useState(
    "https://slp-statics.astockcdn.net/static_assets/staging/23summer/home/EMEA/curated-collections/card-5.jpg?width=580&format=webp"
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { category } = useAppSelector((store) => store.categories)
  const { error } = useAppSelector((store) => store.product)

  useEffect(() => {
    dispatch(fetchCategoryData())
  }, [])

  const findCategory = category.find((item) => item.name === currentCategory)

  const createHandler = () => {
    const newProduct: NewProductType = {
      title: title || "Without Title",
      price: price || 10,
      description: description || "Description to be created",
      categoryId: findCategory ? findCategory.id : 1,
      images: images,
    }

    dispatch(createProduct(newProduct)).then(() => {
      if (error) {
        return false
      } else {
        alert("Product created")
        navigate("/")
      }
    })
  }

  const handleImageRemov = (item: string) => {
    setImages([...images.filter((url) => url !== item)])
  }

  const addImageToList = (arg: string) => {
    setImages([arg, ...images])
    alert("Image added Successfully.")
  }

  return (
    <DisplayGrid gap={2} gridTemplateColumns={"repeat(1,1fr)"}>
      <DisplayCardHorizontal>
        <aside id="image-handling">
          <CardMedia
            component="img"
            height="400"
            image={currentImage ? currentImage : images[0]}
            alt={title + " image."}
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
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="create-Form--Price"
              label="Price"
              type="number"
              variant="filled"
              InputProps={{
                inputProps: {
                  min: 1,
                },
              }}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <TextField
              id="create-Form--Description"
              label="Description"
              variant="filled"
              onChange={(e) => setDescription(e.target.value)}
            />
            {category.length && (
              <TextField
                id="create-Form--Category"
                select
                label="Categories"
                defaultValue=""
                value={currentCategory ? currentCategory : ""}
                onChange={(e) => setCurrentCategory(e.target.value)}
              >
                {category.map((item) => (
                  <MenuItem value={item.name} key={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
            {images && (
              <TextField
                id="create-Form--Category"
                select
                label="Images"
                defaultValue=""
                value={currentImage ? currentImage : ""}
                onChange={(e) => setCurrentImage(e.target.value)}
              >
                {images.map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}

                    <IconButton onClick={() => handleImageRemov(item)}>
                      <Delete color="error" />
                    </IconButton>
                  </MenuItem>
                ))}
              </TextField>
            )}
            <UploadImageForm addImage={addImageToList} />
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
