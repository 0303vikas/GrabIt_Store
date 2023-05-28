import { styled } from "@mui/material"
import { keyframes, Button } from "@mui/material"

import darkLogo from "../icons/darkLogo.png"

const borderAnimation = keyframes({
  from: {
    borderImageSource:
      "linear-gradient(90deg, rgba(9, 234, 172, 1) 30%, rgba(80, 183, 239, 1) 70%)",
  },
  to: {
    borderImageSource:
      "linear-gradient(90deg, rgba(80, 183, 239, 1) 30%,  rgba(9, 234, 172, 1) 70%)",
  },
})

const ContainerLoginRegister = styled("section")({
  background:
    "linear-gradient(135deg, rgba(9,234,172,1) 0%, rgba(231, 222, 204, 1) 10%,rgba(231, 222, 204, 1) 90%, rgba(80,183,239,1) 100%)",
  width: "98.7vw",
  height: "98.7vh",
  border: "0.3vh solid",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderImageSlice: "1",
  borderImageSource:
    "linear-gradient(90deg, rgba(9, 234, 172, 1) 50%, rgba(80, 183, 239, 1) 100%)",
  animation: `${borderAnimation} 2s ease infinite`,
})

const FormContainerLoginRegister = styled("form")(({ theme }) => ({
  background: theme.palette.common.black,
  width: "25vw",
  height: "50vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  boxShadow:
    "0 2px 2px 0 rgba(80,183,239,1), 0 0 6px 0 rgba(9,234,172,1), 0 0 6px 0 rgba(9,234,172,1) ,0 0 6px 0 rgba(9,234,172,1), 0 0 80px 20px rgba(231, 222, 204, 1)",
  borderRadius: "0 4rem",
  
}))

const textAnimation = keyframes({
  from: {
    backgroundImage:
      "linear-gradient(90deg, rgba(9, 234, 172, 1) 60%, rgba(80, 183, 239, 1) 70%)",
  },
  to: {
    backgroundImage:
      "linear-gradient(90deg, rgba(80, 183, 239, 1) 60%,  rgba(9, 234, 172, 1) 70%)",
  },
})

const SubmitBtn = styled(Button)(({ theme }) => ({
  background: theme.palette.common.black,
  color: "white",
  //   borderImageSlice: "1",
  padding: "0.5rem 1rem",
  borderRadius: "4rem",
  boxShadow: "0 1px 0 0 rgba(80,183,239,1), 0 0 6px 0 rgba(9,234,172,1)",
  "&:hover": {
    transform: "rotate(-5deg)",
    boxShadow:
      "2px 0 2px 2px rgba(9,234,172,0.4), 2px 0 2px 2px rgba(80,183,239,0.4) ",
    textShadow:
      "0px 3px 3px rgba(9,234,172,0.6),0px 3px 3px rgba(80,183,239,0.6)",
  },
}))

const HeadingContainer = styled("h2")({
  color: "white",
  textShadow: "0px 3px 3px rgba(255, 255, 255, 0.5)",
  cursor: "default",
  "&:hover": {
    backgroundClip: "text",
    textFillColor: "transparent",
    animation: `${textAnimation} 1s ease-in alternate infinite`,
  },
})

const logoAnimation = keyframes({
  from: {
    opacity: 0,
    borderRadius: "0 4rem",
    boxShadow: "0 4px 0 0 rgba(80,183,239,1), 0 0 4px 0 rgba(9,234,172,1)",
  },
  to: {
    opacity: "100%",
  },
})

const ImageContainer = styled("img")({
  width: "25vw",
  height: "50vh",
  borderRadius: '4rem 0',
  
  animation: `${logoAnimation} 6s ease `,
})

export {
  FormContainerLoginRegister,
  SubmitBtn,
  HeadingContainer,
  ImageContainer,
  borderAnimation,
}

export default ContainerLoginRegister
