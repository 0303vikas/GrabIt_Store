import { UserType } from "../types/User"

/**
 *
 * @param user @type Usertype[] user list
 * @param email @type string, search user email
 * @returns false|| user( if user with email exists)
 */
export const findOneUser = (user: UserType[], email: string) => {
  const findUser = user.find(
    (item) => item.email.toLowerCase() === email.toLowerCase()
  )
  if (findUser) return findUser
  else return false
}
