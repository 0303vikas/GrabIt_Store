/**
 * @file DisplayData
 * @description DisplayArea for all the breweries on the home page + pagination handling function
 * @Author Vikas Singh
 * @note
 * - Adding image option not added yet
 */
import React, { useEffect, useState } from "react"
import {
  CardMedia,
  useTheme,
  Button,
  TextField,
  MenuItem,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"

import { UpdateProductType } from "../types/UpdateProduct"
import ContainerProductCategory, { DisplayGrid } from "../themes/categoryTheme"
import { useAppSelector } from "../hooks/useAppSelector"
import {
  DisplayCardHorizontal,
  HorizontalCardBox,
} from "../themes/horizontalCardTheme"
import { ImageChangeButtons } from "./ImageChangeButtons"
import { ProductType } from "../types/Product"
import { useAppDispatch } from "../hooks/useAppDispatch"
import {
  deleteProduct,
  fetchProductData,
  updateProduct,
} from "../redux/reducers/productReducer"
import { Delete } from "@mui/icons-material"
import { fetchCategoryData } from "../redux/reducers/categoryReducer"

export const UpdateProduct = () => {
  const theme = useTheme()
  const { id } = useParams()
  const { products, loading, error } = useAppSelector((store) => store.product)

  const findProduct = products.find((item) => item.id === Number(id))
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
          U
        </span>
        pdate
      </h1>

      <DisplayGrid gap={2} gridTemplateColumns={"repeat(1,1fr)"}>
        {findProduct && (
          <UpdateCard product={findProduct} loading={loading} error={error} />
        )}
      </DisplayGrid>
    </ContainerProductCategory>
  )
}

const UpdateCard = ({
  product,
  loading,
  error,
}: {
  product: ProductType
  loading: boolean
  error: string
}) => {
  const [title, setTitle] = useState(product.title)
  const [description, setDescription] = useState(product.description)
  const [currentCategory, setCurrentCategory] = useState(product.category.name)
  const [images, setImages] = useState(product.images)
  const [currentImage, setCurrentImage] = useState("")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { category } = useAppSelector((store) => store.categories)
  const theme = useTheme()

  useEffect(() => {
    dispatch(fetchCategoryData())
  }, [])

  const updateHandler = () => {
    const newProduct: UpdateProductType = {
      id: product.id,
      update: {
        title: title,
        description: description,
        category: category.find((item) => item.name === currentCategory),
        images: images,
      },
    }

    dispatch(updateProduct(newProduct))
    if (loading)
      return (
        <Box sx={{ marginLeft: "50%" }}>
          <h1 style={{ color: theme.palette.info.main }}>Loading</h1>
          <CircularProgress style={{ color: theme.palette.info.main }} />
        </Box>
      )
    if (error) return <div>{error}</div>
    alert("Product Updated")
    navigate("/")
  }

  const handleImageRemov = (item: string) => {
    const newImageList = images.filter((img) => img !== item)
    console.log(newImageList)
    setImages(newImageList)
  }

  const handleProductDelete = (id: number) => {
    alert("Delete Product?")
    dispatch(deleteProduct(product.id))
    setTimeout(() => {
      setTimeout(() => navigate("/"))
    }, 2000)
  }

  return (
    <DisplayCardHorizontal
      sx={{ padding: "2rem", justifyContent: "flex-start" }}
    >
      <aside>
        <CardMedia
          component="img"
          height="400"
          image={currentImage}
          alt={product.title + " image."}
          sx={{
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          }}
        />
      </aside>

      <HorizontalCardBox>
        <div style={{ display: "grid", rowGap: "2rem" }} id="update-Form">
          <TextField
            id="update-Form--Text"
            label="Title"
            variant="filled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="update-Form--Description"
            label="Description"
            variant="filled"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {category.length && (
            <TextField
              id="update-Form--Category"
              select
              label="Categories"
              defaultValue={currentCategory}
              onChange={(e) => setCurrentCategory(e.target.value)}
            >
              {category.map((item) => (
                <MenuItem value={item.name} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            id="update-Form--Category"
            select
            label="Images"
            defaultValue={images?.[0]}
            onChange={(e) => setCurrentImage(e.target.value)}
          >
            {images &&
              images.map((item) => (
                <MenuItem value={item} key={item}>
                  {item}

                  <IconButton onClick={() => handleImageRemov(item)}>
                    <Delete color="error" />
                  </IconButton>
                </MenuItem>
              ))}
          </TextField>

          <TextField id="update-Form--Category" type="file"></TextField>
        </div>
        <div style={{ display: "flex" }}>
          <Button variant="contained" color="primary" onClick={updateHandler}>
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleProductDelete(product.id)}
          >
            Delete
          </Button>
        </div>
      </HorizontalCardBox>
    </DisplayCardHorizontal>
  )
}
