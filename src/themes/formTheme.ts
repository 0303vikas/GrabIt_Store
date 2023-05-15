import { styled } from "@mui/material"
import { keyframes } from "@mui/material"

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
    "linear-gradient(135deg, rgba(9,234,172,1) 0%, rgba(24,36,50,1) 10%,rgba(24,36,50,1) 90%, rgba(80,183,239,1) 100%)",

  width: "100vw",
  height: "100vh",
  border: "2px solid",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderImageSlice: "1",
  borderImageSource:
    "linear-gradient(90deg, rgba(9, 234, 172, 1) 50%, rgba(80, 183, 239, 1) 100%)",
  animation: `${borderAnimation} 2s ease infinite`,
})

const FormContainerLoginRegister = styled("div")({
  background:
    "linear-gradient(135deg, rgba(9, 234, 172, 0.7) 40%, rgba(80, 183, 239, 0.7) 70%)",
  width: "25vw",
  height: "50vh",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",

  borderRadius: "0 4rem",
  //   border: "2px solid",
  //   borderImageSlice: "1",
  //   borderImageSource:
  //     "linear-gradient(90deg, rgba(9, 234, 172, 1) 50%, rgba(80, 183, 239, 1) 100%)",
  //   animation: `${borderAnimation} 2s ease infinite`,
})

export { FormContainerLoginRegister }

export default ContainerLoginRegister
