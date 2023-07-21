export interface ProtectedRouterType {
  admin: Admin
  customer: Customer
}

export enum Admin {
  createproduct,
  createcategory,
  updateproduct,
}

export enum Customer {
  profile,
}
