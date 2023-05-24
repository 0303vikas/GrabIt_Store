import React, { useState } from "react"
import { Pagination, useTheme } from "@mui/material"

import { useAppSelector } from "../hooks/useAppSelector"
import ContainerProductCategory, {
  DisplayGrid,
  DisplayGridContainer,
  DisplayImage,
} from "../themes/categoryTheme"
import { ProductType } from "../types/Product"
import { useParams } from "react-router-dom"

const ProductsOneCategory = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { products, error, loading } = useAppSelector((state) => state.product)
  const { id } = useParams()
  const filterdProducts = products.filter(
    (item) => item.category.id === Number(id)
  )
  const [slicedArray, setSlicedArray] = useState<ProductType[]>(
    filterdProducts.slice(0, 8)
  )

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value)
    setSlicedArray(filterdProducts.slice((value - 1) * 8, value * 8))
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
                <DisplayGridContainer key={item.id}>
                  <DisplayImage
                    src={item.images[1]}
                    alt={item.title + " image."}
                    // sx={{ height: "inherit", width: "inherit" }}
                  />
                  <p style={{ display: "inline-block" }}>{item.title}</p>
                </DisplayGridContainer>
              )
            })
          : filterdProducts.slice(0, 8).map((item, index) => {
              return (
                <DisplayGridContainer key={item.id}>
                  <DisplayImage
                    src={item.images[1]}
                    alt={item.title + " image."}
                    // sx={{ height: "inherit", width: "inherit" }}
                  />
                  <p style={{ display: "inline-block" }}>{item.title}</p>
                </DisplayGridContainer>
              )
            })}
      </DisplayGrid>
      <Pagination
        count={Math.ceil(filterdProducts.length / 8)}
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

export default ProductsOneCategory
