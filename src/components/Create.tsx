import { useTheme } from "@mui/material"

import ContainerProductCategory from "../themes/categoryTheme"
import { CreateProduct } from "./CreateProduct"
import CreateCategory from "./CreateCategory"

const Create = ({ createType }: { createType: string }) => {
  const theme = useTheme()
  return (
    <ContainerProductCategory
      id="create--container"
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
        reate
      </h1>
      {createType === "product" ? <CreateProduct /> : <CreateCategory />}
    </ContainerProductCategory>
  )
}

export default Create
