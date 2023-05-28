import { useState } from "react"
import {
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  CardActions,
  useTheme,
} from "@mui/material"

import { DisplayCard } from "../themes/categoryTheme"
import {
  AddShoppingCart,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material"
import { ProductType } from "../types/Product"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { addToCart } from "../redux/reducers/cartReducer"

export const Card = ({
  item,
  imagesNo,
}: {
  item: ProductType
  imagesNo: number
}) => {
  const theme = useTheme()
  const cart = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const [currentImage, setCurrentImage] = useState(1)

  const moveImageRight = () =>
    currentImage > 1 ? setCurrentImage(currentImage - 1) : null
  const moveImageLeft = () =>
    currentImage < imagesNo ? setCurrentImage(currentImage + 1) : null

 

  return (
    <DisplayCard
      key={item.id}
      style={{ position: "relative" }}
      id="dispalyCard"
    >
      <CardActionArea
        id="displayCard--action"
        sx={{ ":hover": { transform: "roateY(180deg)" }, height: '70%' }}
        // onClick={() => navigation(`/category/${item.id}/products`)}
      >
        <CardContent
          id="displayCard--action"
          sx={{ padding: "0px" }}
        >
          <CardMedia
            component="img"
            height="140"
            image={item.images[currentImage]}
            alt={item.title + " image."}
          />
        </CardContent>
        <CardContent>
          <Typography gutterBottom sx={theme.typography.h6}>
            {item.title}
          </Typography>
          <Typography variant="body2">{item.description}</Typography>
          <Typography sx={theme.typography.body1}>
            Price: - € {item.price}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ bottom: "0px", minHeight: '30%' }}>
        <IconButton
          aria-label="add to favorites"
          onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
          color={cart.some((pro) => pro.id === item.id) ? "success" : "info"}
        >
          <AddShoppingCart />
        </IconButton>
        {imagesNo > 1 && (
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "normal",
              width: "inherit",
            }}
          >
            <IconButton
              onClick={moveImageRight}
              style={
                currentImage === 1
                  ? { cursor: "not-allowed", opacity: "0.4" }
                  : {}
              }
            >
              <ArrowBackIos />
            </IconButton>
            <div style={{ paddingTop: "0.7rem" }}>Change Image</div>
            <IconButton
              onClick={moveImageLeft}
              style={
                currentImage === imagesNo
                  ? { cursor: "not-allowed", opacity: "0.4" }
                  : {}
              }
            >
              <ArrowForwardIos />
            </IconButton>
          </Typography>
        )}
      </CardActions>
    </DisplayCard>
  )
}
