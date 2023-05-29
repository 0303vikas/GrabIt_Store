import { Card, styled, Box, CardMedia } from "@mui/material"

const DisplayCardHorizontal = styled(Card)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignContent: "center",
}))

const HorizontalCardBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}))

const HorizontalCardMedia = styled(CardMedia)(({ theme }) => ({}))

export { DisplayCardHorizontal, HorizontalCardMedia, HorizontalCardBox }
