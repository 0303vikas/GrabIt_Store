/**
 * @file DisplayData
 * @description DisplayArea for all the breweries on the home page + pagination handling function
 * @Author Vikas Singh
 * @note
 * - Adding image option not added yet
 */
import React, { useState } from "react"
import {
  CardMedia,
  useTheme,
  Button,
  TextField,
  MenuItem,
  Box,
  IconButton,
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
import { deleteProduct, updateProduct } from "../redux/reducers/productReducer"
import { Delete } from "@mui/icons-material"

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
  const [currentCategory, setCurrentCategory] = useState(product.category?.name)
  const [images, setImages] = useState(product.images)
  const [currentImage, setCurrentImage] = useState(1)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { category } = useAppSelector((store) => store.categories)

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
    if (loading) return <div>loading...</div>
    if (error) return <div>{error}</div>
    alert("Product Updated")
    navigate("/")
  }

  const handleImageRemov = (item: string) => {
    console.log(item)
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

  console.log(currentImage)

  return (
    <DisplayCardHorizontal>
      <aside>
        <CardMedia
          component="img"
          height="300"
          image={images[currentImage]}
          alt={product.title + " image."}
        />

        {images && (
          <ImageChangeButtons
            imagesNo={images.length}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
          />
        )}
        {images.length > 1 && (
          <IconButton
            onClick={() => handleImageRemov(images[currentImage - 1])}
          >
            <Delete color="error" />
          </IconButton>
        )}
      </aside>

      <HorizontalCardBox>
        <div style={{ display: "grid" }} id="update-Form">
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
          <TextField
            id="update-Form--Category"
            select
            label="Categories"
            defaultValue={currentCategory}
            onChange={(e) => setCurrentCategory(e.target.value)}
          >
            {category &&
              category.map((item) => (
                <MenuItem value={item.name} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
          </TextField>

          {/* <TextField
            id="update-Form--Category"
            select
            label="Categories"
            defaultValue={currentImage}
            onChange={(e) => setCurrentImage(e.target.value)}
          >
            {images.length >0 &&
              images.map((item) => (
                <Box key={item}>
                  {item}{" "}
                  <Button onClick={() => handleImageRemov(item)}>X</Button>
                </Box>
              ))}
          </TextField> */}
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
