export interface FilterProductType {
  title?: string
  price?: number
  range?: {
    price_min?: number
    price_max?: number
  }
  categoryId?: number
}
