import { IconButton } from "@mui/material"
import {
  GitHub,
  Instagram,
  Facebook,
  LinkedIn,
  Twitter,
} from "@mui/icons-material"

export const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 20px",
      }}
    >
      <p
        style={{
          marginTop: 0,
          padding: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p>
          This Website was developed by Vikas Singh. Feel free to
          contact&#128515;.
        </p>

        <address>
          Turku, Finland
          <br />
          +358 122718273
          <br />
          grabit@email.com
        </address>
      </p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>Follow me</p>
        <div>
          <IconButton href="https://www.github.com/0303vikas">
            <GitHub color="primary" />
          </IconButton>
          <IconButton href="https://instagram.com/vikas_0312_?igshid=ZDc4ODBmNjlmNQ==">
            <Instagram color="error" />
          </IconButton>
          <IconButton href="https://www.facebook.com/people/Vikas-Singh/pfbid02BwUX5GtZvT31TyJD2CebqLKmu1FFyHGS5iegCUamP2mLYrTKo43n5zVMsKgaEPULl/">
            <Facebook color="primary" />
          </IconButton>
          <IconButton href="https://www.linkedin.com/in/vikas-singh-waraich">
            <LinkedIn color="primary" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
