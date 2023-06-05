import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import { useAppDispatch } from "../hooks/useAppDispatch"
import { fetchProductData } from "../redux/reducers/productReducer"
import { fetchCategoryData } from "../redux/reducers/categoryReducer"
import { HeaderContainer } from "../themes/HomePageTheme"
import { NavigationLeft, NavigationRight } from "../components/NavigationBar"
import { useAppSelector } from "../hooks/useAppSelector"
import ErrorComponent from "./Error"

const Home = () => {
  const dispatch = useAppDispatch()
  const reduxErrorState = useAppSelector((state) => state)
  const productsError = reduxErrorState.product.error
  const userError = reduxErrorState.user.error
  const categoryError = reduxErrorState.categories.error

  useEffect(() => {
    dispatch(fetchProductData())
    dispatch(fetchCategoryData())
  }, [])

  return (
    <>
      <HeaderContainer>
        <NavigationLeft />
        <NavigationRight />
      </HeaderContainer>
      {productsError.length > 0 ||
      userError.length > 0 ||
      categoryError.length > 0 ? (
        <ErrorComponent />
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default Home
