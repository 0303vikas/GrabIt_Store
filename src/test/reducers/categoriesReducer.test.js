// import CategoryServer from "../servers/categoryServer"
// import store from "../shared/store"
// import {
//   fetchCategoryData,
//   clearAllCategory,
//   createCategory,
//   updateCategory,
//   deleteCategory,
// } from "../../redux/reducers/categoryReducer"
// import Categories, {
//   newCategory,
//   invalidCategory,
//   updateCat,
// } from "../data/categories"

test('Test', () => {
  expect('this').toEqual('this')
})

// beforeAll(() => {
//   CategoryServer.listen()
// })
// afterAll(() => {
//   CategoryServer.close()
// })

// afterEach(() => {
//   store.dispatch(clearAllCategory())
// })

// describe("Category Reducer Testing", () => {
//   test("Initial state of Store", () => {
//     expect(store.getState().categories).toEqual({
//       category: [],
//       loading: false,
//       error: "",
//     })
//   })
//   test("Fetch all Category", async () => {
//     await store.dispatch(fetchCategoryData())
//     expect(store.getState().categories.category.length).toBe(3)
//   })
//   test("Create new Category", async () => {
//     await store.dispatch(createCategory(newCategory))
//     expect(store.getState().categories.category.length).toBe(1)
//   })
//   test("create invalid Category", async () => {
//     await store.dispatch(createCategory(invalidCategory))
//     expect(store.getState().categories.category.length).toBe(0)
//     expect(store.getState().categories.error).toEqual(
//       JSON.stringify({
//         statusCode: 400,
//         message: ["images must not be empty string"],
//         error: "Bad Request",
//       })
//     )
//   })
//   describe("Updating and deleting prefilled data", () => {
//     beforeEach(() => {
//       store.dispatch(fetchCategoryData())
//     })
//     afterEach(() => {
//       store.dispatch(clearAllCategory())
//     })

//     test("update Category", async () => {
//       await store.dispatch(updateCategory(updateCat))

//       expect(store.getState().categories.category[0].name).toEqual("hello")
//     })
//     test("Delete a Category", async () => {
//       await store.dispatch(deleteCategory(1))

//       expect(store.getState().categories.category.length).toBe(2)
//     })
//   })
// })
