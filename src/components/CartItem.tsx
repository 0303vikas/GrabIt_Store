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
        height="150"
        image={item.images[1]}
        alt={item.title + "image."}
      />
      <HorizontalCardBox>
        <Box>
          <Box sx={{ ...theme.typography.h2 }}>{item.title}</Box>
          <Box sx={{ ...theme.typography.body1 }}>{item.description}</Box>
          <Box sx={{ display: "flex" }}>
            <Button onClick={() => setNumberOfItem(numberOfItem + 1)}>+</Button>
            <div>{numberOfItem}</div>
            <Button
              onClick={() =>
                numberOfItem === 1 ? null : setNumberOfItem(numberOfItem - 1)
              }
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
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </Button>
        </Box>
      </HorizontalCardBox>
    </DisplayCardHorizontal>
  )
}

export default CartItem
