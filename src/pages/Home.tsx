import { useEffect, useState } from "react"
import api from "@/api"

import { Product } from "@/types"
import PageTitle from "@/components/PageTitle"


function Home() {
  const [products, setProduct] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/products")
        setProduct(response.data.data.items)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="home">
      <PageTitle title="Home"/>
      <h1>Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching products: {error.message}</p>
      ) : (
        <ul className="products-container">
          {products.map((product, index) => (
            <li key={`${product.productId}-${index}`} className="product-card">
              <h2>{product.productName}</h2>
              <p>Slug: {product.productSlug}</p>
              <p>Description: {product.productDescription}</p>
              <p>Price: ${product.productPrice.toFixed(2)}</p>
              <p>
                Image: <img src={product.productImage} alt={product.productName} />
              </p>
              <p>Quantity in Stock: {product.productQuantityInStock}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home
