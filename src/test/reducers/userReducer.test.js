import {
  createUser,
  fetchAllUsers,
  clearAllUsers,
} from "../../redux/reducers/userReducer"
import store from "../shared/store"
import users, { user1, user2, user3 } from "../data/user"
import { userServer } from "../servers/userServer"

beforeAll(() => {
  userServer.listen()
})

afterAll(() => {
  userServer.close()
})

afterEach(() => {
  store.dispatch(clearAllUsers())
})

describe("Testing User Reducer", () => {
  test("Test initial State of store", () => {
    expect(store.getState().user).toEqual({
      users: [],
      loading: false,
      error: "",
    })
  })
  test("Fetch all Users", async () => {
    await store.dispatch(fetchAllUsers())
    expect(store.getState().user.users.length).toBe(3)
  })
})
