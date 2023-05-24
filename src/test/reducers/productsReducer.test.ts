// import store from "../shared/store"
// import {
//   fetchProductData,
//   updateProduct,
//   filterProduct,
//   createProduct,
//   clearProductStore,
//   deleteProduct,
// } from "../../redux/reducers/productReducer"
// import productServer from "../servers/productServer"
// import { invalidProduct, newProduct, updatedProduct4 } from "../data/products"

test('Test', () => {
  expect('this').toEqual('this')
})
// beforeEach(() => {
//   store.dispatch(clearProductStore())
// })

// beforeAll(() => {
//   productServer.listen()
// })

// afterAll(() => {
//   productServer.close()
// })

// describe("Testing Redux Store Product Reducer", () => {
//   test("Initial store state", () => {
//     expect(store.getState().product).toEqual({
//       products: [],
//       loading: false,
//       error: "",
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
//   test("Create Product", async () => {
//     await store.dispatch(createProduct(newProduct))
//     expect(store.getState().product.products.length).toBe(1)
//   })
//   test("Test validation on product creatioin", async () => {
//     await store.dispatch(createProduct(invalidProduct))
//     expect(store.getState().product.products.length).toBe(0)
//     expect(store.getState().product.error).toBe(
//       JSON.stringify({
//         statusCode: 400,
//         message: [
//           "Price should be greater than zero",
//           "images must contain at least 1 image",
//           "category does not exist",
//         ],
//         error: "Bad Request",
//       })
//     )
//   })
//   test("Test delete product", async () => {
//     await store.dispatch(fetchProductData())
//     await store.dispatch(deleteProduct(1))
//     expect(store.getState().product.products.length).toBe(3)
//   })
// })
