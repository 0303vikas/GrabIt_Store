import { sortAsc } from "../redux/reducers/productReducer"
/**
 *
 * @param dispatch disptach for sorting product
 * @param sort : string , either 'asc' or 'desc'
 * @param setSort @type React.Dispatch<React.SetStateAction<string>> alter the sort option in state
 * @returns void
 */
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
