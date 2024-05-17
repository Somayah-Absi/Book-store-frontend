import { fetchProducts } from "@/tookit/slices/ProductSlice"
import { AppDispatch, RootState } from "@/tookit/slices/store"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SingleProduct } from "../SingleProduct"

export const Products = () => {
  const { products, isLoading, error } = useSelector((state: RootState) => state.productR)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts())
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>Products</h2>
      {isLoading && <p>Loading ...</p>}
      {error && <p>Error{error}</p>}
      {products &&
        products.length > 0 &&
        products.map((product) => <SingleProduct key={product.productId} product={product} />)}
    </div>
  )
}
