import store from "../shared/store"
import {
  fetchProductData,
  updateProduct,
  filterProduct,
  createProduct,
  clearProductStore,
  deleteProduct,
} from "../../redux/reducers/productReducer"
import productServer from "../servers/productServer"
import { newProduct, updatedProduct4 } from "../data/products"

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
  //   test("Initial store state", () => {
  //     expect(store.getState().product).toEqual({
  //       products: [],
  //       loading: false,
  //       error: "",
  //       filteredProducts: [],
  //     })
  //   })
  //   test("Fetch all products", async () => {
  //     await store.dispatch(fetchProductData())
  //     expect(store.getState().product.products.length).toBe(4)
  //   })
  //   test("Updated Product", async () => {
  //     await store.dispatch(fetchProductData())
  //     await store.dispatch(updateProduct(updatedProduct4))
  //     const checkUpdateTitle = store
  //       .getState()
  //       .product.products.find((item) => item.id === updatedProduct4.id)
  //     expect(checkUpdateTitle?.title).toEqual("Updated D product")
  //   })
  test("Create Product", async () => {
    await store.dispatch(createProduct(newProduct))
    console.log(store.getState().product)
    expect(store.getState().product.error.length).toBe(1)
  })
  //   test("Create Product Validation", async () => {})
})
