import React, { useState } from "react"
import {
  CardMedia,
  useTheme,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"

import { UpdateProductType } from "../types/UpdateProduct"
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
import { createProduct, deleteProduct, updateProduct } from "../redux/reducers/productReducer"
import { CategoryType } from "../types/Category"
import { NewProductType} from "../types/NewProduct"

export const CreateProduct = () => {
  const theme = useTheme()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [currentCategory, setCurrentCategory] = useState('')
  const [price, setPrice] = useState(0)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { category, loading, error } = useAppSelector((store) => store.categories)

  const findCategory = category.find((item) => item.name === currentCategory)

  const createHandler = () => {
    const newProduct: NewProductType = {      
        title: title || 'Without Title',
        price: price || 10,
        description: description || 'Description to be created',
        categoryId: findCategory? findCategory.id: 1,
        images: ['https://picsum.photos/640/640?r=101'],     
    }

    dispatch(createProduct(newProduct))

    if (loading) return<div>loading...</div>
    if (error) return <div>{error}</div>
    alert("Product created")
    navigate("/")
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
      <aside id="image-handling">
        Images
        
      </aside>

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
                     min: 1
                }
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
          <Button variant="contained" color="primary" onClick={createHandler}>
            Create
          </Button>          
        </div>
      </HorizontalCardBox>
    </DisplayCardHorizontal>
      </DisplayGrid>
    </ContainerProductCategory>
  )
}

// const DataCard = ({ product }: { product: ProductType }) => {
//   const [title, setTitle] = useState(product.title)
//   const [description, setDescription] = useState(product.description)
//   const [currentCategory, setCurrentCategory] = useState(product.category?.name)
//   const [images, setImages] = useState(product.images)
//   const [currentImage, setCurrentImage] = useState(1)
//   const theme = useTheme()
//   const dispatch = useAppDispatch()
//   const navigate = useNavigate()
//   const { category } = useAppSelector((store) => store.categories)

//   const updateHandler = () => {
//     const newProduct: UpdateProductType = {
//       id: product.id,
//       update: {
//         title: title,
//         description: description,
//         category: category.find((item) => item.name === currentCategory),
//         images: images,
//       },
//     }

//     dispatch(updateProduct(newProduct))
//     alert("Product Updated")
//     navigate("/")
//   }

//   const handleImageRemov = (item: string) => {
//     const newImageList = images.filter((img) => img !== item)
//     setImages(newImageList)
//   }

//   const handleProductDelete = (id: number) => {
//     alert("Delete Product?")
//     dispatch(deleteProduct(product.id))
//     setTimeout(() => {
//       setTimeout(() => navigate("/"))
//     }, 2000)
//   }

//   return (
//     <DisplayCardHorizontal>
//       <aside>
//         <CardMedia
//           component="img"
//           height="300"
//           image={images[currentImage]}
//           alt={product.title + " image."}
//         />
//         {images && (
//           <ImageChangeButtons
//             imagesNo={images.length}
//             currentImage={currentImage}
//             setCurrentImage={setCurrentImage}
//           />
//         )}
//       </aside>

//       <HorizontalCardBox>
//         <div style={{ display: "grid" }} id="update-Form">
//           <TextField
//             id="update-Form--Text"
//             label="Title"
//             variant="filled"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <TextField
//             id="update-Form--Description"
//             label="Description"
//             variant="filled"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <TextField
//             id="update-Form--Category"
//             select
//             label="Categories"
//             defaultValue={currentCategory}
//             onChange={(e) => setCurrentCategory(e.target.value)}
//           >
//             {category &&
//               category.map((item) => (
//                 <MenuItem value={item.name} key={item.id}>
//                   {item.name}
//                 </MenuItem>
//               ))}
//           </TextField>
//           {images.map((item) => (
//             <Box key={item}>
//               {item} <Button onClick={() => handleImageRemov(item)}>X</Button>
//             </Box>
//           ))}
//         </div>
//         <div style={{ display: "flex" }}>
//           <Button variant="contained" color="primary" onClick={updateHandler}>
//             Update
//           </Button>
//           <Button
//             variant="contained"
//             color="error"
//             onClick={() => handleProductDelete(product.id)}
//           >
//             Delete
//           </Button>
//         </div>
//       </HorizontalCardBox>
//     </DisplayCardHorizontal>
//   )
// }

// title: string
//   price: number
//   description: string
//   category: CategoryType
//   images: string[]
