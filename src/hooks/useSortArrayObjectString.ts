import { CategoryType } from "../types/Category"

export const useSortArrayObjectString = (a: CategoryType, b: CategoryType) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}
