import { ProductType } from "./Product"

export interface UpdateProductType {
  id: number
  update: Partial<ProductType>
}
