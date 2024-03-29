/**
 * @file Product
 * @description product display component
 * @Author Vikas Singh
 */
import React, { useEffect, useState } from "react"
import {
  Pagination,
  IconButton,
  useTheme,
  Box,
  CircularProgress,
} from "@mui/material"
import { useParams } from "react-router-dom"
import { SortByAlphaOutlined } from "@mui/icons-material"

import { useAppSelector } from "../hooks/useAppSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { filterProduct } from "../hooks/filterProduct"
import { ascDescFunction } from "../hooks/sortProduct"
import { Card } from "./Card"
import ContainerProductCategory, { DisplayGrid } from "../themes/categoryTheme"
import { ProductType } from "../types/Product"
import "../style.css"
import { fetchProductData } from "../redux/reducers/productReducer"

/**
 * @description Product Component with 9 products displayed each page
 * @returns JSX.Element Product component
 * @notes
 * - filter product hook filters the product for sorting and price filter
 */
const Product = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const theme = useTheme()
  const { products, error, loading } = useAppSelector((state) => state.product)
  const dispatch = useAppDispatch()
  const [filterPrice, setfilterPrice] = useState(100)
  const { id } = useParams()
  const [sort, setSort] = useState("asc")

  useEffect(() => {
    dispatch(fetchProductData())
  }, [])

  let filterList: {
    filterItem: ProductType[]
    minValueRange: number
    maxValueRange: number
  } = filterProduct(products, "id", id)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value)
  }

  const paginationHandler = Math.ceil(
    filterList.filterItem.filter(
      (item) =>
        item.price > filterList.minValueRange && item.price < filterPrice
    ).length / 9
  )

  if (loading)
    return (
      <Box sx={{ marginLeft: "50%" }}>
        <h1 style={{ color: theme.palette.info.main }}>Loading</h1>
        <CircularProgress style={{ color: theme.palette.info.main }} />
      </Box>
    )

  if (error) return <p>{error}</p>

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
          P
        </span>
        roducts
      </h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{ display: "flex", flexDirection: "column", margin: "10px" }}
        >
          <IconButton
            onClick={() => ascDescFunction(dispatch, sort, setSort)}
            className="productCategory--container--sortBtn"
          >
            <SortByAlphaOutlined
              style={{
                color:
                  theme.palette.mode === "light"
                    ? theme.palette.primary.dark
                    : theme.palette.secondary.main,
              }}
              titleAccess="Sort Ascending and Descending"
            />
          </IconButton>
        </div>
        <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
          <input
            type="range"
            min={filterList.minValueRange}
            // step="5"
            max={filterList.maxValueRange}
            onChange={(e) => setfilterPrice(Number(e.target.value))}
            title="Set price Range"
          />
          <p
            style={{
              color:
                theme.palette.mode === "light"
                  ? theme.palette.primary.dark
                  : theme.palette.secondary.main,
            }}
          >
            € {filterPrice}
          </p>
        </div>
      </div>

      <DisplayGrid gap={2} gridTemplateColumns={"repeat(3,1fr)"}>
        {filterList.filterItem &&
          filterList.filterItem
            .filter(
              (item) =>
                item.price >= filterList.minValueRange &&
                item.price <= filterPrice
            )
            .slice(currentPage * 9 - 9, currentPage * 9)
            .map((item, index) => (
              <Card key={item.id} item={item} imagesNo={item.images.length} />
            ))}
      </DisplayGrid>
      <Pagination
        count={paginationHandler}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
        sx={{
          padding: "3rem 0rem",
          "& .MuiPaginationItem-root": {
            color: theme.palette.common.black,
          },
        }}
      />
    </ContainerProductCategory>
  )
}

export default Product
