import { ProductType } from "./Product"

export type CartType = ProductType & { quantity: number }
