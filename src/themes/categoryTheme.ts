import { Card, Grid, alpha, styled } from "@mui/material"

import { borderAnimation } from "./formTheme"
import { Box } from "@mui/system"

const ContainerProductCategory = styled("section")(({ theme }) => ({
  background: alpha(theme.palette.common.black, 1),
  width: "98.7vw",
  height: "120vh",
  border: "0.3vh solid",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  borderImageSlice: "1",
  borderImageSource: `linear-gradient(90deg, ${alpha(
    theme.palette.secondary.main,
    1
  )} 50%, ${alpha(theme.palette.primary.main, 1)} 100%)`,
  animation: `${borderAnimation} 2s ease infinite`,
}))

const DisplayGrid = styled(Box)(({ theme }) => ({
  background: alpha(theme.palette.secondary.light, 0.5),
  width: "60vw",
  height: "80vh",
  boxShadow: ` inset 20px 0 80px ${theme.palette.secondary.dark},
   20px 20px 60px 10px ${alpha(theme.palette.primary.dark, 0.5)},
   -20px -20px 60px 10px ${alpha(theme.palette.primary.dark, 0.5)} `,
  border: "2px solid",
  borderColor: theme.palette.secondary.light,
  padding: "4rem",
  display: "grid",
  marginTop: "3rem",
}))

const DisplayGridContainer = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.black, 0.5),
  boxShadow: `inset  5px 0 30px ${theme.palette.common.black}`,
  backdropFilter: "blur(10px)",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    boxShadow: `5px 0 30px ${theme.palette.common.black}`,
  },
}))

const DisplayCard = styled(Card)(({ theme }) => ({
  maxWidth: "345",
}))

const DisplayImage = styled("img")(({ theme }) => ({
  width: "inherit",
  height: "16vh",
}))

export {
  ContainerProductCategory,
  DisplayGrid,
  DisplayGridContainer,
  DisplayImage,
  DisplayCard,
}

export default ContainerProductCategory
