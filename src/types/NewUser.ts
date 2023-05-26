export interface RegistrationType {
    userName: string
    userEmail: string
    password: string
    retryPassword: string
    imageFile: File
  }
export interface NewUserType {
    name: string
    email: string
    password: string
    avatar: string
}