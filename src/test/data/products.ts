import { ProductType } from "../../types/Product"
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

export { product1, product2, product3, product4 }
