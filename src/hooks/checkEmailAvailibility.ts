import { UserType } from "../types/User"

export const checkEmailAvailableHook = (user: UserType[], email: string) => {
  return user.some((data) => data.email.toLowerCase() === email.toLowerCase())
}
