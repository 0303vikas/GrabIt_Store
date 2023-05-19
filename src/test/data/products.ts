import { NewProductType } from "../../types/NewProduct"
import { ProductType } from "../../types/Product"
import { UpdateProductType } from "../../types/UpdateProduct"
import { category1, category2, category3 } from "./categories"

const product1: ProductType = {
  id: 1,
  title: "A  product",
  price: 100,
  description: "product 1",
  images: [],
  category: category1,
}

const product2: ProductType = {
  id: 2,
  title: "B  product",
  price: 300,
  description: "product 2",
  images: [],
  category: category2,
}

const product3: ProductType = {
  id: 3,
  title: "C  product",
  price: 200,
  description: "product 3",
  images: [],
  category: category3,
}

const product4: ProductType = {
  id: 4,
  title: "D  product",
  price: 50,
  description: "product 4",
  images: [],
  category: category1,
}

const newProduct: NewProductType = {
  title: "E product",
  price: 500,
  description: "new product",
  images: ["https://placeimg.com/640/480/any"],
  categoryId: 3,
}

const invalidProduct: NewProductType = {
  title: "E product",
  price: 0,
  description: "new product",
  images: [],
  categoryId: 3,
}

const updatedProduct4: UpdateProductType = {
  id: 4,
  update: {
    title: "Updated D product",
    price: 10,
  },
}

export {
  product1,
  product2,
  product3,
  product4,
  updatedProduct4,
  newProduct,
  invalidProduct,
}
