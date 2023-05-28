import React from "react"
import { useTheme } from "@mui/material"

import { useAppSelector } from "../hooks/useAppSelector"
import CartKingItem from "./CartItem"
import ContainerProductCategory, { DisplayGrid } from "../themes/categoryTheme"

const CartKing = () => {
  const cartState = useAppSelector((state) => state.cart)
  const theme = useTheme()

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
        art
      </h1>

      <DisplayGrid gap={2} gridTemplateColumns={"repeat(1,1fr)"}>
        {cartState.length ? (
          cartState.map((item) => <CartKingItem item={item} />)
        ) : (
          <div> No Item added to Cart</div>
        )}
      </DisplayGrid>
    </ContainerProductCategory>
  )
}



export default CartKing
