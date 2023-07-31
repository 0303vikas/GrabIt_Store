import { useTheme } from "@mui/material"
import { ErrorMessageType } from "../types/ErrorType"

export const ErrorComponent = ({ message, statusCode }: ErrorMessageType) => {
  const theme = useTheme()
  return (
    <p
      style={{
        color: theme.palette.error.main,
        fontSize: theme.typography.fontSize,
        margin: "0",
      }}
    >
      Request Failed With Code: {statusCode}
      <br />
      Message: {message}
    </p>
  )
}
