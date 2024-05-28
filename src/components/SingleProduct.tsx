import { addToCart } from "@/tookit/slices/CartSlice"
import { AppDispatch } from "@/tookit/slices/store"
import { Product } from "@/types"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

export const SingleProduct = (props: { product: Product }) => {
  const { product } = props
  const dispatch: AppDispatch = useDispatch()
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }
  return (
    <div className="product-card">
      <div className="card">
        <div className="card-img">
          <img src={product.productImage} alt={product.productName} />
        </div>
        <div className="card-info">
          <h3 className="text-title">{product.productName}</h3>
          <p className="text-body">{product.productDescription}</p>
          <p className="text-body">In Stock: {product.productQuantityInStock}</p>
        </div>
        <div className="card-footer">
          <span className="text-title">${product.productPrice}</span>
          <div className="card-button">
            <Link to={`/products/${product.productId}`}>
              <button>
                More 
                <i className="fa-regular fa-eye fa-lg" style={{ color: "#0e131b" }}></i>
              </button>
            </Link>
          </div>
          <div className="card-button">
            <button
              onClick={() => {
                handleAddToCart(product)
              }}
            >
              Add 
              <i className="fa-solid fa-cart-plus fa-lg" style={{ color: "#0c1422", marginLeft: "8px" }}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
