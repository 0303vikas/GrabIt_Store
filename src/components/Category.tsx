import React, { useEffect } from "react"

import ContainerLoginRegister from "../themes/formTheme"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import {
  fetchCategoryData,
  sortCategory,
} from "../redux/reducers/categoryReducer"
import { useSortArrayObjectString } from "../hooks/useSortArrayObjectString"

function Category() {
  const dispatch = useAppDispatch()
  const { category, error, loading } = useAppSelector(
    (state) => state.categories
  )

  const filterData = (sortType: "asc" | "desc") => {
    dispatch(sortCategory(sortType))
  }

  // prettier-ignore
  console.log(category)
  //   const filterCategory = category.sort((a, b) => (a.name < b.name ? -1 : 1))
  //   console.log(filterCategory)

  useEffect(() => {
    dispatch(fetchCategoryData())
  }, [])

  if (loading) return <p>Loading...</p>

  if (error) return <p>{error}</p>

  return (
    <ContainerLoginRegister id="category--container">
      <div>
        {category.map((item, index) => {
          return <p key={item.id}>{item.name}</p>
        })}
      </div>
      <button onClick={() => filterData("asc")}>Sort Asc</button>

      <button onClick={() => filterData("desc")}>Sort Desc</button>

      {/* {filterCategory
        ? filterCategory.map((item, index) => {
            return <p key={item.id}>{item.name}</p>
          })
        : null} */}
    </ContainerLoginRegister>
  )
}

export default Category
