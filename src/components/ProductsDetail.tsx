import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Products } from "./ui/Products"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts, fetchProductsById } from "@/tookit/slices/ProductSlice"
import { AppDispatch, RootState } from "@/tookit/slices/store"

const ProductsDetail = () => {
  const { ProductId } = useParams<{ ProductId: string }>() // Use ProductId instead of productId

  const { product, isLoading, error } = useSelector((state: RootState) => state.productR)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductsById(ProductId))
    }
    fetchData()
  }, [])

  // Fetch product details based on ProductId and render them
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
            <span className="buy">Get now</span>
          </button>
        </div>
      </div>

      <div className="product-image">
        <img src={product?.productImage} alt={product?.productName} />

        <div className="info">
          <h2> Description</h2>
          <ul>
            <li>
              <strong>Height : </strong>5 Ft{" "}
            </li>
            <li>
              <strong>Shade : </strong>Olive green
            </li>
            <li>
              <strong>Decoration: </strong>balls and bells
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
export default ProductsDetail
