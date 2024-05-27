import { addToCart } from "@/tookit/slices/CartSlice"
import { AppDispatch } from "@/tookit/slices/store"
import { Product } from "@/types"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

export const SingleProduct = (props: { product: Product }) => {
  const { product } = props
  const dispatch :AppDispatch=useDispatch()
  const handleAddToCart = (product:Product) => { 
dispatch(addToCart(product))  }
  return (
    <div className="product-card">
      <img src={product.productImage} alt={product.productName} />
      <h3>{product.productName}</h3>
      <p>{product.productDescription}</p>
      <span>${product.productPrice}</span>
      <p>In Stock: {product.productQuantityInStock}</p>
      <div className="btn-container">
        <Link to={`/products/${product.productId}`}>
          <button className="btn-grad">
            More Details<i className="fa-regular fa-eye fa-lg" style={{ color: "#0e131b" }}></i>
          </button>
        </Link>{" "}
        <Link to="">
          <button className="btn-grad-cart" onClick={() => { handleAddToCart(product)}}>
            Add to cart
            <i
              className="fa-solid fa-cart-plus fa-lg"
              style={{ color: "#0c1422", marginLeft: "8px" }}
            ></i>
          </button>
        </Link>
      </div>{" "}
    </div>
  )
}
