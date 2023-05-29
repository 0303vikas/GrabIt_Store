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
import { AddShoppingCart, Settings } from "@mui/icons-material"
import { ProductType } from "../types/Product"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { addToCart } from "../redux/reducers/cartReducer"
import { ImageChangeButtons } from "./ImageChangeButtons"
import { useNavigate } from "react-router-dom"

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
  const navigate = useNavigate()
  const {currentUser} = useAppSelector(state => state.user)

  return (
    <DisplayCard
      key={item.id}
      style={{ position: "relative" }}
      id="dispalyCard"
    >
      <CardActionArea
        id="displayCard--action"
        sx={{ ":hover": { transform: "roateY(180deg)" }, height: "70%" }}
        // onClick={() => navigation(`/category/${item.id}/products`)}
      >
        <CardContent id="displayCard--action" sx={{ padding: "0px" }}>
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

      <CardActions sx={{ bottom: "0px", minHeight: "30%" }}>
        <IconButton
          aria-label="add to favorites"
          onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
          color={cart.some((pro) => pro.id === item.id) ? "success" : "info"}
        >
          <AddShoppingCart />
        </IconButton>
        {currentUser?(currentUser.role==='admin'?(<IconButton
          aria-label="Edit Product"
          onClick={() => navigate(`/product/edit/${item.id}`)}
          >
              <Settings color="info" />
        </IconButton>) : null): null 
        }
        
        <ImageChangeButtons
          imagesNo={imagesNo}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
        />
      </CardActions>
    </DisplayCard>
  )
}
