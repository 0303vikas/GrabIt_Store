export interface RegistrationType {
  userName: string
  userEmail: string
  password: string
  retryPassword: string
  imageFile: FileList
}

export interface NewUserType {
  name: string
  email: string
  password: string
  avatar: string
}
