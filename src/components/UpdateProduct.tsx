/**
 * @file DisplayData
 * @description DisplayArea for all the breweries on the home page + pagination handling function
 * @Author Vikas Singh
 * @note
 * - Adding image option not added yet
 */
import { useEffect, useState } from "react"
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
import { AxiosError } from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Controller, useForm, SubmitHandler } from "react-hook-form"

import { UpdateProductType } from "../types/UpdateProduct"
import ContainerProductCategory, { DisplayGrid } from "../themes/categoryTheme"
import { useAppSelector } from "../hooks/useAppSelector"
import {
  DisplayCardHorizontal,
  HorizontalCardBox,
} from "../themes/horizontalCardTheme"
import { ProductType } from "../types/Product"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { deleteProduct, updateProduct } from "../redux/reducers/productReducer"
import { Delete } from "@mui/icons-material"
import { fetchCategoryData } from "../redux/reducers/categoryReducer"
import { imageUpload } from "../redux/reducers/image/imageUpload"

interface ImageUploadType {
  file: FileList
}

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
  const [newImageData, setNewImageData] = useState("")
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
    register,
  } = useForm<ImageUploadType>()

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

  const addImage = () => {
    console.log(newImageData)
    setImages([newImageData, ...images])
    setNewImageData("")
    alert("Image added Successfully.")
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

          {/* <TextField id="update-Form--Category" type="file"></TextField> */}
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
            <Button variant="contained" type="button" onClick={addImage}>
              Add
            </Button>
          </form>
        </div>
        <div style={{ display: "flex", marginTop: "1rem" }}>
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
