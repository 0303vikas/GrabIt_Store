export interface CategoryType {
  id: number
  name: string
  image: string
}

export interface UpdateCategoryType {
  id: number
  newData: Partial<CategoryType>
}
