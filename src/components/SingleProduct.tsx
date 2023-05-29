import { useTheme } from "@mui/material"
import { useParams } from "react-router-dom"

import { useAppSelector } from "../hooks/useAppSelector"
import ContainerProductCategory, { DisplayGrid } from "../themes/categoryTheme"
import { Card } from "./Card"

export const SingleProduct = () => {
  const theme = useTheme()
  const { products, error, loading } = useAppSelector((state) => state.product)
  const { id } = useParams()

  const item = products.find((product) => product.id === Number(id))

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

      <DisplayGrid gap={2} gridTemplateColumns={"repeat(3,1fr)"}>
        {item && (
          <Card key={item.id} item={item} imagesNo={item.images.length} />
        )}
      </DisplayGrid>
    </ContainerProductCategory>
  )
}
