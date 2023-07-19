import { alpha, styled, useTheme } from "@mui/material"
import { keyframes, Button } from "@mui/material"
import { commonMode } from "./mainTheme"

const borderAnimation = keyframes({
  from: {
    borderImageSource: `linear-gradient(90deg, ${commonMode.palette.secondary.main} 30%, ${commonMode.palette.primary.main} 70%)`,
  },
  to: {
    borderImageSource: `linear-gradient(90deg, ${commonMode.palette.primary.main} 30%,  ${commonMode.palette.secondary.main} 70%)`,
  },
})

const ContainerLoginRegister = styled("section")(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.common.white} 15%,${theme.palette.common.white} 85%, ${theme.palette.primary.main} 100%)`,
  width: "98.99vw",
  height: "98.7vh",
  border: "0.3vh solid",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderImageSlice: "1",
  borderImageSource: `linear-gradient(90deg, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.main} 100%)`,
  animation: `${borderAnimation} 2s ease infinite`,
}))

const FormContainerLoginRegister = styled("form")(({ theme }) => ({
  background: theme.palette.common.white,
  width: "25vw",
  height: "60vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: `0 2px 2px 0 ${theme.palette.primary.main}, 0 0 6px 0 ${theme.palette.secondary.main}, 0 0 6px 0 ${theme.palette.secondary.main} ,0 0 6px 0 ${theme.palette.secondary.main}, 0 0 80px 20px rgba(231, 222, 204, 1)`,
  borderRadius: "0 4rem",
  [theme.breakpoints.down("md")]: {
    width: "auto",
    padding: "0.5rem",
    height: "auto",
  },
}))

const textAnimation = keyframes({
  from: {
    backgroundImage: `linear-gradient(90deg, ${commonMode.palette.secondary.main} 60%, ${commonMode.palette.primary.main} 70%)`,
  },
  to: {
    backgroundImage: `linear-gradient(90deg, ${commonMode.palette.primary.main} 60%,  ${commonMode.palette.secondary.main} 70%)`,
  },
})

const SubmitBtn = styled(Button)(({ theme }) => ({
  background: theme.palette.common.white,
  color: theme.palette.common.black,
  //   borderImageSlice: "1",
  padding: "0.5rem 1rem",
  marginTop: "1rem",
  borderRadius: "4rem",
  boxShadow: `0 1px 0 0 ${theme.palette.primary.main}, 0 0 6px 0 ${theme.palette.secondary.main}`,
  "&:hover": {
    transform: "rotate(-5deg)",
    boxShadow: `2px 0 2px 2px ${alpha(
      theme.palette.secondary.main,
      0.4
    )}, 2px 0 2px 2px ${alpha(theme.palette.primary.main, 0.4)}`,
    textShadow: `0px 3px 3px ${alpha(
      theme.palette.secondary.main,
      0.6
    )},0px 3px 3px ${alpha(theme.palette.primary.main, 0.6)}`,
  },
}))

const HeadingContainer = styled("h2")(({ theme }) => ({
  color: theme.palette.common.black,
  textShadow: `0px 3px 3px rgba(255, 255, 255, 0.5)`,
  cursor: "default",
  "&:hover": {
    backgroundClip: "text",
    textFillColor: "transparent",
    animation: `${textAnimation} 1s ease-in alternate infinite`,
  },
}))

const logoAnimation = keyframes({
  from: {
    opacity: 0,
    borderRadius: "0 4rem",
    boxShadow: `rgba(9,234,172,1)0 4px 0 0 ${commonMode.palette.primary.main}, 0 0 4px 0 ${commonMode.palette.secondary.main}`,
  },
  to: {
    opacity: "100%",
  },
})

const ImageContainer = styled("img")(({ theme }) => ({
  width: "25vw",
  height: "50vh",
  borderRadius: "4rem 0",
  animation: `${logoAnimation} 6s ease `,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}))

export {
  FormContainerLoginRegister,
  SubmitBtn,
  HeadingContainer,
  ImageContainer,
  borderAnimation,
}

export default ContainerLoginRegister
