import store from "../shared/store"

import {
  fetchProductData,
  updateProduct,
  filterProduct,
  createProduct,
  clearProductStore,
  deleteProduct,
} from "../../redux/reducers/productReducer"
import { setupServer } from "msw/lib/node"
import productServer from "../servers/productServer"

beforeEach(() => {
  store.dispatch(clearProductStore())
})

beforeAll(() => {
  productServer.listen()
})

afterAll(() => {
  productServer.close()
})

describe("Testing Redux Store Product Reducer", () => {
  test("Initial store state", () => {
    expect(store.getState().product).toEqual({
      products: [],
      loading: false,
      error: "",
      filteredProducts: [],
    })
  })
})
