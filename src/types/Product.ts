import { CategoryType } from "./Category"

export interface ProductType {
  id: number
  title: string
  price: number
  description: string
  category: CategoryType
  images: string[]
  creationAt?: string
  updatedAt?: string
}
