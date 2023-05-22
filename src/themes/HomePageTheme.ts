import {
  styled,
  ListItem,
  TextField,
  MenuItem,
  Select,
  InputBase,
  alpha,
} from "@mui/material"
import Grid from "@mui/material/Grid"
import { Box } from "@mui/system"

// export const HeaderContainer = styled("header")(({ theme }) => ({}))
// Navigation Bar Elements
export const HeaderContainer = styled("header")(({ theme }) => ({
  height: "13vh",
  width: "98.8vw",
  background: theme.palette.common.black,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

export const IconContainer = styled("img")(({ theme }) => ({
  height: "8vh",
  width: "5vw",
  borderRight: "1px solid white",
  padding: "0 10px",
  borderColor: "",
}))

export const NavigationList = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  color: "white",
}))

export const List = styled(ListItem)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.common.white,
  borderRadius: "0.8rem",
  marginRight: "0.5rem",
  "&:hover": {
    boxShadow: "0 1px 0 0 rgba(80,183,239,1), 0 0 6px 0 rgba(9,234,172,1)",
  },
  "&:active": {
    background: theme.palette.primary.light,
  },
  cursor: "default",
}))

export const NavigationContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}))

export const SearchTypeList = styled(Select)(({ theme }) => ({
  color: theme.palette.common.white,
  margin: "none",
  borderColor: "white",
  "& .MuiSvgIcon-root": {
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.common.white,
  },
}))

export const Search = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  height: "4vh",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  display: "flex",
  flexDirection: "row",
}))

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),

  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}))

export const SearchResultList = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "18rem",
  marginLeft: theme.spacing(1),
  background: theme.palette.common.white,
  marginTop: "2px",
  overflow: "hidden",
  maxHeight: "20rem",
}))

export const ThemeChangingButton = styled("button")(({ theme }) => ({}))

export const SettingContainer = styled(Box)(({ theme }) => ({
  flexGrow: 0,
}))

//Main Page Elements

export const MainContainer = styled("main")(({ theme }) => ({
  background: theme.palette.secondary.main,
}))

export const NavigatioinBar = styled("nav")(({ theme }) => ({
  background: theme.palette.primary.main,
}))

export const NavigationBarGrid = styled("div")(({ theme }) => ({}))
