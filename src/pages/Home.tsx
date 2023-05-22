import React, { useEffect, useState } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Menu,
  MenuItem,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from "@mui/material"
import { Outlet } from "react-router-dom"
import SearchIcon from "@mui/icons-material/Search"
import { useTheme } from "@mui/material/styles"

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
  ThemeChangingButton,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  SettingContainer,
  SearchResultList,
} from "../themes/HomePageTheme"

import darkLogo from "../icons/darkLogo.png"

// const getFilteredProduct = () => {
//   return
// }

const settings = ["Profile", "Account", "Dashboard", "Logout"]

const Home = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const data = useAppSelector((state) => state.product)
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

  useEffect(() => {
    dispatch(fetchProductData())
    dispatch(fetchCategoryData())
  }, [])

  console.log(data)

  const create = () => {
    let newPro = {
      title: "testTitle",
      price: 10,
      description: "TestCase",
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"],
    }
    dispatch(createProduct(newPro))
    console.log(data)
  }

  const update = () => {
    let newPro = {
      id: 214,
      update: {
        title: "testTitleUpdate",
        price: 100,
      },
    }
    dispatch(updateProduct(newPro))
  }

  const deletepro = () => {
    dispatch(deleteProduct(214))
  }
  const filtertit = () => {
    dispatch(filterProduct({ title: "Generic" }))
  }

  const filterPrice = () => {
    dispatch(filterProduct({ price: 10 }))
  }

  const filterRange = () => {
    dispatch(filterProduct({ range: { price_max: 30 } }))
  }

  const filterCat = () => {
    dispatch(filterProduct({ categoryId: 1 }))
  }
  console.log(theme.typography.h1)

  return (
    <>
      <HeaderContainer>
        <NavigationContainer id="navigtionContent--left">
          <IconContainer src={darkLogo} alt="Website Logo" />
          <NavigationList>
            <List>Products</List>
            <List>Categories</List>
            <List>Users</List>
          </NavigationList>
        </NavigationContainer>
        <NavigationContainer id="navigtionContent--right">
          <NavigationList>
            <FormControl sx={{ minWidth: "120" }}>
              <SearchTypeList
                id="demo-simple-select-filled"
                value={searchType}
                onChange={(event: SelectChangeEvent<unknown>) =>
                  setSearchType(event.target.value as string)
                }
                defaultValue={"Product"}
              >
                <MenuItem
                  sx={{ color: theme.palette.common.black }}
                  value={"Category"}
                >
                  Category
                </MenuItem>
                <MenuItem
                  sx={{ color: theme.palette.common.black }}
                  value={"Category"}
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
              <button onClick={() => setShowSearchList("hidden")}>Hide</button>
              <List sx={{ color: "black" }}>Hello</List>
              <List sx={{}}>Bye</List>
            </SearchResultList>
          </div>
          <SettingContainer>
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
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </SettingContainer>
          {/* <ThemeChangingButton>ThemeChaning button</ThemeChangingButton> */}
        </NavigationContainer>
      </HeaderContainer>
      <MainContainer>
        {/* <p> This is the navigation Bar</p>
        <button onClick={create}>create Product</button>
        <button onClick={update}>update Product</button>
        <button onClick={deletepro}>delete Product</button>
        <button onClick={filtertit}>filter Title</button>
        <button onClick={filterPrice}>filter price</button>
        <button onClick={filterRange}>filter range</button>
        <button onClick={filterCat}>filter categoryId</button> */}

        {/* {search === "" ? <Outlet /> : search}
        {search && searchType === "Category" && (
          <h1 style={{ color: "red" }}>Category</h1>
        )} */}

        <Outlet />
      </MainContainer>
    </>
  )
}

export default Home
