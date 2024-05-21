import { fetchProducts, searchProducts } from "@/tookit/slices/ProductSlice"
import { AppDispatch, RootState } from "@/tookit/slices/store"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SingleProduct } from "../SingleProduct"

export const Products = () => {
  const { products, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.productR
  )
  const dispatch: AppDispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(2)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [sortBy, setSortBy] = useState("id") // Set initial sortBy value to a valid option

  useEffect(() => {
    const fetchData = async () => {
      console.log("Dispatching fetchProducts with:", { pageNumber, pageSize, sortBy })

      await dispatch(fetchProducts({ pageNumber, pageSize, sortBy }))
    }
    fetchData()
  }, [pageNumber, sortBy])

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }
  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }
  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      await dispatch(searchProducts(searchKeyword))
    } else {
      // If search keyword is empty, fetch all products
      await dispatch(fetchProducts({ pageNumber, pageSize, sortBy: "id" }))
      // Default to sorting by 'id' if sortBy is not defined
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value)
  }
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value)
  }
  return (
    <div className="product-header">
      <h1>Products</h1>
      <div className="products-container">
        {isLoading && <p>Loading ...</p>}
        {error && <p>Error{error}</p>}
        <div className="search-bar">
          <input
            type="text"
            value={searchKeyword}
            onChange={handleInputChange}
            placeholder="Search products..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="select">
          <select name="sortBy" onChange={handleSortChange}>
            <option value="id">ID</option>
            <option value="price">Price</option>
            <option value="product name">Product Name</option>
            <option value="create date">Create Date</option>
          </select>
        </div>
        {products &&
          products.length > 0 &&
          products.map((product, index) => <SingleProduct key={index} product={product} />)}
      </div>{" "}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setPageNumber(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}
