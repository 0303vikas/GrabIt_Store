/**
 * @file CartItem
 * @description Cart item display card
 * @Author Vikas Singh
 */
import { useState } from "react"
import { Box, CardMedia, useTheme, Button } from "@mui/material"

import { removeFromCart, updateCart } from "../redux/reducers/cartReducer"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { CartType } from "../types/CartType"
import {
  DisplayCardHorizontal,
  HorizontalCardBox,
} from "../themes/horizontalCardTheme"

/**
 * @description: displays card Cart
 * @param item: @type CartType
 * @returns JSX.Element
 */
const CartItem = ({ item }: { item: CartType }) => {
  const [numberOfItem, setNumberOfItem] = useState(item.quantity)
  const theme = useTheme()
  const dispatch = useAppDispatch()

  return (
    <DisplayCardHorizontal>
      <CardMedia
        component="img"
        style={{ height: "33vh", width: "20vw" }}
        image={item.images[1]}
        alt={item.title + "image."}
      />
      <HorizontalCardBox sx={{ paddingLeft: "2rem" }}>
        <Box>
          <Box sx={{ ...theme.typography.h2 }}>{item.title}</Box>
          <Box sx={{ ...theme.typography.body1 }}>{item.description}</Box>
          <Box sx={{ display: "flex", padding: "2rem 0" }}>
            <Button
              onClick={() => setNumberOfItem(numberOfItem + 1)}
              title="Increase quantity"
              style={{ border: "1px solid black" }}
            >
              +
            </Button>
            <div
              style={{
                borderBottom: "1px solid black",
                padding: "0.5rem 2rem 0 2rem",
                margin: "0 1rem",
                fontSize: "1.5rem",
              }}
            >
              {numberOfItem}
            </div>
            <Button
              onClick={() =>
                numberOfItem === 1 ? null : setNumberOfItem(numberOfItem - 1)
              }
              style={{
                border: "1px solid black",
              }}
              title="Reduce quantity"
            >
              -
            </Button>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              dispatch(updateCart({ id: item.id, quantity: numberOfItem }))
            }
            title="Update Cart Product"
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => dispatch(removeFromCart(item.id))}
            title="Remove From Cart"
          >
            Remove
          </Button>
        </Box>
      </HorizontalCardBox>
    </DisplayCardHorizontal>
  )
}

export default CartItem
