import { useState, useEffect } from "react"

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