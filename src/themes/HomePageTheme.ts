import { styled, ListItem, Select, InputBase, alpha } from "@mui/material"
import { Box } from "@mui/system"

// Navigation Bar Elements
export const HeaderContainer = styled("header")(({ theme }) => ({
  height: "13vh",
  width: "100%",
  background: theme.palette.common.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: "auto",
  },
}))

export const IconContainer = styled("img")(({ theme }) => ({
  height: "8vh",
  width: "5vw",
  borderRight: `1px solid ${theme.palette.common.black}`,
  padding: "0 10px",
  [theme.breakpoints.down("md")]: {
    width: "auto",
    border: "0",
  },
}))

export const NavigationList = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  color: "white",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}))

export const List = styled(ListItem)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.common.black,
  borderRadius: "0.8rem",
  marginRight: "0.5rem",
  "&:hover": {
    boxShadow: `0 1px 0 0 ${theme.palette.primary.main}, 0 0 6px 0 ${theme.palette.secondary.main}`,
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
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}))

export const SearchTypeList = styled(Select)(({ theme }) => ({
  color: theme.palette.common.black,
  backgroundColor: theme.palette.common.white,
  margin: "none",
  borderColor: theme.palette.common.black,
  "& .MuiSvgIcon-root": {
    color: theme.palette.common.black,
    borderColor: theme.palette.common.black,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.common.black,
  },
}))

export const Search = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  height: "6vh",
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
  width: "16rem",
  marginLeft: theme.spacing(1),
  background: theme.palette.common.white,
  marginTop: ".5rem",
  overflow: "hidden",
  maxHeight: "10rem",
  overflowY: "scroll",
  OverflowX: "hidden",
  borderRadius: "1rem",
  boxShadow: "0 0 2px 2px rgb(255,255,255,0.5)",
}))

export const ThemeChangingButton = styled("button")(({ theme }) => ({}))

export const SettingContainer = styled(Box)(({ theme }) => ({
  flexGrow: 0,
  marginLeft: theme.spacing(1),
}))

//Main Page Elements

export const MainContainer = styled("main")(({ theme }) => ({
  background: theme.palette.secondary.main,
}))

// Footer Elements
export const FooterContainer = styled("footer")(({ theme }) => ({
  height: "auto",
  width: "100%",
  background: theme.palette.common.white,
  color: theme.palette.common.black,
  justifyContent: "center",
  alignContent: "center",
}))
