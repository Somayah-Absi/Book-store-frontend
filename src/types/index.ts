export type Category = {
  CategoryId: number
  CategoryName: string
  CategorySlug: string
  CategoryDescription: string
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
  totalPages:number
  product: Product | null
  error: null | string
  isLoading: boolean
}
