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
export type editData = {
  firstName: string
  lastName: string
  mobile: string
}

export type User = {
  userId?:string
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
  error: string | null | Record<string, never>; // Use Record<string, never> for an empty object
  isLoading: boolean;
  isLoggedIn: boolean;
  userData: User | null;
  token: string | null;
  loginStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
};

export type loginFormData = {
  email: string
  password: string
}

export type loginData = {
  isLoggedIn: boolean
  userData: User | null
  token:string
}