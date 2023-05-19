import { rest } from "msw"
import { setupServer } from "msw/lib/node"

import { ProductType } from "../../types/Product"
import {
  product1,
  product2,
  product3,
  product4,
  updatedProduct4,
} from "../data/products"
import { NewProductType } from "../../types/NewProduct"
import categories from "../data/categories"

const productServer = setupServer(
  rest.get<ProductType[]>(
    "https://api.escuelajs.co/api/v1/products",
    (req, res, ctx) => {
      return res(ctx.json([product1, product2, product3, product4]))
    }
  ),
  rest.post(
    "https://api.escuelajs.co/api/v1/products/",
    async (req, res, ctx) => {
      console.log("this is working")
      console.log("newproduct server" + categories)
      const newProduct = (await req.json()) as NewProductType
      console.log(newProduct)
      const category = categories.find((item) => {
        item.id === newProduct.categoryId
      })
      console.log(newProduct)

      const error: string[] = []
      let product: ProductType | null = null
      console.log(product)

      if (!newProduct.price || newProduct.price < 1) {
        error.push("Price should be greater than zero")
      }
      if (!Array.isArray(newProduct.images)) {
        error.push("images must be an array")
      } else if (newProduct.images.length < 1) {
        error.push("images must contain at least 1 image")
      } else if (newProduct.images.some((item) => typeof item !== "string")) {
        error.push("images must be an array of string")
      }
      if (!category) {
        error.push("category does not exist")
      } else {
        product = {
          title: newProduct.title,
          price: newProduct.price,
          category: category,
          description: newProduct.description,
          images: newProduct.images,
          id: 1,
        }
      }
      console.log("errpr" + error)
      if (error.length > 0) {
        console.log(error)
        return res(
          ctx.status(400),
          ctx.json({
            statusCode: 400,
            message: error,
            error: "Bad Request",
          })
        )
      }
      return res(ctx.status(201), ctx.json(product))
    }
  ),
  rest.put<ProductType[]>(
    `https://api.escuelajs.co/api/v1/products/${updatedProduct4.id}`,
    async (req, res, ctx) => {
      const newProduct = await req.json()
      const updatedProduct = { ...product4, ...newProduct }
      return res(ctx.json(updatedProduct))
    }
  )
)

export default productServer
