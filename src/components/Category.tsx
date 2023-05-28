import React, { useEffect, useState } from "react"
import {
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material"
import { Favorite } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

import ContainerLoginRegister from "../themes/formTheme"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import {
  fetchCategoryData,
  sortCategory,
} from "../redux/reducers/categoryReducer"
import ContainerProductCategory, {
  DisplayGrid,
  
  DisplayCard,
} from "../themes/categoryTheme"
import { CategoryType } from "../types/Category"

const Category = () => {
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const navigation = useNavigate()
  const { category, error, loading } = useAppSelector(
    (state) => state.categories
  )
  const [slicedArray, setSlicedArray] = useState<CategoryType[]>(
    category.slice(0, 8)
  )



  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value)
    setSlicedArray(category.slice((value - 1) * 8, value * 8))
  }

  const filterData = (sortType: "asc" | "desc") => {
    dispatch(sortCategory(sortType))
  }

  if (loading) return <p>Loading...</p>

  if (error) return <p>{error}</p>

  return (
    <ContainerProductCategory
      id="category--container"
      className="productCategory--container"
    >
      <DisplayGrid gap={1} gridTemplateColumns={"repeat(4,1fr)"}>
        {slicedArray.length > 0
          ? slicedArray.map((item, index) => {
              return (
                <DisplayCard key={item.id}>
                  <CardActionArea
                    onClick={() => navigation(`/category/${item.id}/products`)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.name + " image."}
                    />
                    <CardContent>
                      <Typography>{item.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </DisplayCard>
              )
            })
          : category.slice(0, 8).map((item, index) => {
              return (
                <DisplayCard key={item.id}>
                  <CardActionArea
                    onClick={() => navigation(`/category/${item.id}/products`)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.name + " image."}
                    />
                    <CardContent>
                      <Typography>{item.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </DisplayCard>
              )
            })}
      </DisplayGrid>
      <Pagination
        count={Math.ceil(category.length / 8)}
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

export default Category
