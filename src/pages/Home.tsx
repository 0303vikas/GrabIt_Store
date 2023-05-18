import React, { useEffect } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Input } from "@mui/material"
import { Outlet } from "react-router-dom"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import {
  createProduct,
  deleteProduct,
  fetchProductData,
  filterProduct,
  updateProduct,
} from "../redux/reducers/productReducer"

const Home = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.product)

  useEffect(() => {
    dispatch(fetchProductData())
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

  return (
    <main>
      <nav>
        <p> This is the navigation Bar</p>
        <button onClick={create}>create Product</button>
        <button onClick={update}>update Product</button>
        <button onClick={deletepro}>delete Product</button>
        <button onClick={filtertit}>filter Title</button>
        <button onClick={filterPrice}>filter price</button>
        <button onClick={filterRange}>filter range</button>
        <button onClick={filterCat}>filter categoryId</button>
      </nav>
      <Outlet />
    </main>
  )
}

export default Home
