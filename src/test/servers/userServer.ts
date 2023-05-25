import { rest } from "msw"
import { setupServer } from "msw/lib/node"
import users from "../data/user"
import UserReducer from "../../redux/reducers/userReducer"

export const userServer = setupServer(
  rest.get("https://api.escuelajs.co/api/v1/users", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users))
  }),
  rest.post("https://api.escuelajs.co/api/v1/users/", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users))
  })
)

export const userServer = setupServer(
    rest.get("https://api.escuelajs.co/api/v1/users", async (req,res,ctx) => {
    return res(ctx.status(200), ctx.json(users))
    }),
    
)