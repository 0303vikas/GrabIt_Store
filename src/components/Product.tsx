import React, { useState } from "react"
import {
  CardActionArea,
  CardMedia,
  Pagination,
  useTheme,
  Typography,
  CardContent,
  IconButton,
  CardActions,
} from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { Favorite } from "@mui/icons-material"

import { useAppSelector } from "../hooks/useAppSelector"

import ContainerProductCategory, {
  DisplayCard,
  DisplayGrid,
  DisplayGridContainer,
  DisplayImage,
} from "../themes/categoryTheme"
import { ProductType } from "../types/Product"

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
        {slicedArray.length > 0
          ? slicedArray.map((item, index) => {
              return (
                <DisplayCard key={item.id}>
                  <CardActionArea
                  // onClick={() => navigation(`/category/${item.id}/products`)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.images[1]}
                      alt={item.title + " image."}
                    />
                    <CardContent>
                      <Typography>{item.title}</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <IconButton aria-label="add to favorites">
                      <Favorite />
                    </IconButton>
                  </CardActions>
                </DisplayCard>
              )
            })
          : filterList.slice(0, 8).map((item, index) => {
              return (
                <DisplayCard key={item.id}>
                  <CardActionArea
                  // onClick={() => navigation(`/category/${item.id}/products`)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.images[1]}
                      alt={item.title + " image."}
                    />
                    <CardContent>
                      <Typography>{item.title}</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <IconButton aria-label="add to favorites">
                      <Favorite />
                    </IconButton>
                  </CardActions>
                </DisplayCard>
              )
            })}
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
