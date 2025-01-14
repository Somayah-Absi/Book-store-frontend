export type Category = {
  categoryId: string
  categoryName: string
  categorySlug: string
  categoryDescription: string
}
export type CategoryState = {
  categories: Category[]
  totalPages: number
  category: Category | null
  error: null | string
  isLoading: boolean
}
export type CategoryForm = {
  categoryName: string
  categorySlug: string
  categoryDescription: string
}
export type CategoryFormEdit = {
  categoryName: string
  categoryDescription: string
}
export type Product = {
  productId: string
  productName: string
  productSlug: string
  productDescription: string
  productPrice: number
  productImage: string
  productQuantityInStock: number
  categoryId: string
}

export type CreateProduct = {
  productId: string
  productName: string
  productDescription: string
  productPrice: number
  productImage: string
  productQuantityInStock: number
  categoryId: string
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
export type EditData = {
  firstName: string
  lastName: string
  mobile: string
}

export type User = {
  userId?: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  isAdmin?: boolean
  isBanned?: boolean
}

export type UserState = {
  users: User[]
  totalPages: number
  error: string | null | Record<string, never>
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
  token: string | null
  loginStatus: "idle" | "loading" | "succeeded" | "failed"
}

export type loginFormData = {
  email: string
  password: string
}

export type loginData = {
  isLoggedIn: boolean
  userData: User | null
  token: string
}

export type CartItem = Product & { orderQuantity: number }

export type CartState = {
  cartItem: CartItem[]
}
