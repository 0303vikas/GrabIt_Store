import { CategoryType, UpdateCategoryType } from "../../types/Category"

const category1: CategoryType = {
  id: 1,
  name: "A category",
  image: "",
}

const category2: CategoryType = {
  id: 2,
  name: "B category",
  image: "",
}

const category3: CategoryType = {
  id: 3,
  name: "C category",
  image: "",
}

const newCategory: Omit<CategoryType, "id"> = {
  name: "D category",
  image: "https://placeimg.com",
}

const invalidCategory: Omit<CategoryType, "id"> = {
  name: "hello",
  image: "",
}

const updateCat: Partial<UpdateCategoryType> = {
  id: 1,
  newData: {
    name: "hello",
  },
}

const Categories = [category1, category2, category3]

export {
  category1,
  category2,
  category3,
  newCategory,
  invalidCategory,
  updateCat,
}
export default Categories
