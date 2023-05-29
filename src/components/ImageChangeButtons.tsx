import React from "react"
import { IconButton, Typography } from "@mui/material"
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"

export const ImageChangeButtons = ({
  imagesNo,
  currentImage,
  setCurrentImage,
}: {
  imagesNo: number
  currentImage: number
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>
}) => {
  const moveImageRight = () =>
    currentImage > 1 ? setCurrentImage(currentImage - 1) : null
  const moveImageLeft = () =>
    currentImage < imagesNo ? setCurrentImage(currentImage + 1) : null

  return (
    <>
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
    </>
  )
}
