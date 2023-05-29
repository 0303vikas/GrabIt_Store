import { UserType } from "../types/User"

export const findOneUserHook = (user: UserType[], email: string) => {
  const findUser = user.find(
    (item) => item.email.toLowerCase() === email.toLowerCase()
  )
  if (findUser) return findUser
  else return false
}

export const findOneUserHook = (user: UserType[], email: string) => {
  const findUser = user.find(
    (item) => item.email.toLowerCase() === email.toLowerCase()
  )
  if (findUser) return findUser
  else return false
}
