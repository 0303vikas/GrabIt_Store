import React, { useEffect, useState } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import {
  Avatar,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from "@mui/material"
import { Navigate, Outlet, redirect, useNavigate } from "react-router-dom"
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
  Search,
  SearchIconWrapper,
  StyledInputBase,
  SettingContainer,
  SearchResultList,
} from "../themes/HomePageTheme"
import { NavigationLeft, NavigationRight } from "../components/NavigationBar"
import { fetchAllUsers } from "../redux/reducers/userReducer"
// const getFilteredProduct = () => {
//   return
// }

const settings = ["Profile", "Account", "Dashboard", "Logout"]

const Home = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  // const reduxState = useAppSelector((state) => state) // get state of redux store
  // const product = reduxState.product
  // const category = reduxState.categories

  // const [searchType, setSearchType] = useState("Product")
  // const [mode, setMode] = useState<boolean>(true)
  // const [search, setSearch] = useState("abs")

  // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
  //   null
  // )
  // const [showSearchList, setShowSearchList] = useState<"hidden" | "visible">(
  //   "hidden"
  // )

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null)
  // }
  // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElUser(event.currentTarget)
  // }

  useEffect(() => {
    dispatch(fetchProductData())
    dispatch(fetchAllUsers())
    dispatch(fetchCategoryData())
  }, [])

  console.log("this is rendering again and again")

  // const create = () => {
  //   let newPro = {
  //     title: "testTitle",
  //     price: 10,
  //     description: "TestCase",
  //     categoryId: 1,
  //     images: ["https://placeimg.com/640/480/any"],
  //   }
  //   dispatch(createProduct(newPro))
  // }

  // const update = () => {
  //   let newPro = {
  //     id: 214,
  //     update: {
  //       title: "testTitleUpdate",
  //       price: 100,
  //     },
  //   }
  //   dispatch(updateProduct(newPro))
  // }

  // const deletepro = () => {
  //   dispatch(deleteProduct(214))
  // }
  // const filtertit = () => {
  //   dispatch(filterProduct({ title: "Generic" }))
  // }

  // const filterPrice = () => {
  //   dispatch(filterProduct({ price: 10 }))
  // }

  // const filterRange = () => {
  //   dispatch(filterProduct({ range: { price_max: 30 } }))
  // }

  // const filterCat = () => {
  //   dispatch(filterProduct({ categoryId: 1 }))
  // }

  return (
    <>
      <HeaderContainer>
        <NavigationLeft />
        <NavigationRight />
      </HeaderContainer>
      <Outlet />
    </>
  )
}

export default Home
