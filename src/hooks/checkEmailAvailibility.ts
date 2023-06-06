import { UserType } from "../types/User"
/**
 * 
 * @param user  @type UserType[]
 * @param email @type string
 *  if email exists before
 * @returns true
 * else 
 * @return false
 */
export const checkEmailAvailableHook = (user: UserType[], email: string) => {
  return user.some((data) => data.email.toLowerCase() === email.toLowerCase())
}
