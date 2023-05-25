export interface UserType {
  id: number
  name: string
  role: string
  email: string
  password: string
  avatar: string
}

export interface UserLoginType {
  email: string
  password: string
}
