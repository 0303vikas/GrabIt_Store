import { useState, useEffect } from "react"
/**
 * 
 * @param searchInput @type string, contain the search input value
 * @param time @type number, time for debounce
 * @returns search string
 */
export const useDebounce = (searchInput: string, time: number) => {
  const [textValue, setTextValue] = useState(searchInput)
  useEffect(() => {
    const debounceTime = setTimeout(() => {
      setTextValue(searchInput)
    }, time)

    return () => {
      clearTimeout(debounceTime)
    }
  }, [searchInput])

  return textValue
}
