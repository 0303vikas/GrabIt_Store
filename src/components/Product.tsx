import React, { useEffect, useState } from "react"
import {
  CardActionArea,
  CardMedia,
  Pagination, 
  Typography,
  CardContent,
  IconButton,
  CardActions,
  Button,
} from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { AddShoppingCart, ArrowBackIos, ArrowForwardIos} from "@mui/icons-material"

import { useAppSelector } from "../hooks/useAppSelector"
import ContainerProductCategory, {
 
  DisplayGrid,  
} from "../themes/categoryTheme"
import { ProductType } from "../types/Product"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { addToCart } from "../redux/reducers/cartReducer"
import { fetchProductData } from "../redux/reducers/productReducer"
import { Card } from "./Card"

function filterProduct(
  products: ProductType[],
  type?: string,
  id?: string
): ProductType[] {
  if (id) return products.filter((item) => item.category.id === Number(id))
  return products
}

const Product = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { products, error, loading } = useAppSelector((state) => state.product)
  const cart = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const { id } = useParams()
  let filterList: ProductType[] = filterProduct(products, "id", id)
  const navigation = useNavigate()
  const [slicedArray, setSlicedArray] = useState<ProductType[]>(
    filterList.slice(0, 8)
  )


  

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value)
    setSlicedArray(filterList.slice((value - 1) * 8, value * 8))
  }

  //   const filterData = (sortType: "asc" | "desc") => {
  //     dispatch(sortCategory(sortType))
  //   }
  if (loading) return <p>Loading...</p>

  if (error) return <p>{error}</p>

  return (
    <ContainerProductCategory
      id="product--container"
      className="productCategory--container"
    >
      <DisplayGrid gap={1} gridTemplateColumns={"repeat(4,1fr)"}>
        {(slicedArray.length > 0
          ? slicedArray: filterList.slice(0, 8)).map((item, index) => <Card key={item.id} item={item} imagesNo={item.images.length}/>)
          }
      </DisplayGrid>
      <Pagination
        count={Math.ceil(filterList.length / 8)}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
      />

      {/* <button onClick={() => filterData("asc")}>Sort Asc</button>

      <button onClick={() => filterData("desc")}>Sort Desc</button> */}

      {/* {filterCategory
        ? filterCategory.map((item, index) => {
            return <p key={item.id}>{item.name}</p>
          })
        : null} */}
    </ContainerProductCategory>
  )
}

export default Product
