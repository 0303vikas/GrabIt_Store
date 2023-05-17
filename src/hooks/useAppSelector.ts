import { useSelector, TypedUseSelectorHook } from "react-redux"

import { GlobalStoreState } from "../redux/store"

export const useAppSelector: TypedUseSelectorHook<GlobalStoreState> =
  useSelector
