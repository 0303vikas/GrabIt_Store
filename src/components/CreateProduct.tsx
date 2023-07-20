/**
 * @file CreateProduct
 * @description Component for creating new product
 * @Author Vikas Singh
 * @notes
 *  - photo button not created yet
 */
import { useEffect, useState } from "react"
import { useTheme, Button, TextField, MenuItem } from "@mui/material"
import { useNavigate } from "react-router-dom"

import ContainerProductCategory, { DisplayGrid } from "../themes/categoryTheme"
import { useAppSelector } from "../hooks/useAppSelector"
import {
  DisplayCardHorizontal,
  HorizontalCardBox,
  HorizontalCardMedia,
} from "../themes/horizontalCardTheme"
import { ImageChangeButtons } from "./ImageChangeButtons"
import { ProductType } from "../types/Product"
import { useAppDispatch } from "../hooks/useAppDispatch"
import {
  createProduct,
  deleteProduct,
  fetchProductData,
  updateProduct,
} from "../redux/reducers/productReducer"
import { CategoryType } from "../types/Category"
import { NewProductType } from "../types/NewProduct"
import { fetchCategoryData } from "../redux/reducers/categoryReducer"

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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { category, loading, error } = useAppSelector(
    (store) => store.categories
  )

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
      images: ["https://picsum.photos/640/640?r=101"],
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

  return (
    <ContainerProductCategory
      id="product--container"
      className="productCategory--container"
    >
      <h1
        id="page-heading"
        style={{
          ...theme.typography.h2,
          textTransform: "uppercase",
          fontSize: "4rem",
        }}
      >
        <span id="page-heading--firstLetter" style={{ fontSize: "100px" }}>
          C
        </span>
        reate
      </h1>

      <DisplayGrid gap={2} gridTemplateColumns={"repeat(1,1fr)"}>
        <DisplayCardHorizontal>
          <aside id="image-handling">Images</aside>

          <HorizontalCardBox>
            <div style={{ display: "grid" }} id="update-Form">
              <TextField
                id="update-Form--Text"
                label="Title"
                variant="filled"
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                id="update-Form--Price"
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
                id="update-Form--Description"
                label="Description"
                variant="filled"
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                id="update-Form--Category"
                select
                label="Categories"
                onChange={(e) => setCurrentCategory(e.target.value)}
              >
                {category &&
                  category.map((item) => (
                    <MenuItem value={item.name} key={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </TextField>
            </div>
            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={createHandler}
              >
                Create
              </Button>
            </div>
          </HorizontalCardBox>
        </DisplayCardHorizontal>
      </DisplayGrid>
    </ContainerProductCategory>
  )
}
