import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsById } from "@/tookit/slices/ProductSlice"
import { AppDispatch, RootState } from "@/tookit/slices/store"
import { addToCart } from "@/tookit/slices/CartSlice"
import { Product } from "@/types"

export const ProductsDetail = () => {
  const { ProductId } = useParams<{ ProductId: string }>()

  const { product, isLoading, error } = useSelector((state: RootState) => state.productR)
  const dispatch: AppDispatch = useDispatch()

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductsById(ProductId))
    }
    fetchData()
  }, [dispatch, ProductId])

  return (
    <div id="container">
      <div className="product-details">
        <h1>{product?.productName}</h1>

        <p className="information"> {product?.productDescription}</p>

        <div className="control">
          <button className="btn">
            <span className="price">{product?.productPrice}</span>
            <span className="shopping-cart">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </span>
            {product && (
              <span className="buy" onClick={() => handleAddToCart(product)}>Get now</span>
            )}
          </button>
        </div>
      </div>

      <div className="product-image">
        <img src={product?.productImage} alt={product?.productName} />

        <div className="info">
          <h2>Description</h2>
          <ul>
            <li>
              <strong>Quantity: </strong>{product?.productQuantityInStock}
            </li>
            <li>
              <strong>Decoration: </strong>{product?.productDescription}
            </li>
            <li>
              <strong>Material: </strong>Eco-Friendly
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
