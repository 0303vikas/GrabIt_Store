import { rest } from "msw"
import { setupServer } from "msw/lib/node"
import users from "../data/user"



export const userServer = setupServer(
    rest.get("https://api.escuelajs.co/api/v1/users", async (req,res,ctx) => {
    return res(ctx.status(200), ctx.json(users))
    })
)