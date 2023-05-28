import { ProductType } from "../types/Product";

export type CartType = ProductType & {quantity: number}