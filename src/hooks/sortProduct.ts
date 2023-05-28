import { sortAsc } from "../redux/reducers/productReducer"

export const ascDescFunction = (
  dispatch: any,
  sort: string,
  setSort: React.Dispatch<React.SetStateAction<string>>
) => {
  if (sort === "asc") {
    dispatch(sortAsc("asc"))
    setSort("desc")
  } else {
    dispatch(sortAsc("desc"))
    setSort("asc")
  }
}
