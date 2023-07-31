/**
 * @file NavigationBar
 * @description Divided into two components NavigationRight and NavigationLeft
 * @Author Vikas Singh
 * @notes
 * - theme changing button not added yet
 */
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  SelectChangeEvent,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import {
  ShoppingCart,
  LightModeRounded,
  DarkModeRounded,
} from "@mui/icons-material"

import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { fetchCategoryData } from "../redux/reducers/categoryReducer"
import {
  IconContainer,
  List,
  NavigationList,
  NavigationContainer,
  SearchTypeList,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  SettingContainer,
  SearchResultList,
} from "../themes/HomePageTheme"
import { clearUserLogin } from "../redux/reducers/userReducer"
import darkLogo from "../icons/darkLogo.png"
import lightLogo from "../icons/lightLogo.png"
import { useDebounce } from "../hooks/useDebounceHook"
import { changeMode } from "../redux/reducers/modeReducer"
import { fetchProductData } from "../redux/reducers/productReducer"
import { setThemeLocalStorage } from "../hooks/setThemeLocalStorage"

/**
 * @description Contains website logo, navigation button products and navigation button categories
 * @returns JSX.Element NavigationLeft
 */
const NavigationLeft = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <NavigationContainer id="navigtionContent--left">
      <IconContainer
        src={theme.palette.mode === "light" ? lightLogo : darkLogo}
        alt="Website Logo"
      />
      <NavigationList>
        <List onClick={() => navigate("/")}>Products</List>
        <List onClick={() => navigate("/categories")}>Categories</List>
      </NavigationList>
    </NavigationContainer>
  )
}
/**
 * @description Contains search input, cart icon and setting icon
 * @returns JSX.Elemnet NavigationRight
 * @notes
 * - 1st dropdown list consists of two options product and categorie, selecting
 * - one of them will set the search input to search from the selected list.
 * - Search input will dropdown a list that shows the search data, it also
 * - has a button to close the search list.
 * - Cart icons redirects to cart.
 * - Setting option has shows option according to logged in user role
 * - Search also has a debounce function attached to it
 */
const NavigationRight = () => {
  const settingOptions = ["Registration", "Login"]
  const addCustomerOptions = ["Profile", "Logout", "Registration"]
  const addAdminOptions = ["CreateProduct", "CreateCategory"]
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const reduxState = useAppSelector((state) => state) // get state of redux store
  const product = reduxState.product
  const category = reduxState.categories
  const mode = reduxState.mode.mode
  const { currentUser } = reduxState.user
  const [openLogoutConfirm, setopenLogoutConfirm] = useState(false)
  const [searchType, setSearchType] = useState("Product")
  const [search, setSearch] = useState("")
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const [showSearchList, setShowSearchList] = useState<"hidden" | "visible">(
    "hidden"
  )
  const debounceSearch = useDebounce(search, 1000)

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const logout = () => {
    setopenLogoutConfirm(false)
    dispatch(clearUserLogin())
    localStorage.clear()
    navigate("/")
  }

  const filterSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <NavigationContainer id="navigtionContent--right">
      <NavigationList title="Select Search Type">
        <FormControl sx={{ minWidth: "120" }}>
          <SearchTypeList
            id="demo-simple-select-filled"
            value={searchType}
            onChange={(event: SelectChangeEvent<unknown>) =>
              setSearchType(event.target.value as string)
            }
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: theme.palette.common.white,
                },
              },
            }}
          >
            <MenuItem
              sx={{
                color: theme.palette.common.black,
              }}
              value={"Category"}
              onClick={() => dispatch(fetchCategoryData())}
            >
              Category
            </MenuItem>
            <MenuItem
              sx={{
                color: theme.palette.common.black,
              }}
              value={"Product"}
              onClick={() => dispatch(fetchProductData())}
            >
              Product
            </MenuItem>
          </SearchTypeList>
        </FormControl>
      </NavigationList>
      <div>
        <Search>
          <SearchIconWrapper>
            <SearchIcon style={{ color: theme.palette.common.black }} />
          </SearchIconWrapper>

          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            style={{ color: theme.palette.common.black }}
            onFocus={() => setShowSearchList("visible")}
            onChange={filterSearch}
          />
        </Search>
        <SearchResultList style={{ visibility: showSearchList }}>
          <button
            onClick={() => {
              setShowSearchList("hidden")
            }}
          >
            Hide X
          </button>
          {searchType === "Product"
            ? (debounceSearch === ""
                ? product.products
                : product.products.filter((item) =>
                    item.title
                      .toLowerCase()
                      .includes(debounceSearch.toLowerCase())
                  )
              ).map((item, index) => (
                <List
                  sx={{
                    color: theme.palette.common.black,
                  }}
                  key={item.id}
                  onClick={() => navigate(`/single/product/${item.id}`)}
                >
                  {item.title}
                </List>
              ))
            : null}
          {searchType === "Category"
            ? (debounceSearch === ""
                ? category.category
                : category.category.filter((item) =>
                    item.name
                      .toLowerCase()
                      .includes(debounceSearch.toLowerCase())
                  )
              ).map((item, index) => (
                <List
                  sx={{ color: theme.palette.common.black }}
                  key={item.id}
                  onClick={() => navigate(`/category/${item.id}/products`)}
                >
                  {item.name}
                </List>
              ))
            : null}
        </SearchResultList>
      </div>

      <Badge
        onClick={() => navigate("/product/cart")}
        badgeContent={reduxState.cart.length}
        color="secondary"
        sx={{ margin: "0 1rem" }}
      >
        <ShoppingCart
          sx={{ color: theme.palette.common.black }}
          titleAccess="Open Cart"
        />
      </Badge>

      <SettingContainer sx={{ marginRight: "0.5rem" }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt="Profile Pic"
              src={
                currentUser ? currentUser.avatar : "/static/images/avatar/2.jpg"
              }
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          PaperProps={{
            style: {
              backgroundColor: theme.palette.common.white,
            },
          }}
        >
          {(currentUser
            ? currentUser.role === "admin"
              ? [...addCustomerOptions, ...addAdminOptions]
              : [...addCustomerOptions]
            : settingOptions
          ).map((setting) => (
            <MenuItem
              key={setting}
              onClick={handleCloseUserMenu}
              style={{
                color: theme.palette.common.black,
              }}
            >
              <Typography
                textAlign="center"
                onClick={
                  setting === "Logout"
                    ? () => setopenLogoutConfirm(true)
                    : () => navigate(`/${setting.toLowerCase()}`)
                }
              >
                {setting}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </SettingContainer>
      <Dialog
        open={openLogoutConfirm}
        keepMounted
        onClose={() => setopenLogoutConfirm(false)}
        aria-describedby="logout-confimation"
      >
        <DialogTitle>{"Confirm Logout?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setopenLogoutConfirm(false)}>Cancel</Button>
          <Button color="error" onClick={logout}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton
        style={{ padding: "1rem" }}
        onClick={() => {
          dispatch(changeMode())
          setThemeLocalStorage(mode === "light" ? "dark" : "light")
        }}
      >
        {mode === "light" ? (
          <DarkModeRounded color="secondary" titleAccess="Turn of lights" />
        ) : (
          <LightModeRounded color="secondary" titleAccess="Turn on lights" />
        )}
      </IconButton>
    </NavigationContainer>
  )
}

export { NavigationLeft, NavigationRight }
