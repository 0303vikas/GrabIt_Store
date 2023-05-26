import { UserType } from "../types/User"

export const checkEmailAvailableHook = (user: UserType[], email: string) => {
    console.log(email)
    console.log(user.find((item) => item.email === email))
    return user.some((data) => data.email.toLowerCase() === email.toLowerCase())
  }