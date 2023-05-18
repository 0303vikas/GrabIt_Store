import { rest } from "msw"
import { setupServer } from "msw/lib/node"
import { ProductType } from "../../types/Product"
import { product1, product2, product3, product4 } from "../data/products"

const productServer = setupServer(
  rest.get<ProductType[]>(
    "https://api.escuelajs.co/api/v1/products",
    (req, res, ctx) => {
      return res(ctx.json([product1, product2, product3, product4]))
    }
  )
)

export default productServer
