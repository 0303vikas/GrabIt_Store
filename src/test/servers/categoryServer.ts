import { rest } from "msw"
import { setupServer } from "msw/node"

import { CategoryType, UpdateCategoryType } from "../../types/Category"
import Categories, { category1 } from "../data/categories"

const CategoryServer = setupServer(
  rest.get<CategoryType[]>(
    "https://api.escuelajs.co/api/v1/categories",
    (req, res, ctx) => {
      return res(ctx.json(Categories))
    }
  ),
  rest.post<CategoryType>(
    "https://api.escuelajs.co/api/v1/categories/",
    async (req, res, ctx) => {
      const newCategoryFetch = (await req.json()) as Omit<CategoryType, "id">
      const error: string[] = []
      let category: CategoryType | null = null
      if (!newCategoryFetch.name) {
        error.push("Category name is required")
      }
      if (!newCategoryFetch.image || newCategoryFetch.image === "") {
        error.push("images must not be empty string")
      }

      category = {
        id: 1,
        name: newCategoryFetch.name,
        image: newCategoryFetch.image,
      }

      if (error.length > 0) {
        return res(
          ctx.status(400),
          ctx.json({
            statusCode: 400,
            message: error,
            error: "Bad Request",
          })
        )
      }
      return res(ctx.status(201), ctx.json(category))
    }
  ),
  rest.put<CategoryType>(
    "https://api.escuelajs.co/api/v1/categories/1",
    async (req, res, ctx) => {
      const newData = (await req.json()) as UpdateCategoryType
      const currentUrl = (await req.url).toString()
      const urlArray = currentUrl.split("/")
      let id = Number(urlArray.pop())

      const error: string[] = []
      let findCategory = Categories.find((item) => item.id === id)

      if (!findCategory) {
        error.push(`Category with id ${id} doesn't exist`)
      }

      if (error.length > 0) {
        return res(
          ctx.status(400),
          ctx.json({
            statusCode: 400,
            message: error,
            error: "Bad Request",
          })
        )
      }

      return res(ctx.status(200), ctx.json({ ...findCategory, ...newData }))
    }
  ),
  rest.delete<boolean>(
    "https://api.escuelajs.co/api/v1/categories/1",
    async (req, res, ctx) => {
      // get url, turn to string, split into array and pop the last element of array, which is the id
      const currentUrl = (await req.url).toString().split("/").pop()
      let id = Number(currentUrl)

      let error: string = ""
      let findCategory = Categories.find((item) => item.id === id)

      if (!findCategory) {
        error = `Category with id ${id} doesn't exist`
      }

      if (error !== "") {
        return res(
          ctx.status(400),
          ctx.json({
            statusCode: 400,
            message: error,
            error: "Bad Request",
          })
        )
      }

      return res(ctx.status(200), ctx.json(true))
    }
  )
)

export default CategoryServer
