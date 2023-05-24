import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import {
  Avatar,
  Badge,
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
import { ShoppingCart} from '@mui/icons-material'

import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import {
  createProduct,
  deleteProduct,
  fetchProductData,
  filterProduct,
  updateProduct,
} from "../redux/reducers/productReducer"
import { fetchCategoryData } from "../redux/reducers/categoryReducer"
import {
  HeaderContainer,
  IconContainer,
  MainContainer,
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

import darkLogo from "../icons/darkLogo.png"

const NavigationLeft = () => {
  const navigate = useNavigate()

  return (
    <NavigationContainer id="navigtionContent--left">
      <IconContainer src={darkLogo} alt="Website Logo" />
      <NavigationList>
        <List onClick={() => navigate("/")}>Products</List>
        <List onClick={() => navigate("/categories")}>Categories</List>
        <List>Users</List>
      </NavigationList>
    </NavigationContainer>
  )
}

const NavigationRight = () => {
  const settings = ["Profile", "registration", "login", "Logout"]
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const reduxState = useAppSelector((state) => state) // get state of redux store
  const product = reduxState.product
  const category = reduxState.categories

  const [searchType, setSearchType] = useState("Product")
  const [mode, setMode] = useState<boolean>(true)
  const [search, setSearch] = useState("abs")

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const [showSearchList, setShowSearchList] = useState<"hidden" | "visible">(
    "hidden"
  )

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  return (
    <NavigationContainer id="navigtionContent--right">
      <NavigationList>
        <FormControl sx={{ minWidth: "120" }}>
          <SearchTypeList
            id="demo-simple-select-filled"
            value={searchType}
            onChange={(event: SelectChangeEvent<unknown>) =>
              setSearchType(event.target.value as string)
            }
          >
            <MenuItem
              sx={{ color: theme.palette.common.black }}
              value={"Category"}
              onClick={() => {
                if (!category.category.length) {
                  dispatch(fetchCategoryData())
                }
              }}
            >
              Category
            </MenuItem>
            <MenuItem
              sx={{ color: theme.palette.common.black }}
              value={"Product"}
            >
              Product
            </MenuItem>
          </SearchTypeList>
        </FormControl>
      </NavigationList>

      <div>
        <Search>
          <SearchIconWrapper>
            <SearchIcon style={{ color: "white" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            style={{ color: "white" }}
            onFocus={() => setShowSearchList("visible")}
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
          {searchType === "Product" ? (
            product.loading === true ? (
              <div>Loading...</div>
            ) : product.error ? (
              <div>{product.error}</div>
            ) : (
              product.products.map((item, index) => (
                <List sx={{ color: "black" }} key={item.id}>
                  {item.title}
                </List>
              ))
            )
          ) : null}
          {searchType === "Category" ? (
            category.loading === true ? (
              <div>Loading...</div>
            ) : category.error ? (
              <div>{category.error}</div>
            ) : (
              category.category.map((item, index) => (
                <List
                  sx={{ color: "black" }}
                  key={item.id}
                  onClick={() => navigate(`/category/${item.id}/products`)}
                >
                  {item.name}
                </List>
              ))
            )
          ) : null}
        </SearchResultList>
      </div>
      
      <Badge onClick={() => navigate('/product/cart')} badgeContent={reduxState.cart.length} color='secondary' sx={{margin: '0 1rem'}}>
        
      <ShoppingCart sx={{color: theme.palette.common.white}}/>
      </Badge>
      <SettingContainer sx={{marginRight: '0.5rem'}}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Profile Pic" src="/static/images/avatar/2.jpg" />
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
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography
                textAlign="center"
                onClick={() => navigate(`/${setting}`)}
              >
                {setting}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </SettingContainer>
      {/* <ThemeChangingButton>ThemeChaning button</ThemeChangingButton> */}
    </NavigationContainer>
  )
}

export { NavigationLeft, NavigationRight }
