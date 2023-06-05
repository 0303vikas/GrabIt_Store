export interface RegistrationType {
  userName: string
  userEmail: string
  password: string
  retryPassword: string
  file: FileList
}

export interface NewUserType {
  name: string
  email: string
  password: string
  avatar: string
}
