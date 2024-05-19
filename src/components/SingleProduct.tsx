import { Product } from "@/types"
import { Link } from "react-router-dom"

export const SingleProduct = (props: { product: Product }) => {
  const { product } = props
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
          <button className="btn-grad-cart">
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
