import { ProductType } from "../types/Product"
/**
 *
 * @param products @type ProductType[]: list of products
 * @param type @type string: filter type
 * @param id @type string: id
 * @returns {
 *  filterItem: ProductType[],
 * minValueRange: number,
 * maxValueRange: number
 * }
 * price range = min and max
 */
export const filterProduct = (
  products: ProductType[],
  type?: string,
  id?: string
): {
  filterItem: ProductType[]
  minValueRange: number
  maxValueRange: number
} => {
  if (id) {
    const filterItem = products.filter(
      (item) => item.category.id === Number(id)
    )
    const minValueRange = Math.floor(
      Math.min(...filterItem.map((item) => item.price))
    )
    const maxValueRange = Math.ceil(
      Math.max(...filterItem.map((item) => item.price))
    )
    return {
      filterItem,
      minValueRange,
      maxValueRange,
    }
  }

  const minValueRange = Math.floor(
    Math.min(...products.map((item) => item.price))
  )
  const maxValueRange = Math.ceil(
    Math.max(...products.map((item) => item.price))
  )

  return {
    filterItem: products,
    minValueRange,
    maxValueRange,
  }
}
