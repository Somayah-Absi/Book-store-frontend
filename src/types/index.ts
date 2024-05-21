export type Category = {
  categoryId: number
  categoryName: string
  categorySlug: string
  categoryDescription: string
}
export type Product = {
  productId: number
  productName: string
  productSlug: string
  productDescription: string
  productPrice: number
  productImage: string
  productQuantityInStock: number
}

export type ProductState = {
  products: Product[]
  totalPages: number
  product: Product | null
  error: null | string
  isLoading: boolean
}

export type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  mobile: string
}

export type User = {
  firstName: string
  lastName: string
  email: string
  password: string
  mobile: string
  createdAt?: string
  isAdmin?: boolean
  isBanned?: boolean
}

export type UserState = {
  error: null | string
  isLoading: boolean
}
export type loginData = {
  email: string
  password: string
}
