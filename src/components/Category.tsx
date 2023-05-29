import React, { useState } from "react"
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material"
import { useNavigate } from "react-router-dom"

import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { sortCategory } from "../redux/reducers/categoryReducer"
import ContainerProductCategory, {
  DisplayGrid,
  DisplayCard,
} from "../themes/categoryTheme"
import { CategoryType } from "../types/Category"

const Category = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
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
        ategories
      </h1>
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
        sx={{ padding: "3rem 0rem" }}
      />
    </ContainerProductCategory>
  )
}

export default Category
